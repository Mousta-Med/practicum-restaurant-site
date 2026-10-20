import QuantityStepper from './QuantityStepper.jsx'

function MenuCard({ item, quantity, onQuantityChange }) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-md bg-surface shadow-card ${
        quantity > 0 ? 'ring-2 ring-ember' : ''
      }`}
    >
      <img
        src={item.image}
        alt={item.alt}
        width="800"
        height="600"
        loading="lazy"
        className="aspect-4/3 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-1 text-xs font-bold tracking-widest text-ember uppercase">{item.category}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="font-heading text-lg font-bold">{item.name}</h3>
          {/* Dotted leader line between the dish name and its price */}
          <span aria-hidden="true" className="min-w-4 flex-1 border-b-2 border-dotted border-line" />
          <span className="font-bold text-ember">${item.price}</span>
        </div>
        <p className="mt-1 text-[0.9375rem] text-muted">{item.description}</p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <span className="text-sm text-muted">Pre-order</span>
          <QuantityStepper value={quantity} onChange={onQuantityChange} label={item.name} />
        </div>
      </div>
    </article>
  )
}

export default MenuCard
