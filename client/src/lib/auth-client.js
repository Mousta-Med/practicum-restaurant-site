import { createAuthClient } from 'better-auth/react'

// Talks to Better Auth on our own server at /api/auth. No URL needed: the API is on the
// same address as the site (Vite's proxy in development, Vercel's rewrite in production).
export const authClient = createAuthClient()
