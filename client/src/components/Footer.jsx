import { Fragment } from 'react'
import Logo from './Logo.jsx'

const openingHours = [
  { days: 'Monday', time: 'Closed' },
  { days: 'Tue – Thu', time: '17:00 – 22:00' },
  { days: 'Fri – Sat', time: '17:00 – 23:00' },
  { days: 'Sunday', time: '12:00 – 21:00' },
]

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer id="visit" className="bg-olive pt-16 pb-6 text-linen">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-2 text-stone">Seasonal Mediterranean cooking over an olive-wood fire.</p>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-xl font-bold text-ember-light">Opening hours</h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
              {openingHours.map((row) => (
                <Fragment key={row.days}>
                  <dt>{row.days}</dt>
                  <dd className="text-stone">{row.time}</dd>
                </Fragment>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-xl font-bold text-ember-light">Find us</h2>
            <address className="not-italic wrap-anywhere">
              24 Harbour Lane
              <br />
              Old Town, Springfield
              <br />
              <a href="tel:+15550142387" className="text-stone underline hover:text-linen">
                +1 (555) 014-2387
              </a>
              <br />
              <a href="mailto:hello@oliveandember.example" className="text-stone underline hover:text-linen">
                hello@oliveandember.example
              </a>
            </address>
          </div>
        </div>

        <p className="mt-10 border-t border-linen/20 pt-6 text-center text-sm text-stone">
          &copy; {currentYear} Olive &amp; Ember. All rights reserved. Photos from{' '}
          <a href="https://unsplash.com" className="underline hover:text-linen">
            Unsplash
          </a>
          .
        </p>
      </div>
    </footer>
  )
}

export default Footer
