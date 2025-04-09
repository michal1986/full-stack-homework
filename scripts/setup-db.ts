/**
 * Database Setup Script
 * 
 * This script is used for initial database setup and schema initialization.
 * It should be run once when setting up the application for the first time.
 * 
 * Usage:
 * ```bash
 * # Run the setup script
 * pnpm ts-node scripts/setup-db.ts
 * ```
 * 
 * Purpose:
 * - Creates necessary database tables
 * - Sets up initial schema
 * - Executes SQL commands from schema.sql
 * 
 * Note:
 * - This script uses the 'pg' package instead of 'postgres'
 * - It's designed for one-time setup operations
 * - The connection is closed after setup is complete
 * - Do not use this for regular database operations
 * 
 * Environment Variables:
 * - DATABASE_URL: Connection string for the database
 * 
 * @see lib/db.ts for the main database connection used by the application
 */

import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function setupDatabase() {
  const client = await pool.connect();
  try {
    // Read and execute the schema file
    const schemaPath = path.join(process.cwd(), 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schema);
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

setupDatabase(); 