import Header from './components/Header.jsx'

function App() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="font-heading text-4xl font-bold text-olive">
          Olive <span className="text-ember">&amp;</span> Ember
        </h1>
        <p className="mt-2 text-muted">Mediterranean kitchen, wood-fired.</p>
      </main>
    </>
  )
}

export default App
