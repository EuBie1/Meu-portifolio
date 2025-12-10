import React, { useState } from 'react'
import Header from '../components/Header'
import Home from '../components/Home'
import About from '../components/About'
import Menu from '../components/Menu'
import Review from '../components/Review'
import Address from '../components/Address'
import Footer from '../components/Footer'

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Scroll para o menu quando pesquisar
    if (query) {
      const menuSection = document.getElementById('menu')
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      <Home />
      <About />
      <Menu searchQuery={searchQuery} />
      <Review />
      <Address />
      <Footer />
    </>
  )
}

export default HomePage

