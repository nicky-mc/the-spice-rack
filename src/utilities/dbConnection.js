import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.NEXT_SUPABASE_DATABASE_URL,
});

export default pool;
