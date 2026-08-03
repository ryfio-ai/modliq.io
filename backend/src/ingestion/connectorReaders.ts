import { Client as PgClient } from 'pg';
import { MongoClient } from 'mongodb';
import { profileDataset, sanitizeDatasetRows, DatasetProfile } from './datasetProfiler';
import { detectModulesFromColumns, ModuleDetectionResult } from './moduleDetection';
import { maskConfig } from '../security/encryption';

export interface ConnectorConfig {
  connectionString?: string;
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  sslMode?: string | boolean;
  schema?: string;
  collectionName?: string;
}

export interface ConnectorSchemaResult {
  success: boolean;
  type: string;
  tables?: { schema: string; name: string; columns: { name: string; type: string }[] }[];
  collections?: { name: string; sampleFields: string[] }[];
  error?: string;
}

export interface ConnectorReadResult {
  success: boolean;
  rows: any[];
  previewRows: any[];
  profile: DatasetProfile;
  detectedModules: ModuleDetectionResult;
  error?: string;
}

/**
 * Tests read-only connection to external PostgreSQL / Supabase database.
 */
export async function testPostgresConnection(config: ConnectorConfig): Promise<{ success: boolean; message: string }> {
  const connectionString = config.connectionString || `postgresql://${config.username}:${config.password}@${config.host}:${config.port || 5432}/${config.database}`;
  const client = new PgClient({
    connectionString,
    connectionTimeoutMillis: 15000,
    statement_timeout: 15000,
    ssl: config.sslMode ? { rejectUnauthorized: false } : false,
  });

  try {
    await client.connect();
    const res = await client.query('SELECT 1 AS alive');
    await client.end();
    return { success: true, message: 'Successfully connected to PostgreSQL / Supabase database.' };
  } catch (err: any) {
    try { await client.end(); } catch {}
    return { success: false, message: `Database connection failed: ${err.message}` };
  }
}

/**
 * Fetches PostgreSQL / Supabase schemas and tables.
 */
export async function getPostgresSchema(config: ConnectorConfig): Promise<ConnectorSchemaResult> {
  const connectionString = config.connectionString || `postgresql://${config.username}:${config.password}@${config.host}:${config.port || 5432}/${config.database}`;
  const client = new PgClient({
    connectionString,
    connectionTimeoutMillis: 15000,
    statement_timeout: 15000,
    ssl: config.sslMode ? { rejectUnauthorized: false } : false,
  });

  try {
    await client.connect();
    const targetSchema = config.schema || 'public';
    const query = `
      SELECT table_schema, table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
      ORDER BY table_schema, table_name, ordinal_position;
    `;
    const res = await client.query(query);
    await client.end();

    const tableMap: Record<string, { schema: string; name: string; columns: { name: string; type: string }[] }> = {};
    for (const row of res.rows) {
      const key = `${row.table_schema}.${row.table_name}`;
      if (!tableMap[key]) {
        tableMap[key] = { schema: row.table_schema, name: row.table_name, columns: [] };
      }
      tableMap[key].columns.push({ name: row.column_name, type: row.data_type });
    }

    return { success: true, type: 'postgres', tables: Object.values(tableMap) };
  } catch (err: any) {
    try { await client.end(); } catch {}
    return { success: false, type: 'postgres', error: err.message || 'Failed to list database schema' };
  }
}

/**
 * Reads read-only sample or snapshot data from a PostgreSQL table.
 */
