// Controlled component: it keeps no state of its own. The parent passes the current
// `value` and an `onChange` function, and the stepper only asks for a new value.
function QuantityStepper({ value, onChange, label, min = 0, max = 10 }) {
  const buttonClass =
    'flex size-9 items-center justify-center rounded-full border-2 border-olive text-lg leading-none font-bold text-olive transition-colors hover:bg-olive hover:text-linen disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-olive'

  return (
    <div role="group" aria-label={`Quantity of ${label}`} className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Remove one ${label}`}
        className={buttonClass}
      >
        −
      </button>
      <span aria-live="polite" className="w-6 text-center font-semibold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Add one ${label}`}
        className={buttonClass}
      >
        +
      </button>
    </div>
  )
}

export default QuantityStepper
