import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import { proximosPrazosAgrupados } from '../data/calendarioFiscal.js'
import './CalendarioFiscal.css'

// Quando o portal passar de dev para produção, atualizar este URL.
const API_URL = 'https://summa-verus-portal-dev.vercel.app/api/calendario-publico'

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-').map(Number)
  return `${String(dia).padStart(2, '0')} ${MESES[mes - 1]} ${ano}`
}

function normalizarApi(evento, i) {
  return {
    id: `${evento.titulo}-${evento.data}-${i}`,
    titulo: evento.titulo,
    descricao: evento.descricao || '',
    referencia: evento.referencia || '',
    dataFormatada: formatarData(evento.data),
  }
}

export default function CalendarioFiscal() {
  const [grupos, setGrupos] = useState(() => proximosPrazosAgrupados(5))
  const [fonte, setFonte] = useState('local')

  useEffect(() => {
    let cancelado = false

    fetch(API_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('resposta inválida'))))
      .then((data) => {
        if (cancelado) return
        const declarativas = Array.isArray(data?.declarativas) ? data.declarativas : []
        const pagamentos = Array.isArray(data?.pagamentos) ? data.pagamentos : []
        if (!declarativas.length && !pagamentos.length) return
        setGrupos({
          declarativas: declarativas.map(normalizarApi),
          pagamentos: pagamentos.map(normalizarApi),
        })
        setFonte('portal')
      })
      .catch(() => {
        // mantém os dados locais de reserva já definidos no estado inicial
      })

    return () => { cancelado = true }
  }, [])

  const colunas = [
    { chave: 'declarativas', titulo: 'Declarações', itens: grupos.declarativas },
    { chave: 'pagamentos', titulo: 'Pagamentos', itens: grupos.pagamentos },
  ]

  return (
    <section id="calendario-fiscal" className="section-pad calendario">
      <div className="container">
        <Reveal as="div" className="section-head center light">
          <p className="eyebrow">Não perca prazos</p>
          <h2>Calendário Fiscal</h2>
          <p>Os próximos prazos fiscais relevantes, para nunca ser surpreendido.</p>
        </Reveal>

        <div className="calendario__colunas">
          {colunas.map((coluna) => (
            <div key={coluna.chave} className="calendario__coluna">
              <h3 className="calendario__coluna-titulo">{coluna.titulo}</h3>
              {coluna.itens.length === 0 && (
                <p className="calendario__coluna-vazio">Sem prazos próximos nesta categoria.</p>
              )}
              <div className="calendario__lista">
                {coluna.itens.map((p, i) => (
                  <Reveal as="div" key={p.id} delay={i * 60} className="calendario-item">
                    <div className="calendario-item__date">{p.dataFormatada}</div>
                    <div className="calendario-item__body">
                      <h4>{p.titulo}</h4>
                      {p.referencia && <p className="calendario-item__referencia">{p.referencia}</p>}
                      {p.descricao && <p>{p.descricao}</p>}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal as="div" delay={360} className="calendario__disclaimer">
          <Icon name="shield" size={16} />
          <p>
            Datas apresentadas a título meramente informativo{fonte === 'portal' ? ', geridas diretamente no Portal' : ''}.
            A Summa Verus não se responsabiliza por qualquer lapso, alteração ou desatualização nos prazos aqui
            indicados. O utilizador deve sempre confirmar os prazos aplicáveis junto das entidades competentes
            (Autoridade Tributária, Segurança Social, entre outras) ou diretamente connosco.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
