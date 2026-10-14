import { menuItems } from '../data/menu.js'
import MenuCard from './MenuCard.jsx'
import SectionHeading from './SectionHeading.jsx'

function Menu() {
  return (
    <section id="menu" aria-labelledby="menu-title" className="bg-sand py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <SectionHeading id="menu-title" eyebrow="Menu" title="From the wood-fired kitchen" />
          <p className="text-muted">
            Our menu follows the seasons and the market. Ask your server about today's specials and dietary options.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
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
