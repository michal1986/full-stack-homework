/* 

This file sets up the main database connection pool for the application.
It uses the 'postgres' package which provides a good way to connect to the database

*/

import postgres from 'postgres';

const sql = postgres({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DB || 'postgres',
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
});

export default sql; 