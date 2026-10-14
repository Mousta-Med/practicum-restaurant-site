import { useState } from 'react'
import { menuItems } from '../data/menu.js'
import MenuCard from './MenuCard.jsx'
import SectionHeading from './SectionHeading.jsx'

// 'All' plus each category found in the data, without duplicates
const categories = ['All', ...new Set(menuItems.map((item) => item.category))]

function Menu() {
  const [activeCategory, setActiveCategory] = useState('All')

  const visibleItems =
    activeCategory === 'All' ? menuItems : menuItems.filter((item) => item.category === activeCategory)

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
              <MenuCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Menu
