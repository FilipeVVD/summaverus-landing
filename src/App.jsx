import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Servicos from './components/Servicos.jsx'
import Sobre from './components/Sobre.jsx'
import CalendarioFiscal from './components/CalendarioFiscal.jsx'
import Noticias from './components/Noticias.jsx'
import Contactos from './components/Contactos.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicos />
        <Sobre />
        <CalendarioFiscal />
        <Noticias />
        <Contactos />
      </main>
      <Footer />
    </>
  )
}
