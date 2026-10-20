function OrderSummary({ itemCount, total, onClear }) {
  return (
    <div className="sticky bottom-4 mt-8 flex flex-wrap items-center justify-between gap-3 rounded-md bg-olive p-3 text-linen shadow-card sm:p-4">
      <p className="font-semibold">
        <span className="sr-only sm:not-sr-only">Your pre-order: </span>
        {itemCount} {itemCount === 1 ? 'dish' : 'dishes'} &middot; ${total}
      </p>
      <div className="flex gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onClear}
          className="rounded-md border-2 border-linen px-3 py-2 text-sm font-semibold transition-colors hover:bg-linen hover:text-olive sm:px-4"
        >
          Clear
        </button>
        <a
          href="#reservation"
          className="rounded-md border-2 border-ember bg-ember px-3 py-2 text-sm font-semibold transition-colors hover:border-ember-dark hover:bg-ember-dark sm:px-4"
        >
          Reserve<span className="hidden sm:inline"> a table</span>
        </a>
      </div>
    </div>
  )
}

export default OrderSummary
