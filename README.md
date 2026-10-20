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

## Database

Postgres, hosted on Neon. The connection string lives in `server/.env` as `DATABASE_URL` (see `server/.env.example`); `.env` is git-ignored, so it is never committed.

To create the tables, run this inside `server/`:

```bash
npm run db:schema
```

It runs [`server/db/schema.sql`](server/db/schema.sql). It's safe to run again, since it skips tables that already exist.

### `menu_items`: one row per dish

| Column | Type | Meaning |
|---|---|---|
| `id` | serial number | Unique ID, assigned automatically |
| `name` | text, unique | Dish name; no two dishes can share one |
| `category` | text | Must be `Starters`, `Mains` or `Desserts` |
| `description` | text | Short list of what's in it |
| `price` | numeric(6,2) | Exact price in dollars (e.g. `11.00`), never negative |
| `image_url` | text | Path to the dish photo |
| `image_alt` | text | Photo description for screen readers |
| `sort_order` | integer | Position on the menu, lowest first |
| `created_at` | timestamp | When the row was added |

In plain English: every dish has a unique name, belongs to exactly one of three categories, has a price that can't be negative, and has a photo with a text description.
