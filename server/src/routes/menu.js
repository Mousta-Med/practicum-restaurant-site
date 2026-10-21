import { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

const selectDishes = `
  SELECT id, category, name, description, price, image_url, image_alt
  FROM menu_items
`

// Turns a database row into the JSON shape the React app uses
function toDish(row) {
  return {
    id: row.id,
    category: row.category,
    name: row.name,
    description: row.description,
    // pg returns NUMERIC columns as text ("11.00") so no precision is lost; the menu needs a number
    price: Number(row.price),
    image: row.image_url,
    alt: row.image_alt,
  }
}

// GET /api/menu: every dish, in menu order
router.get('/', async (req, res) => {
  const { rows } = await pool.query(`${selectDishes} ORDER BY sort_order, id`)
  res.json(rows.map(toDish))
})

// GET /api/menu/:id: one dish, e.g. /api/menu/4
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Dish id must be a positive whole number' })
  }

  const { rows } = await pool.query(`${selectDishes} WHERE id = $1`, [id])
  if (rows.length === 0) {
    return res.status(404).json({ error: 'Dish not found' })
  }
  res.json(toDish(rows[0]))
})

export default router
