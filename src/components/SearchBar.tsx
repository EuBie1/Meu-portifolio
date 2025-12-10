import React, { useState, useRef, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  isOpen: boolean
  onClose: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    } else if (!isOpen) {
      setSearchQuery('')
      onSearch('')
    }
  }, [isOpen, onSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearch(e.target.value)
  }

  if (!isOpen) return null

  return (
    <div className="search-inline">
      <form onSubmit={handleSubmit} className="search-form-inline">
        <input
          ref={inputRef}
          type="text"
          placeholder="Pesquisar café..."
          value={searchQuery}
          onChange={handleChange}
          className="search-input-inline"
        />
        <button type="button" onClick={onClose} className="search-close-inline">
          ×
        </button>
      </form>
    </div>
  )
}

export default SearchBar

