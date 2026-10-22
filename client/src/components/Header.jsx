import AccountButton from './AccountButton.jsx'
import Logo from './Logo.jsx'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#visit', label: 'Visit' },
]

function Header() {
  return (
    <header className="sticky top-0 z-10 bg-olive text-linen">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Logo />

        {/* Phones: links get their own full-width row under the logo and account button.
            md and up: one row, with the links pushed right next to the account button. */}
        <nav aria-label="Main" className="order-last basis-full md:order-0 md:ml-auto md:basis-auto">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="border-b-2 border-transparent py-1 transition-colors hover:border-ember-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#reservation"
                className="inline-block rounded-md bg-ember px-4 py-2 font-semibold transition-colors hover:bg-ember-dark"
              >
                Reserve
              </a>
            </li>
          </ul>
        </nav>

        <AccountButton />
      </div>
    </header>
  )
}

export default Header
