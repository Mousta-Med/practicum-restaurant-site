import { useEffect, useRef, useState } from 'react'
import { authClient } from '../lib/auth-client.js'

const fieldClass =
  'block w-full min-w-0 min-h-12 rounded-md border border-line bg-cream px-3 py-2.5 text-ink focus:border-olive'
const labelClass = 'mb-1.5 block font-semibold'

// Pop-up form for signing in or creating an account. Uses the browser's <dialog>
// element, which handles focus, the Esc key and the dimmed backdrop for us.
function AuthDialog({ open, onClose }) {
  const dialogRef = useRef(null)
  const [mode, setMode] = useState('signIn') // 'signIn' or 'signUp'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isSignUp = mode === 'signUp'

  // Keep the real <dialog> in step with the `open` prop
  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) {
      dialog.showModal()
      // Put the cursor in the first field instead of on the close button
      dialog.querySelector('input')?.focus()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  function switchMode() {
    setMode(isSignUp ? 'signIn' : 'signUp')
    setError('')
  }

  function handleClose() {
    setPassword('')
    setError('')
    onClose()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Better Auth sends the request to our server; on success the server sets the
    // session cookie and useSession() everywhere on the page updates by itself
    const { error } = isSignUp
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password })

    setIsSubmitting(false)
    if (error) {
      setError(error.message || 'Something went wrong. Please try again.')
      return
    }
    setName('')
    setEmail('')
    handleClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      aria-labelledby="auth-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-md bg-surface p-6 text-ink shadow-card backdrop:bg-shade/60 sm:p-8"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <h2 id="auth-title" className="font-heading text-2xl font-bold text-olive">
          {isSignUp ? 'Create an account' : 'Sign in'}
        </h2>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-muted transition-colors hover:bg-sand hover:text-ink"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div>
            <label htmlFor="auth-name" className={labelClass}>
              Name
            </label>
            <input
              id="auth-name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={fieldClass}
            />
          </div>
        )}
        <div>
          <label htmlFor="auth-email" className={labelClass}>
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="auth-password" className={labelClass}>
            Password {isSignUp && <span className="font-normal text-muted">(8 characters or more)</span>}
          </label>
          <input
            id="auth-password"
            type="password"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={fieldClass}
          />
        </div>

        {error && (
          <p role="alert" className="rounded-md bg-ember/10 px-3 py-2 text-sm font-semibold text-ember-dark">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="block w-full rounded-md bg-ember px-6 py-3 font-semibold text-linen transition-colors hover:bg-ember-dark disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        {isSignUp ? 'Already have an account?' : 'New to Olive & Ember?'}{' '}
        <button type="button" onClick={switchMode} className="font-semibold text-ember underline">
          {isSignUp ? 'Sign in' : 'Create an account'}
        </button>
      </p>
    </dialog>
  )
}

export default AuthDialog