export async function readPostgresTable(
  config: ConnectorConfig,
  tableName: string,
  schemaName: string = 'public',
  limit: number = 100
): Promise<ConnectorReadResult> {
  // Validate identifier safety
  if (!/^[a-zA-Z0-9_]+$/.test(tableName) || !/^[a-zA-Z0-9_]+$/.test(schemaName)) {
    return {
      success: false,
      rows: [],
      previewRows: [],
      profile: profileDataset([]),
      detectedModules: detectModulesFromColumns([]),
      error: 'Invalid or unsafe schema/table identifier',
    };
  }

  const safeLimit = Math.min(Math.max(1, limit), 10000); // Max 10,000 rows limit
  const connectionString = config.connectionString || `postgresql://${config.username}:${config.password}@${config.host}:${config.port || 5432}/${config.database}`;
  const client = new PgClient({
    connectionString,
    connectionTimeoutMillis: 15000,
    statement_timeout: 15000,
    ssl: config.sslMode ? { rejectUnauthorized: false } : false,
  });

  try {
    await client.connect();
    const query = `SELECT * FROM "${schemaName}"."${tableName}" LIMIT ${safeLimit};`;
    const res = await client.query(query);
    await client.end();

    const sanitized = sanitizeDatasetRows(res.rows);
    const profile = profileDataset(sanitized);
    const detectedModules = detectModulesFromColumns(profile.columns.map((c) => c.name));

    return {
      success: true,
      rows: sanitized,
      previewRows: sanitized.slice(0, 100),
      profile,
      detectedModules,
    };
  } catch (err: any) {
    try { await client.end(); } catch {}
    return {
      success: false,
      rows: [],
      previewRows: [],
      profile: profileDataset([]),
      detectedModules: detectModulesFromColumns([]),
      error: err.message || 'Failed to read database table',
    };
  }
}

/**
 * Tests connection to external MongoDB database.
 */
export async function testMongoConnection(config: ConnectorConfig): Promise<{ success: boolean; message: string }> {
  const uri = config.connectionString || config.host || 'mongodb://localhost:27017';
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });

  try {
    await client.connect();
    await client.db(config.database || 'test').command({ ping: 1 });
    await client.close();
    return { success: true, message: 'Successfully connected to MongoDB database.' };
  } catch (err: any) {
    try { await client.close(); } catch {}
    return { success: false, message: `MongoDB connection failed: ${err.message}` };
  }
}

/**
 * Fetches MongoDB collections.
 */
export async function getMongoSchema(config: ConnectorConfig): Promise<ConnectorSchemaResult> {
  const uri = config.connectionString || config.host || 'mongodb://localhost:27017';
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });

  try {
    await client.connect();
    const db = client.db(config.database);
    const collections = await db.listCollections().toArray();

    const collectionList = [];
    for (const col of collections) {
      const sampleDoc = await db.collection(col.name).findOne({});
      const sampleFields = sampleDoc ? Object.keys(sampleDoc) : [];
      collectionList.push({ name: col.name, sampleFields });
    }

    await client.close();
    return { success: true, type: 'mongodb', collections: collectionList };
  } catch (err: any) {
    try { await client.close(); } catch {}
    return { success: false, type: 'mongodb', error: err.message || 'Failed to list MongoDB collections' };
  }
}

/**
 * Reads read-only document sample from a MongoDB collection.
 */
export async function readMongoCollection(
  config: ConnectorConfig,
  collectionName: string,
  limit: number = 100
): Promise<ConnectorReadResult> {
  if (!/^[a-zA-Z0-9_]+$/.test(collectionName)) {
    return {
      success: false,
      rows: [],
      previewRows: [],
      profile: profileDataset([]),
      detectedModules: detectModulesFromColumns([]),
      error: 'Invalid or unsafe collection identifier',
    };
  }

  const safeLimit = Math.min(Math.max(1, limit), 10000);
  const uri = config.connectionString || config.host || 'mongodb://localhost:27017';
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });

  try {
    await client.connect();
    const db = client.db(config.database);
    const docs = await db.collection(collectionName).find({}).limit(safeLimit).toArray();
    await client.close();

    // Flatten _id to string for JSON serialization
    const cleanedDocs = docs.map((doc) => {
      const copy: Record<string, any> = { ...doc };
      if (copy._id) copy._id = String(copy._id);
      return copy;
    });

    const sanitized = sanitizeDatasetRows(cleanedDocs);
    const profile = profileDataset(sanitized);
    const detectedModules = detectModulesFromColumns(profile.columns.map((c) => c.name));

    return {
      success: true,
      rows: sanitized,
      previewRows: sanitized.slice(0, 100),
      profile,
      detectedModules,
    };
  } catch (err: any) {
    try { await client.close(); } catch {}
    return {
      success: false,
      rows: [],
      previewRows: [],
      profile: profileDataset([]),
      detectedModules: detectModulesFromColumns([]),
      error: err.message || 'Failed to read MongoDB collection',
    };
  }
}
