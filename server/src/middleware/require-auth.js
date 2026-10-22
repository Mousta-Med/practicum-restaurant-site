import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../auth.js'

// Put this in front of any route that needs a signed-in user. It reads the session
// cookie the browser sent, asks Better Auth whether it's valid, and either stops the
// request with 401 or stores the user on req.user for the route to use.
export async function requireAuth(req, res, next) {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })

  if (!session) {
    return res.status(401).json({ error: 'You need to sign in first' })
  }

  req.user = session.user
  next()
}
