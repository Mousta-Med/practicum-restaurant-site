import { useState } from 'react'
import { menuItems } from '../data/menu.js'
import MenuCard from './MenuCard.jsx'
import OrderSummary from './OrderSummary.jsx'
import SectionHeading from './SectionHeading.jsx'

// 'All' plus each category found in the data, without duplicates
const categories = ['All', ...new Set(menuItems.map((item) => item.category))]

function Menu() {
  const [activeCategory, setActiveCategory] = useState('All')
  // Pre-order quantities by dish id, e.g. { 4: 2, 7: 1 }. Kept here (not in each card)
  // so they survive when the filter hides a card, and so we can total them.
  const [quantities, setQuantities] = useState({})

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

        <div role="group" aria-label="Filter dishes by category" className="mb-8 flex flex-wrap justify-center gap-2">
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

        {itemCount > 0 && <OrderSummary itemCount={itemCount} total={total} onClear={() => setQuantities({})} />}
      </div>
    </section>
  )
}

export default Menu
