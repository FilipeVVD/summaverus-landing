// Prazos fiscais recorrentes em Portugal (regras gerais) — usado apenas como
// reserva caso a chamada à API do portal (api/calendario-publico) falhe.
// frequencia: 'mensal' -> repete todos os meses no dia indicado
// frequencia: 'anual'  -> ocorre uma vez por ano, no mês/dia indicado
// categoria: 'declarativa' | 'pagamento' (mesma semântica do portal)
export const prazosFiscais = [
  {
    id: 'iva-mensal',
    titulo: 'IVA — Declaração Periódica Mensal',
    categoria: 'declarativa',
    frequencia: 'mensal',
    dia: 20,
    periodoReferencia: 'm-2',
    descricao: 'Entrega da declaração periódica de IVA (regime mensal).',
  },
  {
    id: 'retencoes-seg-social',
    titulo: 'Retenções na Fonte e Segurança Social',
    categoria: 'declarativa',
    frequencia: 'mensal',
    dia: 20,
    periodoReferencia: 'm-1',
    descricao: 'Entrega e pagamento das retenções na fonte de IRS/IRC e das contribuições para a Segurança Social.',
  },
  {
    id: 'iva-pagamento',
    titulo: 'IVA — Pagamento',
    categoria: 'pagamento',
    frequencia: 'mensal',
    dia: 25,
    periodoReferencia: 'm-2',
    descricao: 'Pagamento do IVA apurado na declaração periódica.',
  },
  {
    id: 'modelo22',
    titulo: 'Modelo 22 (IRC)',
    categoria: 'declarativa',
    frequencia: 'anual',
    mes: 5,
    dia: 31,
    periodoReferencia: 'N-1',
    descricao: 'Entrega da declaração anual de rendimentos (IRC) para entidades com período de tributação igual ao ano civil.',
  },
  {
    id: 'pagamento-conta-1',
    titulo: 'IRC — 1º Pagamento por Conta',
    categoria: 'pagamento',
    frequencia: 'anual',
    mes: 7,
    dia: 31,
    periodoReferencia: 'N',
    descricao: 'Primeiro pagamento por conta do IRC.',
  },
  {
    id: 'ies',
    titulo: 'IES / Declaração Anual',
    categoria: 'declarativa',
    frequencia: 'anual',
    mes: 7,
    dia: 15,
    periodoReferencia: 'N-1',
    descricao: 'Entrega da Informação Empresarial Simplificada.',
  },
  {
    id: 'pagamento-conta-2',
    titulo: 'IRC — 2º Pagamento por Conta',
    categoria: 'pagamento',
    frequencia: 'anual',
    mes: 9,
    dia: 30,
    periodoReferencia: 'N',
    descricao: 'Segundo pagamento por conta do IRC.',
  },
  {
    id: 'pagamento-conta-3',
    titulo: 'IRC — 3º Pagamento por Conta',
    categoria: 'pagamento',
    frequencia: 'anual',
    mes: 12,
    dia: 15,
    periodoReferencia: 'N',
    descricao: 'Terceiro pagamento por conta do IRC (quando aplicável).',
  },
  {
    id: 'modelo10',
    titulo: 'Modelo 10',
    categoria: 'declarativa',
    frequencia: 'anual',
    mes: 1,
    dia: 31,
    periodoReferencia: 'N-1',
    descricao: 'Declaração de rendimentos e retenções sujeitos e não sujeitos a IRS/IRC.',
  },
]

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
const MESES_LONGOS = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

// Mesma lógica usada em api/calendario-publico no portal.
function textoReferencia(periodoReferencia, mesIndex, ano) {
  if (periodoReferencia === 'N') return `referente ao ano de ${ano}`
  if (periodoReferencia === 'N-1') return `referente ao exercício de ${ano - 1}`
  const deslocamento = { 'm-0': 0, 'm-1': 1, 'm-2': 2 }[periodoReferencia] ?? 0
  let mesRef = mesIndex - deslocamento
  let anoRef = ano
  while (mesRef < 0) { mesRef += 12; anoRef -= 1 }
  return `referente a ${MESES_LONGOS[mesRef]} de ${anoRef}`
}

function proximaOcorrencia(prazo, referencia) {
  const ano = referencia.getFullYear()
  const mes = prazo.frequencia === 'mensal' ? referencia.getMonth() : prazo.mes - 1
  let data = new Date(ano, mes, prazo.dia)
  if (data < referencia) {
    if (prazo.frequencia === 'mensal') {
      data = new Date(ano, referencia.getMonth() + 1, prazo.dia)
    } else {
      data = new Date(ano + 1, mes, prazo.dia)
    }
  }
  return data
}

function calcular(quantidade, categoria, referencia) {
  const hoje = new Date(referencia.getFullYear(), referencia.getMonth(), referencia.getDate())
  return prazosFiscais
    .filter((p) => p.categoria === categoria)
    .map((p) => ({ ...p, data: proximaOcorrencia(p, hoje) }))
    .sort((a, b) => a.data - b.data)
    .slice(0, quantidade)
    .map((p) => ({
      ...p,
      dataFormatada: `${String(p.data.getDate()).padStart(2, '0')} ${MESES[p.data.getMonth()]} ${p.data.getFullYear()}`,
      referencia: textoReferencia(p.periodoReferencia, p.data.getMonth(), p.data.getFullYear()),
    }))
}

export function proximosPrazosAgrupados(quantidadePorGrupo = 5, referencia = new Date()) {
  return {
    declarativas: calcular(quantidadePorGrupo, 'declarativa', referencia),
    pagamentos: calcular(quantidadePorGrupo, 'pagamento', referencia),
  }
}
