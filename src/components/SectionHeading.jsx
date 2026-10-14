function SectionHeading({ id, eyebrow, title }) {
  return (
    <>
      <p className="mb-2 text-sm font-bold tracking-widest text-ember uppercase">{eyebrow}</p>
      <h2 id={id} className="mb-4 font-heading text-3xl leading-tight font-bold text-olive md:text-4xl">
        {title}
      </h2>
    </>
  )
}

export default SectionHeading
