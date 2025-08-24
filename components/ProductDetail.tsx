import { Product } from '@/types'
import { useState } from 'react'
import Link from 'next/link'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>('')

  // Safely access product metadata with proper null checks
  const productName = product.metadata?.product_name || product.title
  const description = product.metadata?.description
  const price = product.metadata?.price
  const productImages = product.metadata?.product_images || []
  const designerBrand = product.metadata?.designer_brand
  const category = product.metadata?.category
  const sizesAvailable = product.metadata?.sizes_available || []
  const materials = product.metadata?.materials
  const careInstructions = product.metadata?.care_instructions
  const inStock = product.metadata?.in_stock ?? true

  // Get the main image URL with proper fallback and optimization
  const mainImage = productImages.length > 0 
    ? `${productImages[selectedImageIndex]?.imgix_url || productImages[0]?.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`
    : '/placeholder-image.jpg'

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Added to cart:', {
      productId: product.id,
      size: selectedSize,
      quantity: 1
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img
            src={mainImage}
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Thumbnail Images */}
        {productImages.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImageIndex === index
                    ? 'border-primary'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                  alt={`${productName} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        {/* Category and Brand */}
        <div className="space-y-2">
          {category && (
            <Link
              href={`/products?category=${category.key}`}
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              {category.value}
            </Link>
          )}
          {designerBrand && (
            <p className="text-sm text-muted-foreground">{designerBrand}</p>
          )}
        </div>

        {/* Product Name */}
        <h1 className="text-3xl font-bold">{productName}</h1>

        {/* Price */}
        {typeof price === 'number' && (
          <p className="text-2xl font-bold">${price.toLocaleString()}</p>
        )}

        {/* Description */}
        {description && (
          <div
            className="text-muted-foreground prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* Size Selection */}
        {sizesAvailable.length > 0 && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Size</label>
            <div className="flex flex-wrap gap-2">
              {sizesAvailable.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="space-y-4">
          <button
            onClick={handleAddToCart}
            disabled={!inStock || (sizesAvailable.length > 0 && !selectedSize)}
            className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors ${
              inStock && (sizesAvailable.length === 0 || selectedSize)
                ? 'bg-primary hover:bg-primary/90'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {!inStock 
              ? 'Out of Stock' 
              : sizesAvailable.length > 0 && !selectedSize
                ? 'Select a Size'
                : 'Add to Cart'
            }
          </button>
          
          {!inStock && (
            <p className="text-sm text-red-600">This item is currently out of stock</p>
          )}
        </div>

        {/* Product Details */}
        <div className="border-t pt-6 space-y-4">
          {materials && (
            <div>
              <h3 className="font-medium mb-2">Materials</h3>
              <p className="text-sm text-muted-foreground">{materials}</p>
            </div>
          )}
          
          {careInstructions && (
            <div>
              <h3 className="font-medium mb-2">Care Instructions</h3>
              <p className="text-sm text-muted-foreground">{careInstructions}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}