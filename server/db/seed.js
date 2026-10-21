// Copies the dishes from menu-data.js into the menu_items table.
// Usage: npm run db:seed
// Safe to run again: a dish that already exists (same name) is updated, not duplicated.
import { pool } from '../src/db.js'
import { menuItems } from './menu-data.js'

// $1, $2... are placeholders: pg sends the values separately from the SQL text,
// so a value can never be run as SQL (this is what prevents SQL injection).
const upsertDish = `
  INSERT INTO menu_items (name, category, description, price, image_url, image_alt, sort_order)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  ON CONFLICT (name) DO UPDATE SET
    category    = EXCLUDED.category,
    description = EXCLUDED.description,
    price       = EXCLUDED.price,
    image_url   = EXCLUDED.image_url,
    image_alt   = EXCLUDED.image_alt,
    sort_order  = EXCLUDED.sort_order
`

const client = await pool.connect()

try {
  // A transaction: either every dish is saved, or (if anything fails) none are
  await client.query('BEGIN')
  for (const [index, item] of menuItems.entries()) {
    await client.query(upsertDish, [
      item.name,
      item.category,
      item.description,
      item.price,
      item.image,
      item.alt,
      index + 1,
    ])
  }
  await client.query('COMMIT')
  console.log(`Seeded ${menuItems.length} dishes into menu_items.`)
} catch (err) {
  await client.query('ROLLBACK')
  throw err
} finally {
  client.release()
  await pool.end()
}
