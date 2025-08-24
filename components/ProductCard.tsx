import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const productName = product.metadata?.product_name || product.title
  const price = product.metadata?.price
  const brand = product.metadata?.designer_brand
  const category = product.metadata?.category?.value
  const mainImage = product.metadata?.product_images?.[0]
  const isInStock = product.metadata?.in_stock

  return (
    <div className={`group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          {mainImage ? (
            <img 
              src={`${mainImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={productName}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          
          {!isInStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          {brand && (
            <p className="text-sm text-muted-foreground mb-1">{brand}</p>
          )}
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {productName}
          </h3>
          
          <div className="flex items-center justify-between">
            {price && (
              <span className="text-2xl font-bold">${price}</span>
            )}
            
            {category && (
              <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                {category}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}