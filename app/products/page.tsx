import { getProducts } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import CategoryFilter from '@/components/CategoryFilter'
import { Product } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products - Luxe Fashion Boutique',
  description: 'Browse our complete collection of luxury fashion items including dresses, accessories, and more.',
}

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams
  
  try {
    const products = await getProducts()
    
    // Filter products by category if specified
    const filteredProducts = category 
      ? products.filter(product => 
          product.metadata?.category?.key === category
        )
      : products

    // Get unique categories for filter - FIX THE TYPESCRIPT ERROR HERE
    const categories: string[] = products
      .map(product => product.metadata?.category?.key)
      .filter((category): category is string => category !== undefined && category !== '') // Type guard to filter out undefined values
      .filter((category, index, array) => array.indexOf(category) === index) // Remove duplicates

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">All Products</h1>
          <p className="text-muted-foreground">
            Discover our complete collection of luxury fashion pieces
          </p>
        </div>

        {categories.length > 0 && (
          <div className="mb-8">
            <CategoryFilter 
              categories={categories}
              selectedCategory={category}
            />
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold mb-2">
              {category ? 'No products found in this category' : 'No products available'}
            </h2>
            <p className="text-muted-foreground">
              {category 
                ? 'Try selecting a different category or browse all products.' 
                : 'Please check back later for new arrivals.'
              }
            </p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading products:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Products</h1>
          <p className="text-muted-foreground">Failed to load products. Please try again later.</p>
        </div>
      </div>
    )
  }
}