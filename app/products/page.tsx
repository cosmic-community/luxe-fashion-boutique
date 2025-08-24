import { getProducts, getProductsByCategory } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import CategoryFilter from '@/components/CategoryFilter'
import { Product } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products - Luxe Fashion Boutique',
  description: 'Discover our curated collection of luxury fashion items including dresses, accessories, and more from top designer brands.',
  openGraph: {
    title: 'Products - Luxe Fashion Boutique',
    description: 'Shop luxury fashion items from top designer brands',
    type: 'website'
  }
}

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams
  
  try {
    let products: Product[] = []
    
    if (category) {
      products = await getProductsByCategory(category)
    } else {
      products = await getProducts()
    }

    // Get unique categories for the filter, handling undefined values properly
    const categories: string[] = products
      .map(product => product.metadata?.category?.key)
      .filter((cat): cat is string => cat !== undefined && cat !== '') // Type guard to filter out undefined/empty values
      .filter((cat, index, arr) => arr.indexOf(cat) === index) // Remove duplicates
      .sort()

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Products</h1>
          <p className="text-muted-foreground">
            Discover our curated collection of luxury fashion
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter 
            categories={categories}
            selectedCategory={category}
          />
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">No products found</h2>
            <p className="text-muted-foreground">
              {category 
                ? `No products found in the "${category}" category.`
                : 'No products are currently available.'
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