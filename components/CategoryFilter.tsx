'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
}

export default function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === 'all') {
        params.delete(name)
      } else {
        params.set(name, value)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleCategoryChange = (category: string) => {
    const queryString = createQueryString('category', category)
    router.push(`/products${queryString ? `?${queryString}` : ''}`)
  }

  // Capitalize category names for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => handleCategoryChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === 'all'
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Categories
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {formatCategoryName(category)}
        </button>
      ))}
    </div>
  )
}