import './Hero.css'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__glow" />
      <div className="container hero__inner">
        <img src="/assets/icon-light.png" alt="Summa Verus" className="hero__mark" />
        <p className="eyebrow hero__eyebrow">Contabilidade · Fiscalidade · Consultoria</p>
        <h1 className="hero__title">
          Summa<span>Verus</span>
        </h1>
        <p className="hero__tagline">
          Rigor, confiança e proximidade na gestão do seu negócio.
        </p>
        <div className="hero__actions">
          <a href="https://summa-verus-portal-dev.vercel.app" target="_blank" rel="noopener" className="btn btn-gold">
            Aceder ao Portal
          </a>
          <a href="#servicos" className="btn btn-outline-light">
            Conhecer os Serviços
          </a>
        </div>
      </div>
      <a href="#servicos" className="hero__scroll" aria-label="Descer para os serviços">
        <span />
      </a>
    </section>
  )
}
