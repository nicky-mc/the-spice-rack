import pg from "pg";

const dbConnectionString = process.env.SUPABASE_DB_CONNECTION_URL; // Your PostgreSQL connection string
const db = new pg.Pool({
  connectionString: dbConnectionString,
});

export { db };
