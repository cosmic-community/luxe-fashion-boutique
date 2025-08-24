import { getProducts, getCategories } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import CategoryFilter from '@/components/CategoryFilter'
import { Metadata } from 'next'

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export const metadata: Metadata = {
  title: 'Products - Luxe Fashion Boutique',
  description: 'Browse our collection of luxury fashion products including dresses, bags, shoes, and accessories.',
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams
  const categoryFilter = resolvedSearchParams.category

  try {
    const [allProducts, categories] = await Promise.all([
      getProducts(),
      getCategories()
    ])

    // Filter products by category if specified
    let filteredProducts = allProducts
    if (categoryFilter) {
      filteredProducts = allProducts.filter(product => 
        product.metadata?.category?.slug === categoryFilter
      )
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-muted-foreground">
            Discover our curated collection of luxury fashion
          </p>
        </div>

        <CategoryFilter categories={categories} />

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">No products found</h2>
            <p className="text-muted-foreground">
              {categoryFilter 
                ? `No products available in this category.`
                : `No products available at the moment.`
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