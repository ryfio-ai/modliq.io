import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import prisma from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { parseCsvFile, parseExcelFile, parseDocumentFile } from '../ingestion/fileParsers';
import { encryptSecret, decryptSecret, maskConfig } from '../security/encryption';
import {
  testPostgresConnection,
  getPostgresSchema,
  readPostgresTable,
  testMongoConnection,
  getMongoSchema,
  readMongoCollection,
  ConnectorConfig,
} from '../ingestion/connectorReaders';

const router = Router({ mergeParams: true });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: (parseInt(process.env.DATASET_UPLOAD_MAX_MB || '50', 10)) * 1024 * 1024 },
});

const ML_ENGINE_URL = process.env.ML_ENGINE_URL || 'http://127.0.0.1:8000';
const ML_INTERNAL_API_KEY = process.env.ML_INTERNAL_API_KEY || '';

function mlEngineHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  if (ML_INTERNAL_API_KEY) {
    headers['X-Modliq-Service-Key'] = ML_INTERNAL_API_KEY;
  }
  return headers;
}

// --------------------------------------------------
// FILE & DOCUMENT UPLOAD
// --------------------------------------------------

router.post('/datasets/upload', requireAuth, upload.single('file'), async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  const projectId = req.params.projectId as string;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, error: 'No file provided in request' });
  }

  const originalName = file.originalname;
  const ext = path.extname(originalName).toLowerCase();

  try {
    if (ext === '.csv') {
      const parsed = await parseCsvFile(file.buffer);
      if (!parsed.success) throw new Error(parsed.error);

      const dataset = await prisma.dataset.create({
        data: {
          id: `${userId}_csv_${Date.now()}`,
          user: { connect: { id: userId } },
          projectId,
          filename: originalName,
          originalName,
          contentType: 'text/csv',
          sourceType: 'file',
          fileType: 'csv',
          status: 'READY',
          sizeBytes: file.size,
          totalRows: parsed.profile.totalRows,
          totalColumns: parsed.profile.totalColumns,
          columnsJson: JSON.stringify(parsed.profile.columns),
          analyticsJson: JSON.stringify(parsed.profile.analytics),
          previewJson: JSON.stringify(parsed.previewRows),
          detectedJson: JSON.stringify(parsed.detectedModules),
        },
      });

      // Update project dataset
      if (projectId) {
        await prisma.project.update({
          where: { id: projectId },
          data: { datasetId: dataset.id, status: 'draft' },
        }).catch(() => {});
      }

      return res.json({
        success: true,
        datasetId: dataset.id,
        sourceType: 'file',
        fileType: 'csv',
        status: 'READY',
        preview: parsed.previewRows,
        analytics: parsed.profile.analytics,
        detectedModules: parsed.detectedModules,
      });

    } else if (ext === '.xlsx' || ext === '.xls') {
      const parsed = await parseExcelFile(file.buffer, originalName);
      if (!parsed.success) throw new Error(parsed.error);

      const dataset = await prisma.dataset.create({
        data: {
          id: `${userId}_excel_${Date.now()}`,
          user: { connect: { id: userId } },
          projectId,
          filename: originalName,
          originalName,
          contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          sourceType: 'file',
          fileType: parsed.fileType,
          status: 'READY',
          sizeBytes: file.size,
          totalRows: parsed.profile.totalRows,
          totalColumns: parsed.profile.totalColumns,
          columnsJson: JSON.stringify(parsed.profile.columns),
          analyticsJson: JSON.stringify(parsed.profile.analytics),
          previewJson: JSON.stringify(parsed.previewRows),
          detectedJson: JSON.stringify(parsed.detectedModules),
        },
      });

      if (projectId) {
        await prisma.project.update({
          where: { id: projectId },
          data: { datasetId: dataset.id, status: 'draft' },
        }).catch(() => {});
      }

      return res.json({
        success: true,
        datasetId: dataset.id,
        sourceType: 'file',
        fileType: parsed.fileType,
        status: 'READY',
        preview: parsed.previewRows,
        analytics: parsed.profile.analytics,
        detectedModules: parsed.detectedModules,
      });

    } else if (ext === '.pdf' || ext === '.docx' || ext === '.doc') {
      const parsed = await parseDocumentFile(file.buffer, originalName);

      const docStatus = (parsed.documentData?.tables?.length || 0) > 0 ? 'TABLE_DETECTED' : 'REFERENCE_ONLY';

      const doc = await prisma.ingestedDocument.create({
        data: {
          userId,
          projectId,
          name: originalName,
          fileType: ext.replace('.', ''),
          status: docStatus,
          textPreview: parsed.documentData?.textPreview || '',
          tablesJson: JSON.stringify(parsed.documentData?.tables || []),
        },
      });

      if (parsed.rows && parsed.rows.length > 0) {
        // Structured table extracted! Save dataset
        const dataset = await prisma.dataset.create({
          data: {
            id: `${userId}_doc_${Date.now()}`,
            user: { connect: { id: userId } },
            projectId,
            filename: originalName,
            originalName,
            contentType: 'application/pdf',
            sourceType: 'document',
            fileType: ext.replace('.', ''),
            status: 'READY',
            sizeBytes: file.size,
            totalRows: parsed.profile.totalRows,
            totalColumns: parsed.profile.totalColumns,
            columnsJson: JSON.stringify(parsed.profile.columns),
            analyticsJson: JSON.stringify(parsed.profile.analytics),
            previewJson: JSON.stringify(parsed.previewRows),
            detectedJson: JSON.stringify(parsed.detectedModules),
          },
        });

        if (projectId) {
          await prisma.project.update({
            where: { id: projectId },
            data: { datasetId: dataset.id },
          }).catch(() => {});
        }

        return res.json({
          success: true,
          datasetId: dataset.id,
          documentId: doc.id,
          sourceType: 'document',
          fileType: ext.replace('.', ''),
          status: 'READY',
          tablesDetected: parsed.documentData?.tables?.length || 0,
          preview: parsed.previewRows,
          analytics: parsed.profile.analytics,
          detectedModules: parsed.detectedModules,
        });
      }

      return res.json({
        success: true,
        documentId: doc.id,
        sourceType: 'document',
        fileType: ext.replace('.', ''),
        status: 'REFERENCE_ONLY',
        tablesDetected: 0,
        message: 'Document saved as reference material. No structured table suitable for optimization was found.',
      });
    }

    return res.status(400).json({ success: false, error: 'Unsupported file type' });

  } catch (err: any) {
    console.error('File ingestion error:', err);
    res.status(500).json({ success: false, error: err.message || 'File ingestion failed' });
  }
});

