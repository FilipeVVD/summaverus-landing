import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import { servicos } from '../data/servicos.js'
import './Servicos.css'

export default function Servicos() {
  return (
    <section id="servicos" className="section-pad servicos">
      <div className="container">
        <Reveal as="div" className="section-head center">
          <p className="eyebrow">O que fazemos</p>
          <h2>Serviços</h2>
          <p>Uma equipa próxima para tratar da contabilidade, fiscalidade e gestão do seu negócio — e agora também da qualidade têxtil.</p>
        </Reveal>

        <div className="servicos__grid">
          {servicos.map((s, i) => (
            <Reveal as="article" key={s.id} delay={i * 70} className={`servico-card ${s.novo ? 'is-novo' : ''}`}>
              {s.novo && <span className="servico-card__badge">Nova área</span>}
              <div className="servico-card__icon"><Icon name={s.icon} size={26} /></div>
              <h3>{s.titulo}</h3>
              <p>{s.descricao}</p>
              {s.contacto && (
                <div className="servico-card__contact">
                  <p className="servico-card__contact-name">{s.contacto.nome}</p>
                  <a href={`tel:${s.contacto.telefoneHref}`}>{s.contacto.telefone}</a>
                  <a href={`mailto:${s.contacto.email}`}>{s.contacto.email}</a>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
