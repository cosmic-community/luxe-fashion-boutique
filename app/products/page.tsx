import { getProducts } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import CategoryFilter from '@/components/CategoryFilter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products - Luxe Fashion Boutique',
  description: 'Browse our complete collection of luxury fashion items including designer dresses, handbags, shoes, and accessories.',
}

export default async function ProductsPage() {
  try {
    const products = await getProducts()

    if (products.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Products</h1>
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products available at the moment.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">Discover our complete collection of luxury fashion items</p>
        </div>
        
        <div className="mb-8">
          <CategoryFilter products={products} />
        </div>
        
        <ProductGrid products={products} />
      </div>
    )
  } catch (error) {
    console.error('Error loading products:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">Failed to load products. Please try again later.</p>
        </div>
      </div>
    )
  }
}