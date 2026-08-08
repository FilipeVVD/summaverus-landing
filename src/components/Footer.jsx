import './Footer.css'

export default function Footer() {
  const ano = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <a href="#top" className="site-footer__brand">
          <img src="/assets/icon-light.png" alt="" />
          <span>Summa<em>Verus</em></span>
        </a>

        <nav className="site-footer__nav">
          <a href="#servicos">Serviços</a>
          <a href="#sobre">Sobre</a>
          <a href="#calendario-fiscal">Calendário Fiscal</a>
          <a href="#noticias">Notícias</a>
          <a href="#contactos">Contactos</a>
        </nav>

        <div className="site-footer__legal">
          <p>Avenida do Autarca, n.º 83 · 1º piso · 4730-072 Barbudo VVD</p>
          <p>NIF 505 462 460 · © {ano} Summa Verus Contabilidade, Lda.</p>
        </div>
      </div>
    </footer>
  )
}
