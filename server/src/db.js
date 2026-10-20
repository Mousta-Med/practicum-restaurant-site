import pg from 'pg'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Copy server/.env.example to server/.env and fill it in.')
}

// One shared pool of database connections for the whole server. Each query borrows
// a connection and gives it back, so we don't reconnect to Neon on every request.
export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})
