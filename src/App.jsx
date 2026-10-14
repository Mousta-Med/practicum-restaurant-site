import About from './components/About.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Menu from './components/Menu.jsx'

function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Menu />
      </main>
    </>
  )
}

export default App
