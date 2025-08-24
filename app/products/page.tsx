import { Suspense } from 'react'
import { getProducts, getProductsByCategory } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import CategoryFilter from '@/components/CategoryFilter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products - Luxe Fashion Boutique',
  description: 'Discover our collection of luxury fashion pieces, from elegant dresses to sophisticated accessories.',
}

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

// Get unique categories from all products
async function getCategories() {
  const products = await getProducts()
  const categories = products
    .map(product => product.metadata?.category)
    .filter((category): category is NonNullable<typeof category> => 
      category !== undefined && category !== null && category.key !== ''
    )
    .reduce((acc, category) => {
      if (!acc.some(cat => cat.key === category.key)) {
        acc.push(category)
      }
      return acc
    }, [] as Array<{ key: string; value: string }>)
  
  return categories
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams
  
  try {
    // Fetch products based on category filter
    const products = category 
      ? await getProductsByCategory(category)
      : await getProducts()
    
    // Get available categories for filter
    const categories = await getCategories()

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {category 
              ? `${categories.find(cat => cat.key === category)?.value || category} Collection`
              : 'All Products'
            }
          </h1>
          <p className="text-muted-foreground">
            {category 
              ? `Discover our curated selection of ${categories.find(cat => cat.key === category)?.value?.toLowerCase() || category}`
              : 'Discover our complete collection of luxury fashion pieces'
            }
          </p>
        </div>

        <Suspense fallback={
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        }>
          <CategoryFilter 
            categories={categories}
            activeCategory={category}
          />
          
          <div className="mt-8">
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold mb-4">No products found</h2>
                <p className="text-muted-foreground mb-6">
                  {category 
                    ? `No products available in the ${categories.find(cat => cat.key === category)?.value || category} category.`
                    : 'No products are currently available.'
                  }
                </p>
                {category && (
                  <a 
                    href="/products"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    View All Products
                  </a>
                )}
              </div>
            )}
          </div>
        </Suspense>
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