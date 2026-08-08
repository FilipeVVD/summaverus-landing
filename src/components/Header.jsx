import { useEffect, useState } from 'react'
import './Header.css'

const LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#calendario-fiscal', label: 'Calendário Fiscal' },
  { href: '#noticias', label: 'Notícias' },
  { href: '#contactos', label: 'Contactos' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className={`site-header ${scrolled || open ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a href="#top" className="site-header__brand" onClick={closeMenu}>
          <img src="/assets/icon.png" alt="" className="site-header__mark" />
          <span>Summa<em>Verus</em></span>
        </a>

        <nav className="site-header__nav">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <a href="https://summa-verus-portal-dev.vercel.app" target="_blank" rel="noopener" className="btn btn-gold site-header__cta">
          Aceder ao Portal
        </a>

        <button
          className={`site-header__burger ${open ? 'is-open' : ''}`}
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`site-header__mobile ${open ? 'is-open' : ''}`}>
        <nav>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={closeMenu}>{l.label}</a>
          ))}
          <a
            href="https://summa-verus-portal-dev.vercel.app"
            target="_blank"
            rel="noopener"
            className="btn btn-gold"
            onClick={closeMenu}
          >
            Aceder ao Portal
          </a>
        </nav>
      </div>
    </header>
  )
}
