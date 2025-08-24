'use client'

import { useState } from 'react'
import { Product } from '@/types'

interface CategoryFilterProps {
  products: Product[]
  onFilter?: (filteredProducts: Product[]) => void
}

export default function CategoryFilter({ products, onFilter }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Extract unique categories from products
  const categories = products.reduce((acc, product) => {
    const category = product.metadata?.category
    if (category && !acc.some(cat => cat.key === category.key)) {
      acc.push(category)
    }
    return acc
  }, [] as Array<{ key: string; value: string }>)

  const handleCategoryChange = (categoryKey: string) => {
    setSelectedCategory(categoryKey)
    
    const filteredProducts = categoryKey === 'all' 
      ? products 
      : products.filter(product => product.metadata?.category?.key === categoryKey)
    
    onFilter?.(filteredProducts)
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === 'all'
            ? 'bg-primary text-primary-foreground'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Products
      </button>
      
      {categories.map((category) => (
        <button
          key={category.key}
          onClick={() => handleCategoryChange(category.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category.key
              ? 'bg-primary text-primary-foreground'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.value}
        </button>
      ))}
    </div>
  )
}