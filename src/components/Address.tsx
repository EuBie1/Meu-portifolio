import React from 'react'

const Address: React.FC = () => {
  return (
    <section className="address" id="address">
      <h2 className="title">Nosso <span>Endereço</span></h2>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.2061175682898!2d-35.887111724071524!3d-7.217314292788505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ac1e4da6799efd%3A0xe4d064b002a4eafd!2sR.%20Maciel%20Pinheiro%2C%20305%20-%20Centro%2C%20Campina%20Grande%20-%20PB%2C%2058400-100!5e0!3m2!1spt-BR!2sbr!4v1755175856870!5m2!1spt-BR!2sbr"
          className="map-iframe"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização"
        ></iframe>
      </div>
    </section>
  )
}

export default Address
