import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const productName = product.metadata?.product_name || product.title
  const price = product.metadata?.price
  const category = product.metadata?.category
  const inStock = product.metadata?.in_stock
  const designerBrand = product.metadata?.designer_brand
  const firstImage = product.metadata?.product_images?.[0]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  // Get category display name - fix for TypeScript error
  const categoryName = category?.metadata?.category_name || category?.title

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 overflow-hidden">
          {firstImage ? (
            <img
              src={`${firstImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={productName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-2">
          {/* Designer Brand */}
          {designerBrand && (
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {designerBrand}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {productName}
          </h3>

          {/* Category */}
          {categoryName && (
            <p className="text-sm text-gray-600">
              {categoryName}
            </p>
          )}

          {/* Price and Stock */}
          <div className="flex items-center justify-between pt-2">
            {price && (
              <span className="text-lg font-bold">
                {formatPrice(price)}
              </span>
            )}
            
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-xs ${inStock ? 'text-green-700' : 'text-red-700'}`}>
                {inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}