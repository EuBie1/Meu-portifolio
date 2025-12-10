import React, { useMemo } from 'react'
import { useCart } from '../contexts/CartContext'
import menu1 from '../assets/menu-1.png'
import menu2 from '../assets/menu-2.png'
import menu3 from '../assets/menu-3.png'
import menu4 from '../assets/menu-4.png'
import menu5 from '../assets/menu-5.png'
import menu6 from '../assets/menu-6.png'

interface MenuProps {
  searchQuery?: string
}

const menuItems = [
  { id: 1, img: menu1, name: 'Café coado Premium', price: 15.99, oldPrice: 'R$20,99' },
  { id: 2, img: menu2, name: 'Café coado Tradicional', price: 15.99, oldPrice: 'R$20,99' },
  { id: 3, img: menu3, name: 'Café Expresso', price: 13.99, oldPrice: 'R$18,99' },
  { id: 4, img: menu4, name: 'Café com Leite', price: 11.99, oldPrice: 'R$12,99' },
  { id: 5, img: menu5, name: 'Café Americano', price: 8.90, oldPrice: 'R$10,99' },
  { id: 6, img: menu6, name: 'Cappuccino', price: 11.20, oldPrice: 'R$15,99' },
]

const Menu: React.FC<MenuProps> = ({ searchQuery = '' }) => {
  const { addToCart } = useCart()

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return menuItems
    }
    const query = searchQuery.toLowerCase()
    return menuItems.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes('café') && query.includes('cafe')
    )
  }, [searchQuery])

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
    })
  }

  return (
    <section className="menu" id="menu">
      <h2 className="title">Nosso <span>menu</span></h2>
      {searchQuery && (
        <p className="search-results">
          {filteredItems.length > 0 
            ? `Encontrados ${filteredItems.length} item(ns) para "${searchQuery}"`
            : `Nenhum item encontrado para "${searchQuery}"`
          }
        </p>
      )}
      <div className="box-container">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div className="box" key={item.id}>
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <div className="price">R$ {item.price.toFixed(2).replace('.', ',')} <span>{item.oldPrice}</span></div>
              <button 
                className="btn" 
                onClick={() => handleAddToCart(item)}
              >
                Adicione ao carrinho
              </button>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>Nenhum produto encontrado. Tente pesquisar por "café", "expresso" ou "cappuccino".</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Menu
