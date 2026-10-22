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

# Terminal 2: the website on http://localhost:5180
cd client
npm install
npm run dev
```

In development, Vite forwards every request that starts with `/api` to the Express server, so the React app calls the API with plain paths like `fetch('/api/health')`.

## Database

Postgres, hosted on Neon. The connection string lives in `server/.env` as `DATABASE_URL` (see `server/.env.example`); `.env` is git-ignored, so it is never committed.

To set up a fresh database, run these inside `server/`:

```bash
npm run db:schema   # creates our tables from server/db/schema.sql
npm run db:auth     # creates Better Auth's tables (prints the SQL it runs)
npm run db:seed     # fills menu_items with the 9 dishes from server/db/menu-data.js
```

All three are safe to run again. `db:schema` and `db:auth` skip tables that already exist. `db:seed` updates dishes that already exist (matched by name) instead of adding duplicates.

### Tables created by Better Auth (the auth library)

| Table | What one row is |
|---|---|
| `user` | A person with an account: `id`, `name`, `email` (unique), `emailVerified`, timestamps |
| `account` | How that person signs in. For email + password, it holds the **hashed** password (a random salt plus a scrypt hash, never the real password) |
| `session` | One signed-in browser: a random `token` (also stored in the browser's cookie), `expiresAt`, and the `userId` it belongs to |
| `verification` | Short-lived codes, such as email verification or password reset links |

`account` and `session` point to `user` through `userId`, with `on delete cascade`: deleting a user also deletes their sessions and sign-in methods.

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

## API

All routes return JSON.

| Route | Returns |
|---|---|
| `GET /api/health` | `{ "status": "ok", "database": "connected" }`, or HTTP 503 if the database can't be reached |
| `GET /api/menu` | Every dish in menu order: `[{ id, category, name, description, price, image, alt }, …]` |
| `GET /api/menu/:id` | One dish, e.g. `/api/menu/4`. HTTP 404 if there's no such dish, 400 if the id isn't a positive whole number |

The menu routes live in [`server/src/routes/menu.js`](server/src/routes/menu.js). The React menu ([`client/src/components/Menu.jsx`](client/src/components/Menu.jsx)) loads its dishes with `fetch('/api/menu')` inside a `useEffect`. It shows placeholder cards while loading, and a "Try again" button if the API can't be reached.

### Authentication

[Better Auth](https://www.better-auth.com) is configured in [`server/src/auth.js`](server/src/auth.js) and answers every `/api/auth/...` route:

| Route | Does |
|---|---|
| `POST /api/auth/sign-up/email` | Creates an account (`name`, `email`, `password` of 8+ characters) and signs in |
| `POST /api/auth/sign-in/email` | Signs in. Wrong email or password returns HTTP 401 |
| `POST /api/auth/sign-out` | Ends the session |
| `GET /api/auth/get-session` | The current user and session, or `null` |
| `GET /api/me` | Our own protected route: the signed-in user, or HTTP 401 |

**How a session works:** after sign-in, the server sends a signed, `HttpOnly` cookie holding the session token. JavaScript can't read it, so scripts can't steal it, but the browser sends it with every request. On each request, the server looks the token up in the `session` table. That's why you stay signed in after a page refresh, for 7 days. [`server/src/middleware/require-auth.js`](server/src/middleware/require-auth.js) does this check for protected routes.

Auth requests from any other website are refused (HTTP 403), because only `BETTER_AUTH_URL` is a trusted origin.

**In the React app:**
- [`client/src/lib/auth-client.js`](client/src/lib/auth-client.js) creates Better Auth's client.
- [`AccountButton`](client/src/components/AccountButton.jsx) in the header calls `authClient.useSession()`. That asks the server who is signed in when the page loads, and re-renders whenever someone signs in or out. It shows "Sign in", or "Hi, name" and "Sign out".
- "Sign in" opens [`AuthDialog`](client/src/components/AuthDialog.jsx), a sign-in / create-account form that calls `authClient.signIn.email()` or `authClient.signUp.email()`.
