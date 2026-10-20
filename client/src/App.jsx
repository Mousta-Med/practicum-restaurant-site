import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Menu from './components/Menu.jsx'
import Reservation from './components/Reservation.jsx'

function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Menu />
        <Reservation />
      </main>
      <Footer />
    </>
  )
}

export default App
