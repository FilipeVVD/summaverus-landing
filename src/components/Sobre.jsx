import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import './Sobre.css'

const DIFERENCIADORES = [
  {
    icon: 'shield',
    titulo: 'Rigor',
    texto: 'Cumprimento escrupuloso de prazos e obrigações, com processos revistos ao pormenor.',
  },
  {
    icon: 'handshake',
    titulo: 'Confiança',
    texto: 'Uma relação transparente e de longo prazo, construída à volta dos interesses do seu negócio.',
  },
  {
    icon: 'compass',
    titulo: 'Proximidade',
    texto: 'Acompanhamento direto e acessível — sem intermediários, sem respostas genéricas.',
  },
  {
    icon: 'spark',
    titulo: 'Resposta Rápida',
    texto: 'Disponibilidade para esclarecer dúvidas e resolver situações com agilidade.',
  },
]

export default function Sobre() {
  return (
    <section id="sobre" className="section-pad sobre">
      <div className="container sobre__grid">
        <Reveal as="div" className="sobre__text">
          <p className="eyebrow">Quem somos</p>
          <h2>Uma equipa dedicada ao seu negócio</h2>
          <p className="sobre__lead">
            A Summa Verus acompanha empresas na gestão contabilística, fiscal e de recursos humanos,
            com o rigor técnico que a lei exige e a proximidade que uma verdadeira parceria precisa.
            Acreditamos que uma boa gestão financeira liberta tempo e clareza para quem faz o negócio crescer.
          </p>
          <p className="sobre__lead">
            É essa mesma exigência que levamos agora para uma nova área: o controlo de qualidade têxtil,
            alargando o nosso compromisso de rigor a mais uma etapa da cadeia de valor dos nossos clientes.
          </p>
        </Reveal>

        <Reveal as="div" delay={120} className="sobre__diferenciadores">
          {DIFERENCIADORES.map((d) => (
            <div key={d.titulo} className="diferenciador">
              <Icon name={d.icon} size={22} />
              <div>
                <h4>{d.titulo}</h4>
                <p>{d.texto}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
