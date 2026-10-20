import SectionHeading from './SectionHeading.jsx'

const highlights = [
  { value: '12', label: 'years by the fire' },
  { value: '100%', label: 'house-made bread & desserts' },
  { value: 'Local', label: 'farmers & fishermen' },
]

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <img
          src="/img/about.jpg"
          alt="A cook grilling meat over a roaring wood fire"
          width="1000"
          height="1250"
          loading="lazy"
          className="aspect-4/3 w-full rounded-md object-cover md:aspect-4/5"
        />

        <div>
          <SectionHeading id="about-title" eyebrow="Our story" title="Cooked over olive wood since 2014" />
          <div className="space-y-4 text-muted">
            <p>
              Olive &amp; Ember started as a small family kitchen with one idea: cook the food of the
              Mediterranean the way it has always been cooked, slowly and over a real fire.
            </p>
            <p>
              Every morning we light the oven with olive wood, bake our bread, and build the menu around what
              our farmers and fishermen bring in. Nothing is rushed, and everything is meant to be shared.
            </p>
          </div>

          <ul className="mt-10 flex flex-wrap gap-4">
            {highlights.map((item) => (
              <li key={item.label} className="grow basis-36 border-l-3 border-ember bg-sand p-4 text-sm">
                <strong className="block font-heading text-2xl text-olive">{item.value}</strong>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
