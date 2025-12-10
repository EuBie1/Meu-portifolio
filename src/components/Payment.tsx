import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Payment: React.FC = () => {
  const { cart, getTotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const navigate = useNavigate()
  const deliveryFee = 5.00
  const total = getTotal() + deliveryFee

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`
  }

  const handleFinalizeOrder = () => {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio!')
      return
    }
    // Aqui você pode adicionar a lógica de finalização do pedido
    alert('Pedido finalizado com sucesso!')
    clearCart()
    navigate('/')
  }

  if (cart.length === 0) {
    return (
      <>
        <Header onSearch={() => {}} />
        <section className="payment" id="payment">
          <div className="empty-cart">
            <h2 className="title">Seu carrinho está <span>vazio</span></h2>
            <p>Adicione itens ao carrinho para continuar com o pagamento.</p>
            <button className="btn" onClick={() => navigate('/')}>
              Voltar ao Menu
            </button>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header onSearch={() => {}} />
      <section className="payment" id="payment">
        <h2 className="title">Finalizar <span>Pagamento</span></h2>
        <div className="payment-container">
          <div className="payment-form">
            <div className="form-section">
              <h3>Dados Pessoais</h3>
              <div className="input-group">
                <input type="text" placeholder="Nome completo" required />
                <input type="email" placeholder="E-mail" required />
              </div>
              <div className="input-group">
                <input type="tel" placeholder="Telefone" required />
                <input type="text" placeholder="CPF" required />
              </div>
            </div>

            <div className="form-section">
              <h3>Endereço de Entrega</h3>
              <input type="text" placeholder="CEP" required />
              <div className="input-group">
                <input type="text" placeholder="Rua" required />
                <input type="text" placeholder="Número" required />
              </div>
              <div className="input-group">
                <input type="text" placeholder="Bairro" required />
                <input type="text" placeholder="Cidade" required />
              </div>
              <input type="text" placeholder="Complemento (opcional)" />
            </div>

            <div className="form-section">
              <h3>Método de Pagamento</h3>
              <div className="payment-methods">
                <div 
                  className={`payment-option ${paymentMethod === 'credit' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('credit')}
                >
                  <img 
                    width={30} 
                    height={30} 
                    src="https://img.icons8.com/ios-filled/30/ffffff/credit-card.png" 
                    alt="cartão" 
                  />
                  <span>Cartão de Crédito</span>
                </div>
                <div 
                  className={`payment-option ${paymentMethod === 'debit' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('debit')}
                >
                  <img 
                    width={30} 
                    height={30} 
                    src="https://img.icons8.com/ios-filled/30/ffffff/bank-card-back-side.png" 
                    alt="débito" 
                  />
                  <span>Cartão de Débito</span>
                </div>
                <div 
                  className={`payment-option ${paymentMethod === 'pix' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('pix')}
                >
                  <img 
                    width={30} 
                    height={30} 
                    src="https://img.icons8.com/ios-filled/30/ffffff/qr-code.png" 
                    alt="pix" 
                  />
                  <span>PIX</span>
                </div>
              </div>

              {paymentMethod === 'credit' || paymentMethod === 'debit' ? (
                <div className="card-details">
                  <input type="text" placeholder="Número do cartão" maxLength={19} required />
                  <div className="input-group">
                    <input type="text" placeholder="Nome no cartão" required />
                    <input type="text" placeholder="CVV" maxLength={3} required />
                  </div>
                  <div className="input-group">
                    <input type="text" placeholder="Mês" maxLength={2} required />
                    <input type="text" placeholder="Ano" maxLength={4} required />
                  </div>
                </div>
              ) : (
                <div className="pix-info">
                  <p>Você receberá o QR Code para pagamento após finalizar o pedido.</p>
                </div>
              )}
            </div>
          </div>

          <div className="order-summary">
            <h3>Resumo do Pedido</h3>
            <div className="summary-items">
              {cart.map((item) => (
                <div className="summary-item" key={item.id}>
                  <div className="item-info">
                    <span>{item.name} x{item.quantity}</span>
                    <div className="item-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="qty">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="summary-item">
                <span>Taxa de entrega</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button className="btn btn-payment" onClick={handleFinalizeOrder}>
              Finalizar Pedido
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Payment

