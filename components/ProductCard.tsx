import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const productName = product.metadata?.product_name || product.title
  const price = product.metadata?.price
  const category = product.metadata?.category
  const designerBrand = product.metadata?.designer_brand
  const inStock = product.metadata?.in_stock ?? true
  const featuredProduct = product.metadata?.featured_product
  const productImage = product.metadata?.product_images?.[0]

  return (
    <div className={`group relative ${className}`}>
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-white">
          {/* Product Image */}
          <div className="aspect-square w-full">
            {productImage ? (
              <img
                src={`${productImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                alt={productName}
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                width={600}
                height={600}
              />
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>

          {/* Product Info Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="text-white">
              {/* Category Badge */}
              {category?.value && (
                <span className="inline-block bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs mb-2">
                  {category.value}
                </span>
              )}
              
              {/* Product Name */}
              <h3 className="font-semibold text-lg mb-1 line-clamp-2">{productName}</h3>
              
              {/* Designer Brand */}
              {designerBrand && (
                <p className="text-sm text-white/90 mb-2">{designerBrand}</p>
              )}
              
              {/* Price */}
              <div className="flex items-center justify-between">
                {price && (
                  <span className="text-xl font-bold">${price.toLocaleString()}</span>
                )}
                
                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  {featuredProduct && (
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                      Featured
                    </span>
                  )}
                  {!inStock && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}