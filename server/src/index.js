import express from 'express'

const app = express()
const port = process.env.PORT || 3000

// Parse JSON request bodies into req.body
app.use(express.json())

// Quick check that the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
})
