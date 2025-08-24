'use client'

interface CategoryFilterProps {
  categories: Array<{ key: string; value: string }>
  activeCategory?: string
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  if (categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {/* All Products Link */}
      <a
        href="/products"
        className={`px-4 py-2 rounded-full border transition-colors ${
          !activeCategory
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-white text-muted-foreground border-gray-300 hover:border-primary hover:text-primary'
        }`}
      >
        All Products
      </a>
      
      {/* Category Links */}
      {categories.map((category) => (
        <a
          key={category.key}
          href={`/products?category=${category.key}`}
          className={`px-4 py-2 rounded-full border transition-colors ${
            activeCategory === category.key
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-white text-muted-foreground border-gray-300 hover:border-primary hover:text-primary'
          }`}
        >
          {category.value}
        </a>
      ))}
    </div>
  )
}