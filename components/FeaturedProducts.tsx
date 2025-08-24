import { Product } from '@/types'
import ProductGrid from './ProductGrid'
import Link from 'next/link'

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <p className="text-muted-foreground">Handpicked luxury pieces for the discerning fashion enthusiast</p>
        </div>
        <Link 
          href="/products" 
          className="text-primary hover:text-primary/80 font-medium"
        >
          View All Products →
        </Link>
      </div>
      
      <ProductGrid products={products.slice(0, 8)} />
    </section>
  )
}