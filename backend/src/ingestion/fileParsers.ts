import fs from 'fs';
import csv from 'csv-parser';
import * as XLSX from 'xlsx';
import axios from 'axios';
import stream from 'stream';
import { profileDataset, sanitizeDatasetRows, DatasetProfile } from './datasetProfiler';
import { detectModulesFromColumns, ModuleDetectionResult } from './moduleDetection';

const ML_ENGINE_URL = process.env.ML_ENGINE_URL || 'http://127.0.0.1:8000';
const ML_INTERNAL_API_KEY = process.env.ML_INTERNAL_API_KEY || '';

function mlEngineHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  if (ML_INTERNAL_API_KEY) {
    headers['X-Modliq-Service-Key'] = ML_INTERNAL_API_KEY;
  }
  return headers;
}

export interface ParsedFileResult {
  success: boolean;
  sourceType: 'file' | 'document';
  fileType: string;
  rows: any[];
  previewRows: any[];
  profile: DatasetProfile;
  detectedModules: ModuleDetectionResult;
  error?: string;
  documentData?: {
    textPreview?: string;
    tables?: any[];
    confidence?: number;
  };
}

/**
 * Parses CSV buffer or file stream into structured dataset rows.
 */
export async function parseCsvFile(buffer: Buffer): Promise<ParsedFileResult> {
  const rows: any[] = [];
  try {
    await new Promise<void>((resolve, reject) => {
      const readStream = new stream.PassThrough();
      readStream.end(buffer);
      readStream
        .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
        .on('data', (data) => rows.push(data))
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });

    const sanitized = sanitizeDatasetRows(rows);
    const profile = profileDataset(sanitized);
    const detectedModules = detectModulesFromColumns(profile.columns.map((c) => c.name));

    return {
      success: true,
      sourceType: 'file',
      fileType: 'csv',
      rows: sanitized,
      previewRows: sanitized.slice(0, 100),
      profile,
      detectedModules,
    };
  } catch (err: any) {
    return {
      success: false,
      sourceType: 'file',
      fileType: 'csv',
      rows: [],
      previewRows: [],
      profile: profileDataset([]),
      detectedModules: detectModulesFromColumns([]),
      error: err.message || 'Failed to parse CSV file',
    };
  }
}

/**
 * Parses Excel (.xlsx/.xls) buffer using xlsx library.
 */
export async function parseExcelFile(buffer: Buffer, originalFilename: string): Promise<ParsedFileResult> {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName) {
      throw new Error('Excel file contains no readable worksheets');
    }

    const worksheet = workbook.Sheets[firstSheetName];
    const rawRows: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    const sanitized = sanitizeDatasetRows(rawRows);
    const profile = profileDataset(sanitized);
    const detectedModules = detectModulesFromColumns(profile.columns.map((c) => c.name));

    const fileExt = originalFilename.toLowerCase().endsWith('.xls') ? 'xls' : 'xlsx';

    return {
      success: true,
      sourceType: 'file',
      fileType: fileExt,
      rows: sanitized,
      previewRows: sanitized.slice(0, 100),
      profile,
      detectedModules,
    };
  } catch (err: any) {
    return {
      success: false,
      sourceType: 'file',
      fileType: 'xlsx',
      rows: [],
      previewRows: [],
      profile: profileDataset([]),
      detectedModules: detectModulesFromColumns([]),
      error: err.message || 'Failed to parse Excel file',
    };
  }
}

/**
 * Forwards PDF or Word documents to ML Engine /extract-document.
 */
export async function parseDocumentFile(buffer: Buffer, originalFilename: string): Promise<ParsedFileResult> {
  const fileExt = originalFilename.toLowerCase().endsWith('.pdf') ? 'pdf' : 'docx';
  try {
    const base64Data = buffer.toString('base64');
    const response = await axios.post(
      `${ML_ENGINE_URL}/extract-document`,
      {
        filename: originalFilename,
        fileType: fileExt,
        fileContentBase64: base64Data,
      },
      {
        headers: mlEngineHeaders(),
        timeout: 30000,
      }
    );

    const data = response.data;
    const tables = data.tables || [];

    if (data.success && tables.length > 0 && tables[0].rows?.length > 0) {
      // Tables detected! Extract first table into a dataset
      const tableRows = sanitizeDatasetRows(tables[0].rows);
      const profile = profileDataset(tableRows);
      const detectedModules = detectModulesFromColumns(profile.columns.map((c) => c.name));

      return {
        success: true,
        sourceType: 'document',
        fileType: fileExt,
        rows: tableRows,
        previewRows: tableRows.slice(0, 100),
        profile,
        detectedModules,
        documentData: {
          textPreview: data.textPreview,
          tables,
          confidence: tables[0].confidence || 0.8,
        },
      };
    }

    // No tables detected -> save as REFERENCE_ONLY
    return {
      success: true,
      sourceType: 'document',
      fileType: fileExt,
      rows: [],
      previewRows: [],
      profile: profileDataset([]),
      detectedModules: detectModulesFromColumns([]),
      documentData: {
        textPreview: data.textPreview || 'Reference document text extracted successfully.',
        tables: [],
        confidence: 0,
      },
    };
  } catch (err: any) {
    return {
      success: false,
      sourceType: 'document',
      fileType: fileExt,
      rows: [],
      previewRows: [],
      profile: profileDataset([]),
      detectedModules: detectModulesFromColumns([]),
      error: err.message || 'Failed to extract document content',
    };
  }
}
