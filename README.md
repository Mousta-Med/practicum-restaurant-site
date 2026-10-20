# Olive & Ember

Website for a fictional Mediterranean restaurant: a menu you can filter and pre-order from, table reservations, and an About section.

## Folder structure

```
client/   React + Vite + Tailwind frontend (what the visitor sees)
server/   Express API (talks to the database)
```

## Run it locally

You need Node.js 22.12 or newer. Use two terminals:

```bash
# Terminal 1: the API on http://localhost:3000
cd server
npm install
npm run dev

# Terminal 2: the website on http://localhost:5173
cd client
npm install
npm run dev
```

In development, Vite forwards every request that starts with `/api` to the Express server, so the React app calls the API with plain paths like `fetch('/api/health')`.
