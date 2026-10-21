import express from 'express'
import { pool } from './db.js'
import menuRouter from './routes/menu.js'

const app = express()
const port = process.env.PORT || 3000

// Parse JSON request bodies into req.body
app.use(express.json())

// Quick check that the server is running and can reach the database
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok', database: 'connected' })
  } catch (err) {
    console.error('Database check failed:', err.message)
    res.status(503).json({ status: 'error', database: 'unreachable' })
  }
})

app.use('/api/menu', menuRouter)

// Any other /api path that no route above matched
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Last resort: Express 5 sends errors thrown in async routes here
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong on the server' })
})

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
})
