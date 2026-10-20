// Creates our tables by running schema.sql against the database.
// Usage: npm run db:schema
import { readFile } from 'node:fs/promises'
import { pool } from '../src/db.js'

const sql = await readFile(new URL('./schema.sql', import.meta.url), 'utf8')

try {
  await pool.query(sql)
  console.log('Schema applied: menu_items table is ready.')
} finally {
  await pool.end()
}
