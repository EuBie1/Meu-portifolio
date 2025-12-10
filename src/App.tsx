import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import HomePage from './pages/HomePage'
import Payment from './components/Payment'

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