// --------------------------------------------------
// DATASET PREVIEW & HEALTH
// --------------------------------------------------

router.get('/datasets/:datasetId/preview', requireAuth, async (req, res) => {
  try {
    const dataset = await prisma.dataset.findUnique({
      where: { id: req.params.datasetId as string },
    });
    if (!dataset) return res.status(404).json({ success: false, error: 'Dataset not found' });

    res.json({
      success: true,
      preview: dataset.previewJson ? JSON.parse(dataset.previewJson) : [],
      columns: dataset.columnsJson ? JSON.parse(dataset.columnsJson) : [],
      analytics: dataset.analyticsJson ? JSON.parse(dataset.analyticsJson) : {},
      detectedModules: dataset.detectedJson ? JSON.parse(dataset.detectedJson) : {},
      healthReport: dataset.healthJson ? JSON.parse(dataset.healthJson) : null,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch preview' });
  }
});

router.post('/datasets/:datasetId/health', requireAuth, async (req, res) => {
  try {
    const dataset = await prisma.dataset.findUnique({
      where: { id: req.params.datasetId as string },
    });
    if (!dataset) return res.status(404).json({ success: false, error: 'Dataset not found' });

    const rows = dataset.previewJson ? JSON.parse(dataset.previewJson) : [];
    const response = await axios.post(`${ML_ENGINE_URL}/dataset-health`, {
      rows,
      targetColumn: req.body.targetColumn || null,
      features: req.body.features || null,
      mode: req.body.mode || 'generic',
    }, {
      headers: mlEngineHeaders(),
      timeout: 20000,
    });

    if (response.data?.success) {
      await prisma.dataset.update({
        where: { id: dataset.id },
        data: { healthJson: JSON.stringify(response.data) },
      }).catch(() => {});
    }

    res.json(response.data);
  } catch (err: any) {
    res.json({
      success: false,
      error: 'Dataset imported, but health check could not be completed.',
      details: err.message,
    });
  }
});

// --------------------------------------------------
// READ-ONLY DATABASE CONNECTORS
// --------------------------------------------------

router.post('/connectors', requireAuth, async (req, res) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  const projectId = req.params.projectId as string;
  const { name, type, config } = req.body;

  if (!name || !type || !config) {
    return res.status(400).json({ success: false, error: 'name, type, and config required' });
  }

  // Feature flag check for MySQL / SQL Server
  if (type === 'mysql' && process.env.ENABLE_MYSQL_CONNECTOR !== 'true') {
    return res.status(400).json({ success: false, error: 'MySQL connector is not enabled in this environment (Coming Soon).' });
  }
  if (type === 'sqlserver' && process.env.ENABLE_SQLSERVER_CONNECTOR !== 'true') {
    return res.status(400).json({ success: false, error: 'SQL Server connector is not enabled in this environment (Coming Soon).' });
  }

  try {
    const encryptedConfig = encryptSecret(config);
    const connector = await prisma.dataConnector.create({
      data: {
        userId,
        projectId,
        name,
        type,
        encryptedConfig,
        status: 'CREATED',
      },
    });

    res.json({
      success: true,
      connector: {
        id: connector.id,
        name: connector.name,
        type: connector.type,
        status: connector.status,
        maskedConfig: maskConfig(config),
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to save connector' });
  }
});

router.get('/connectors', requireAuth, async (req, res) => {
  const projectId = req.params.projectId as string;
  try {
    const connectors = await prisma.dataConnector.findMany({
      where: { projectId },
      orderBy: { updatedAt: 'desc' },
    });

    const safeConnectors = connectors.map((c) => {
      let config: any = {};
      try { config = decryptSecret(c.encryptedConfig); } catch {}
      return {
        id: c.id,
        name: c.name,
        type: c.type,
        status: c.status,
        lastTestedAt: c.lastTestedAt,
        lastSyncAt: c.lastSyncAt,
        maskedConfig: maskConfig(config),
        createdAt: c.createdAt,
      };
    });

    res.json({ success: true, connectors: safeConnectors });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to list connectors' });
  }
});

router.post('/connectors/test', requireAuth, async (req, res) => {
  const { type, config } = req.body;
  if (!type || !config) return res.status(400).json({ success: false, error: 'type and config required' });

  try {
    let result = { success: false, message: 'Unsupported connector type' };
    if (type === 'postgres' || type === 'supabase') {
      result = await testPostgresConnection(config);
    } else if (type === 'mongodb') {
      result = await testMongoConnection(config);
    }
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Connector test failed' });
  }
});

router.get('/connectors/:connectorId/schema', requireAuth, async (req, res) => {
  try {
    const connector = await prisma.dataConnector.findUnique({
      where: { id: req.params.connectorId as string },
    });
    if (!connector) return res.status(404).json({ success: false, error: 'Connector not found' });

    const config: ConnectorConfig = decryptSecret(connector.encryptedConfig);
    let schemaResult: any = { success: false };

    if (connector.type === 'postgres' || connector.type === 'supabase') {
      schemaResult = await getPostgresSchema(config);
    } else if (connector.type === 'mongodb') {
      schemaResult = await getMongoSchema(config);
    }

    res.json(schemaResult);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch connector schema' });
  }
});

router.post('/connectors/:connectorId/preview', requireAuth, async (req, res) => {
  const { table, schema, collection, limit = 100 } = req.body;
  try {
    const connector = await prisma.dataConnector.findUnique({
      where: { id: req.params.connectorId as string },
    });
    if (!connector) return res.status(404).json({ success: false, error: 'Connector not found' });

    const config: ConnectorConfig = decryptSecret(connector.encryptedConfig);
    let readRes: any = { success: false };

    if (connector.type === 'postgres' || connector.type === 'supabase') {
      if (!table) return res.status(400).json({ success: false, error: 'table parameter required' });
      readRes = await readPostgresTable(config, table, schema || 'public', Math.min(100, limit));
    } else if (connector.type === 'mongodb') {
      if (!collection) return res.status(400).json({ success: false, error: 'collection parameter required' });
      readRes = await readMongoCollection(config, collection, Math.min(100, limit));
    }

    res.json(readRes);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to preview table data' });
  }
});

router.post('/connectors/:connectorId/import', requireAuth, async (req, res) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  const projectId = req.params.projectId as string;
  const { table, schema, collection, limit = 10000 } = req.body;

  try {
    const connector = await prisma.dataConnector.findUnique({
      where: { id: req.params.connectorId as string },
    });
    if (!connector) return res.status(404).json({ success: false, error: 'Connector not found' });

    const config: ConnectorConfig = decryptSecret(connector.encryptedConfig);
    let readRes: any = { success: false };

    if (connector.type === 'postgres' || connector.type === 'supabase') {
      readRes = await readPostgresTable(config, table, schema || 'public', Math.min(10000, limit));
    } else if (connector.type === 'mongodb') {
      readRes = await readMongoCollection(config, collection, Math.min(10000, limit));
    }

    if (!readRes.success || !readRes.rows) {
      throw new Error(readRes.error || 'Failed to import data from connector');
    }

    const datasetName = `${connector.name} - ${table || collection}`;
    const dataset = await prisma.dataset.create({
      data: {
        id: `${userId}_conn_${Date.now()}`,
        user: { connect: { id: userId } },
        projectId,
        filename: datasetName,
        originalName: datasetName,
        sourceType: 'connector',
        connectorId: connector.id,
        status: 'READY',
        totalRows: readRes.profile.totalRows,
        totalColumns: readRes.profile.totalColumns,
        columnsJson: JSON.stringify(readRes.profile.columns),
        analyticsJson: JSON.stringify(readRes.profile.analytics),
        previewJson: JSON.stringify(readRes.previewRows),
        detectedJson: JSON.stringify(readRes.detectedModules),
      },
    });

    if (projectId) {
      await prisma.project.update({
        where: { id: projectId },
        data: { datasetId: dataset.id, status: 'draft' },
      }).catch(() => {});
    }

    res.json({
      success: true,
      datasetId: dataset.id,
      sourceType: 'connector',
      status: 'READY',
      totalRows: readRes.profile.totalRows,
      preview: readRes.previewRows,
      analytics: readRes.profile.analytics,
      detectedModules: readRes.detectedModules,
    });

  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Connector import failed' });
  }
});

export default router;
