import { useMemo } from 'react'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import { proximosPrazos } from '../data/calendarioFiscal.js'
import './CalendarioFiscal.css'

export default function CalendarioFiscal() {
  const prazos = useMemo(() => proximosPrazos(6), [])

  return (
    <section id="calendario-fiscal" className="section-pad calendario">
      <div className="container">
        <Reveal as="div" className="section-head center light">
          <p className="eyebrow">Não perca prazos</p>
          <h2>Calendário Fiscal</h2>
          <p>Os próximos prazos fiscais relevantes, para nunca ser surpreendido.</p>
        </Reveal>

        <div className="calendario__grid">
          {prazos.map((p, i) => (
            <Reveal as="div" key={p.id} delay={i * 60} className="calendario-item">
              <div className="calendario-item__date">{p.dataFormatada}</div>
              <div className="calendario-item__body">
                <h4>{p.titulo}</h4>
                <p>{p.descricao}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" delay={360} className="calendario__disclaimer">
          <Icon name="shield" size={16} /> Datas indicativas, de acordo com as regras gerais em vigor — podem
          variar por feriado, fim de semana ou alteração legislativa. Fale connosco para confirmar prazos
          específicos da sua empresa.
        </Reveal>
      </div>
    </section>
  )
}
