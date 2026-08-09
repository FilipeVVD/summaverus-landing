import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import { proximosPrazos } from '../data/calendarioFiscal.js'
import './CalendarioFiscal.css'

// Quando o portal passar de dev para produção, atualizar este URL.
const API_URL = 'https://summa-verus-portal-dev.vercel.app/api/calendario-publico'

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-').map(Number)
  return `${String(dia).padStart(2, '0')} ${MESES[mes - 1]}`
}

export default function CalendarioFiscal() {
  const [prazos, setPrazos] = useState(() => proximosPrazos(6))
  const [fonte, setFonte] = useState('local')

  useEffect(() => {
    let cancelado = false

    fetch(API_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('resposta inválida'))))
      .then((data) => {
        if (cancelado || !Array.isArray(data?.eventos) || !data.eventos.length) return
        setPrazos(
          data.eventos.slice(0, 6).map((e, i) => ({
            id: `${e.titulo}-${e.data}-${i}`,
            titulo: e.titulo,
            descricao: e.descricao || '—',
            dataFormatada: formatarData(e.data),
          })),
        )
        setFonte('portal')
      })
      .catch(() => {
        // mantém os dados locais de reserva já definidos no estado inicial
      })

    return () => { cancelado = true }
  }, [])

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
          <Icon name="shield" size={16} />
          {fonte === 'portal'
            ? ' Datas geridas diretamente no Portal — podem variar por feriado, fim de semana ou alteração legislativa. Fale connosco para confirmar prazos específicos da sua empresa.'
            : ' Datas indicativas, de acordo com as regras gerais em vigor — podem variar por feriado, fim de semana ou alteração legislativa. Fale connosco para confirmar prazos específicos da sua empresa.'}
        </Reveal>
      </div>
    </section>
  )
}
