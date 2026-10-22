// Creates (or updates) the tables Better Auth needs: user, session, account, verification.
// This runs the same migration as Better Auth's official CLI, and prints the SQL first.
// Usage: npm run db:auth
import { getMigrations } from 'better-auth/db/migration'
import { auth } from '../src/auth.js'
import { pool } from '../src/db.js'

try {
  const { toBeCreated, toBeAdded, compileMigrations, runMigrations } = await getMigrations(auth.options)

  if (toBeCreated.length === 0 && toBeAdded.length === 0) {
    console.log('Auth tables are already up to date.')
  } else {
    console.log('Running this SQL:\n')
    console.log(await compileMigrations())
    await runMigrations()
    console.log(`\nDone. New tables: ${toBeCreated.map((t) => t.table).join(', ') || 'none'}`)
  }
} finally {
  await pool.end()
}
