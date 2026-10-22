import { useEffect, useState } from 'react'
import MenuCard from './MenuCard.jsx'
import OrderSummary from './OrderSummary.jsx'
import SectionHeading from './SectionHeading.jsx'

function Menu() {
  // The dishes come from our API (which reads them from Postgres), not from a file
  const [menuItems, setMenuItems] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  // Bumping this number re-runs the effect below, which is how "Try again" reloads
  const [loadAttempt, setLoadAttempt] = useState(0)

  const [activeCategory, setActiveCategory] = useState('All')
  // Pre-order quantities by dish id, e.g. { 4: 2, 7: 1 }. Kept here (not in each card)
  // so they survive when the filter hides a card, and so we can total them.
  const [quantities, setQuantities] = useState({})

  // Fetch the menu when the section first appears (and again after "Try again")
  useEffect(() => {
    // If React throws this request away (e.g. it re-runs the effect), ignore its answer
    let ignore = false

    async function loadMenu() {
      try {
        const response = await fetch('/api/menu')
        if (!response.ok) throw new Error(`The API answered with HTTP ${response.status}`)
        const dishes = await response.json()
        if (!ignore) {
          setMenuItems(dishes)
          setStatus('ready')
        }
      } catch (error) {
        console.error('Could not load the menu:', error)
        if (!ignore) setStatus('error')
      }
    }

    loadMenu()
    return () => {
      ignore = true
    }
  }, [loadAttempt])

  function retry() {
    setStatus('loading')
    setLoadAttempt((attempt) => attempt + 1)
  }

  // 'All' plus each category found in the dishes, without duplicates
  const categories = ['All', ...new Set(menuItems.map((item) => item.category))]

  const visibleItems =
    activeCategory === 'All' ? menuItems : menuItems.filter((item) => item.category === activeCategory)

  function updateQuantity(id, newQuantity) {
    setQuantities((current) => ({ ...current, [id]: newQuantity }))
  }

  const itemCount = menuItems.reduce((sum, item) => sum + (quantities[item.id] ?? 0), 0)
  const total = menuItems.reduce((sum, item) => sum + (quantities[item.id] ?? 0) * item.price, 0)

  return (
    <section id="menu" aria-labelledby="menu-title" className="bg-sand py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <SectionHeading id="menu-title" eyebrow="Menu" title="From the wood-fired kitchen" />
          <p className="text-muted">
            Our menu follows the seasons and the market. Ask your server about today's specials and dietary options.
          </p>
        </div>

        {status === 'loading' && (
          <>
            <p role="status" className="sr-only">
              Loading the menu…
            </p>
            {/* Grey placeholder cards, so the page doesn't jump when the dishes arrive */}
            <ul aria-hidden="true" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <li key={n} className="overflow-hidden rounded-md bg-surface shadow-card motion-safe:animate-pulse">
                  <div className="aspect-4/3 bg-line" />
                  <div className="space-y-3 p-6">
                    <div className="h-3 w-20 rounded bg-line" />
                    <div className="h-5 w-3/4 rounded bg-line" />
                    <div className="h-4 w-full rounded bg-line" />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {status === 'error' && (
          <div role="alert" className="mx-auto max-w-md rounded-md bg-surface p-6 text-center shadow-card">
            <p className="mb-4 font-semibold text-ink">Sorry, we couldn't load the menu right now.</p>
            <button
              type="button"
              onClick={retry}
              className="rounded-md border-2 border-olive px-5 py-2.5 font-semibold text-olive transition-colors hover:bg-olive hover:text-linen"
            >
              Try again
            </button>
          </div>
        )}

        {status === 'ready' && (
          <>
            <div
              role="group"
              aria-label="Filter dishes by category"
              className="mb-8 flex flex-wrap justify-center gap-2"
            >
              {categories.map((category) => {
                const isActive = category === activeCategory
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
                      isActive
                        ? 'border-olive bg-olive text-linen'
                        : 'border-line bg-surface text-olive hover:border-olive'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>

            <p aria-live="polite" className="sr-only">
              Showing {visibleItems.length} dishes
            </p>

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleItems.map((item) => (
                <li key={item.id}>
                  <MenuCard
                    item={item}
                    quantity={quantities[item.id] ?? 0}
                    onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
                  />
                </li>
              ))}
            </ul>

            {itemCount > 0 && (
              <OrderSummary itemCount={itemCount} total={total} onClear={() => setQuantities({})} />
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default Menu
