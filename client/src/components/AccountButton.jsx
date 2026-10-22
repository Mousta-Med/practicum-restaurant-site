import { useState } from 'react'
import { authClient } from '../lib/auth-client.js'
import AuthDialog from './AuthDialog.jsx'

const buttonClass =
  'rounded-md border-2 border-linen/60 px-3 py-1.5 text-sm font-semibold transition-colors hover:border-linen hover:bg-linen hover:text-olive'

// Shows "Sign in" to visitors, and the user's name plus "Sign out" when signed in
function AccountButton() {
  // useSession() asks the server who is signed in (using the session cookie) when the
  // page loads, and re-renders this component whenever someone signs in or out
  const { data: session, isPending } = authClient.useSession()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Still checking the cookie with the server: show nothing rather than the wrong button
  if (isPending) return null

  if (session) {
    const firstName = session.user.name.split(' ')[0]
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-stone sm:inline">Hi, {firstName}</span>
        <button type="button" onClick={() => authClient.signOut()} className={buttonClass}>
          Sign out
        </button>
      </div>
    )
  }

  return (
    <>
      <button type="button" onClick={() => setIsDialogOpen(true)} className={buttonClass}>
        Sign in
      </button>
      <AuthDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  )
}

export default AccountButton
