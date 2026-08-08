import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import './Contactos.css'

const MAPS_QUERY = encodeURIComponent('Avenida do Autarca 83, 4730-072 Barbudo, Portugal')

export default function Contactos() {
  return (
    <section id="contactos" className="section-pad contactos">
      <div className="container">
        <Reveal as="div" className="section-head center">
          <p className="eyebrow">Fale connosco</p>
          <h2>Contactos</h2>
          <p>Estamos em Barbudo, Vila Verde. Para assuntos de cliente, use o Portal — para o resto, aqui tem os nossos contactos.</p>
        </Reveal>

        <div className="contactos__grid">
          <Reveal as="div" className="contactos__info">
            <div className="contacto-item">
              <Icon name="pin" size={20} />
              <div>
                <h4>Morada</h4>
                <p>Avenida do Autarca, n.º 83 · 1º piso<br />4730-072 Barbudo VVD</p>
              </div>
            </div>
            <div className="contacto-item">
              <Icon name="document" size={20} />
              <div>
                <h4>NIF</h4>
                <p>505 462 460</p>
              </div>
            </div>
            <div className="contacto-item contacto-item--highlight">
              <Icon name="textile" size={20} />
              <div>
                <h4>Controlo de Qualidade Têxtil — Paula Carvalho</h4>
                <p>
                  <a href="tel:+351919323897">919 323 897</a>
                  <br />
                  <a href="mailto:paula@summaverus.com">paula@summaverus.com</a>
                </p>
              </div>
            </div>
            <a href="https://summa-verus-portal-dev.vercel.app" target="_blank" rel="noopener" className="btn btn-outline-navy">
              Aceder ao Portal de Clientes
            </a>
          </Reveal>

          <Reveal as="div" delay={120} className="contactos__map">
            <iframe
              title="Localização Summa Verus"
              src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
