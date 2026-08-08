import Reveal from './Reveal.jsx'
import { noticias } from '../data/noticias.js'
import './Noticias.css'

const formatador = new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })

export default function Noticias() {
  return (
    <section id="noticias" className="section-pad noticias">
      <div className="container">
        <Reveal as="div" className="section-head center">
          <p className="eyebrow">Atualidade</p>
          <h2>Notícias</h2>
          <p>O que se passa na Summa Verus.</p>
        </Reveal>

        <div className="noticias__grid">
          {noticias.map((n, i) => (
            <Reveal as="article" key={n.id} delay={i * 70} className="noticia-card">
              <span className="noticia-card__tag">{n.tag}</span>
              <time dateTime={n.data}>{formatador.format(new Date(n.data))}</time>
              <h3>{n.titulo}</h3>
              <p>{n.resumo}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
