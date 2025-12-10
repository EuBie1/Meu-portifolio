import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import SearchBar from './SearchBar'
import logo from '../assets/logo.png'

interface HeaderProps {
  onSearch?: (query: string) => void
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const location = useLocation()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    // Adiciona ou remove classe no body quando pesquisa abre/fecha
    if (isSearchOpen) {
      document.body.classList.add('search-open')
    } else {
      document.body.classList.remove('search-open')
    }
    
    // Cleanup ao desmontar
    return () => {
      document.body.classList.remove('search-open')
    }
  }, [isSearchOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (location.pathname !== '/') {
      e.preventDefault()
      window.location.href = `/#${hash}`
    }
  }

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <>
      <header className="header">
        <section>
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
          </Link>
          <nav className="navbar">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>Sobre</a>
            <a href="#menu" onClick={(e) => handleNavClick(e, 'menu')}>Menu</a>
            <a href="#review" onClick={(e) => handleNavClick(e, 'review')}>Avaliações</a>
            <a href="#address" onClick={(e) => handleNavClick(e, 'address')}>Endereço</a>
          </nav>
          <div className="icons">
            <button 
              className="search-icon-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Pesquisar"
            >
              <img
                width={30}
                height={30}
                src="https://img.icons8.com/ios-filled/30/ffffff/search--v2.png"
                alt="search"
              />
            </button>
            <Link to="/payment" className="cart-icon">
              <img
                width={30}
                height={30}
                src="https://img.icons8.com/ios-glyphs/30/ffffff/shopping-cart--v1.png"
                alt="cart"
              />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          </div>
        </section>
        <SearchBar 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)}
          onSearch={handleSearch}
        />
      </header>
    </>
  )
}

export default Header
