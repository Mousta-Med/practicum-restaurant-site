import { betterAuth } from 'better-auth'
import { pool } from './db.js'

if (!process.env.BETTER_AUTH_SECRET || !process.env.BETTER_AUTH_URL) {
  throw new Error('BETTER_AUTH_SECRET and BETTER_AUTH_URL must be set. See server/.env.example.')
}

// Better Auth handles sign-up, sign-in, sign-out and sessions for us. It stores users
// and sessions in the same Postgres database, through the same pg pool as the menu.
export const auth = betterAuth({
  database: pool,
  // Signs the session cookie so it can't be forged
  secret: process.env.BETTER_AUTH_SECRET,
  // The public address of the site. Requests from this origin are trusted.
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  session: {
    // Stay signed in for 7 days; using the site refreshes this once a day
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
})
