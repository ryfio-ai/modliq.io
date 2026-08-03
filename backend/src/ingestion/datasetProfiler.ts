export interface ColumnProfile {
  name: string;
  normalizedName: string;
  type: 'numeric' | 'categorical' | 'date' | 'boolean' | 'text' | 'unknown';
  nullable: boolean;
  sampleValues: any[];
}

export interface DatasetProfile {
  totalRows: number;
  totalColumns: number;
  missingValues: number;
  columns: ColumnProfile[];
  numericColumns: string[];
  categoricalColumns: string[];
  analytics: Record<string, any>;
}

export function profileDataset(rows: any[]): DatasetProfile {
  const totalRows = rows.length;
  if (totalRows === 0) {
    return {
      totalRows: 0,
      totalColumns: 0,
      missingValues: 0,
      columns: [],
      numericColumns: [],
      categoricalColumns: [],
      analytics: {},
    };
  }

  const rawHeaders = Object.keys(rows[0] || {});
  let totalMissing = 0;
  const columnProfiles: ColumnProfile[] = [];

  for (const rawCol of rawHeaders) {
    const normalizedName = rawCol.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    let nullCount = 0;
    let numericCount = 0;
    let dateCount = 0;
    let boolCount = 0;
    const sampleValues: any[] = [];

    for (let i = 0; i < Math.min(rows.length, 100); i++) {
      const val = rows[i][rawCol];
      if (val === null || val === undefined || val === '') {
        nullCount++;
        totalMissing++;
        continue;
      }

      if (sampleValues.length < 5) {
        sampleValues.push(val);
      }

      if (typeof val === 'number' || (!isNaN(Number(val)) && val !== true && val !== false)) {
        numericCount++;
      } else if (typeof val === 'boolean' || val === 'true' || val === 'false' || val === 'True' || val === 'False') {
        boolCount++;
      } else if (!isNaN(Date.parse(String(val))) && String(val).length > 5 && /\d/.test(String(val))) {
        dateCount++;
      }
    }

    const nonNullCount = Math.max(1, rows.length - nullCount);
    let inferredType: ColumnProfile['type'] = 'text';

    if (numericCount / nonNullCount > 0.7) {
      inferredType = 'numeric';
    } else if (boolCount / nonNullCount > 0.7) {
      inferredType = 'boolean';
    } else if (dateCount / nonNullCount > 0.7) {
      inferredType = 'date';
    } else if (sampleValues.every((v) => typeof v === 'string' && v.length < 50)) {
      inferredType = 'categorical';
    }

    columnProfiles.push({
      name: rawCol,
      normalizedName,
      type: inferredType,
      nullable: nullCount > 0,
      sampleValues,
    });
  }

  const numericColumns = columnProfiles.filter((c) => c.type === 'numeric').map((c) => c.name);
  const categoricalColumns = columnProfiles.filter((c) => c.type === 'categorical' || c.type === 'boolean').map((c) => c.name);

  return {
    totalRows,
    totalColumns: rawHeaders.length,
    missingValues: totalMissing,
    columns: columnProfiles,
    numericColumns,
    categoricalColumns,
    analytics: {
      totalRows,
      totalColumns: rawHeaders.length,
      missingValues: totalMissing,
      numericColumns,
      categoricalColumns,
    },
  };
}

/**
 * Sanitizes cell values starting with =, +, -, @ to defend against CSV/Excel formula injection.
 */
export function sanitizeCellValue(val: any): any {
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed.startsWith('=') || trimmed.startsWith('+') || trimmed.startsWith('-') || trimmed.startsWith('@')) {
      return `'${val}`;
    }
  }
  return val;
}

export function sanitizeDatasetRows(rows: any[]): any[] {
  return rows.map((row) => {
    const cleanRow: Record<string, any> = {};
    for (const key of Object.keys(row)) {
      cleanRow[key] = sanitizeCellValue(row[key]);
    }
    return cleanRow;
  });
}
