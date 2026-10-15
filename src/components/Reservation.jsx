import { useState } from 'react'
import SectionHeading from './SectionHeading.jsx'

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8]
const lunchTimes = ['12:00', '12:30', '13:00', '13:30']
const dinnerTimes = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']

const fieldClass =
  'block w-full min-w-0 min-h-12 rounded-md border border-line bg-cream px-3 py-2.5 text-ink focus:border-olive'
const labelClass = 'mb-1.5 block font-semibold'

// Today's date as YYYY-MM-DD in the visitor's own time zone, so past dates can't be picked
const today = new Date().toLocaleDateString('en-CA')

function formatDate(isoDate) {
  return new Date(`${isoDate}T00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

function Reservation() {
  // null until the form is sent, then the details the guest entered
  const [booking, setBooking] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    setBooking(Object.fromEntries(new FormData(event.target)))
  }

  return (
    <section id="reservation" aria-labelledby="reservation-title" className="py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div>
          <SectionHeading id="reservation-title" eyebrow="Reservations" title="Book your table" />
          <p className="text-muted">
            Reserve online in a minute. For groups of 9 or more, private dining, or same-day bookings, call us at{' '}
            <a href="tel:+15550142387" className="font-semibold text-ember underline">
              +1 (555) 014-2387
            </a>
            .
          </p>
          <img
            src="/img/interior.jpg"
            alt="A softly lit dining room with set tables and warm lamps"
            width="1000"
            height="750"
            loading="lazy"
            className="mt-6 w-full rounded-md"
          />
        </div>

        <div className="rounded-md bg-surface p-6 shadow-card md:p-10">
          {booking ? (
            <div role="status" className="wrap-anywhere">
              <h3 className="mb-3 font-heading text-2xl font-bold text-olive">Thank you, {booking.name}!</h3>
              <p className="text-muted">
                Your request for {booking.guests} {booking.guests === '1' ? 'guest' : 'guests'} on{' '}
                {formatDate(booking.date)} at {booking.time} has been received. We'll send a confirmation to{' '}
                <span className="font-semibold text-ink">{booking.email}</span>.
              </p>
              <button
                type="button"
                onClick={() => setBooking(null)}
                className="mt-6 rounded-md border-2 border-olive px-5 py-2.5 font-semibold text-olive transition-colors hover:bg-olive hover:text-linen"
              >
                Make another booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full name
                  </label>
                  <input id="name" name="name" type="text" autoComplete="name" required className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input id="email" name="email" type="email" autoComplete="email" required className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="guests" className={labelClass}>
                    Guests
                  </label>
                  <select id="guests" name="guests" required defaultValue="" className={fieldClass}>
                    <option value="" disabled>
                      Choose
                    </option>
                    {guestOptions.map((count) => (
                      <option key={count} value={count}>
                        {count} {count === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className={labelClass}>
                    Date
                  </label>
                  <input id="date" name="date" type="date" min={today} required className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="time" className={labelClass}>
                    Time
                  </label>
                  <select id="time" name="time" required defaultValue="" className={fieldClass}>
                    <option value="" disabled>
                      Choose
                    </option>
                    <optgroup label="Sunday lunch">
                      {lunchTimes.map((time) => (
                        <option key={time}>{time}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Dinner">
                      {dinnerTimes.map((time) => (
                        <option key={time}>{time}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className={labelClass}>
                    Special requests <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="4"
                    placeholder="Allergies, celebrations, seating preferences"
                    className={`${fieldClass} resize-y`}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="block w-full rounded-md bg-ember px-6 py-3 font-semibold text-linen transition-colors hover:bg-ember-dark"
              >
                Request reservation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Reservation
