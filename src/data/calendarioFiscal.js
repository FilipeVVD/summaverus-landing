// Prazos fiscais recorrentes em Portugal (regras gerais).
// Datas indicativas — podem variar em caso de fim de semana/feriado ou alteração legislativa.
// type: 'mensal' -> repete todos os meses no dia indicado
// type: 'anual'  -> ocorre uma vez por ano, no mês/dia indicado
export const prazosFiscais = [
  {
    id: 'iva-mensal',
    titulo: 'IVA — Declaração Periódica Mensal',
    tipo: 'mensal',
    dia: 20,
    descricao: 'Entrega da declaração periódica de IVA (regime mensal).',
  },
  {
    id: 'retencoes-seg-social',
    titulo: 'Retenções na Fonte e Segurança Social',
    tipo: 'mensal',
    dia: 20,
    descricao: 'Entrega e pagamento das retenções na fonte de IRS/IRC e das contribuições para a Segurança Social.',
  },
  {
    id: 'iva-pagamento',
    titulo: 'IVA — Pagamento',
    tipo: 'mensal',
    dia: 25,
    descricao: 'Pagamento do IVA apurado na declaração periódica.',
  },
  {
    id: 'modelo22',
    titulo: 'Modelo 22 (IRC)',
    tipo: 'anual',
    mes: 5,
    dia: 31,
    descricao: 'Entrega da declaração anual de rendimentos (IRC) para entidades com período de tributação igual ao ano civil.',
  },
  {
    id: 'pagamento-conta-1',
    titulo: 'IRC — 1º Pagamento por Conta',
    tipo: 'anual',
    mes: 7,
    dia: 31,
    descricao: 'Primeiro pagamento por conta do IRC.',
  },
  {
    id: 'ies',
    titulo: 'IES / Declaração Anual',
    tipo: 'anual',
    mes: 7,
    dia: 15,
    descricao: 'Entrega da Informação Empresarial Simplificada.',
  },
  {
    id: 'pagamento-conta-2',
    titulo: 'IRC — 2º Pagamento por Conta',
    tipo: 'anual',
    mes: 9,
    dia: 30,
    descricao: 'Segundo pagamento por conta do IRC.',
  },
  {
    id: 'pagamento-conta-3',
    titulo: 'IRC — 3º Pagamento por Conta',
    tipo: 'anual',
    mes: 12,
    dia: 15,
    descricao: 'Terceiro pagamento por conta do IRC (quando aplicável).',
  },
  {
    id: 'modelo10',
    titulo: 'Modelo 10',
    tipo: 'anual',
    mes: 1,
    dia: 31,
    descricao: 'Declaração de rendimentos e retenções sujeitos e não sujeitos a IRS/IRC.',
  },
]

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function proximaOcorrencia(prazo, referencia) {
  const ano = referencia.getFullYear()
  const mes = prazo.tipo === 'mensal' ? referencia.getMonth() : prazo.mes - 1
  let data = new Date(ano, mes, prazo.dia)
  if (data < referencia) {
    if (prazo.tipo === 'mensal') {
      data = new Date(ano, referencia.getMonth() + 1, prazo.dia)
    } else {
      data = new Date(ano + 1, mes, prazo.dia)
    }
  }
  return data
}

export function proximosPrazos(quantidade = 6, referencia = new Date()) {
  const hoje = new Date(referencia.getFullYear(), referencia.getMonth(), referencia.getDate())
  return prazosFiscais
    .map((p) => ({ ...p, data: proximaOcorrencia(p, hoje) }))
    .sort((a, b) => a.data - b.data)
    .slice(0, quantidade)
    .map((p) => ({
      ...p,
      dataFormatada: `${String(p.data.getDate()).padStart(2, '0')} ${MESES[p.data.getMonth()]}`,
    }))
}
