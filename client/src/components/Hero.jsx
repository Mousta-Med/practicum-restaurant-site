function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[85svh] items-center bg-olive py-16 text-linen"
    >
      <img
        src="/img/hero.jpg"
        alt="A rustic wooden table set with Mediterranean mezze: falafel, labneh, fresh salads, and kofta"
        width="1920"
        height="1080"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-shade/85 to-shade/35" />

      <div className="mx-auto w-full max-w-6xl px-4">
        <p className="mb-2 text-sm font-bold tracking-widest text-ember-light uppercase">
          Mediterranean kitchen &middot; Wood-fired
        </p>
        <h1
          id="hero-title"
          className="mb-4 max-w-[16ch] font-heading text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl"
        >
          Simple food, honest fire, a table worth sharing.
        </h1>
        <p className="mb-10 max-w-xl text-lg text-stone">
          Seasonal starters, wood-fired mains, and house-made desserts, cooked over an olive-wood fire every evening.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#reservation"
            className="inline-block rounded-md border-2 border-ember bg-ember px-6 py-3 font-semibold transition-colors hover:border-ember-dark hover:bg-ember-dark"
          >
            Reserve a table
          </a>
          <a
            href="#menu"
            className="inline-block rounded-md border-2 border-linen px-6 py-3 font-semibold transition-colors hover:bg-linen hover:text-olive"
          >
            See the menu
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
