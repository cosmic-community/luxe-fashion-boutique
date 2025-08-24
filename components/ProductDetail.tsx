import { Product } from '@/types'
import { useState } from 'react'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Safely extract product data with null checks
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

  // Get the main product image with null safety
  const mainImage = productImages.length > 0 ? productImages[selectedImageIndex] : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {mainImage?.imgix_url ? (
            <img
              src={`${mainImage.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={productName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>

        {/* Thumbnail Images */}
        {productImages.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                  selectedImageIndex === index ? 'border-black' : 'border-transparent'
                }`}
              >
                <img
                  src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                  alt={`${productName} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        {/* Brand */}
        {designerBrand && (
          <div className="text-sm text-muted-foreground uppercase tracking-wide">
            {designerBrand}
          </div>
        )}

        {/* Product Name */}
        <h1 className="text-3xl font-bold">{productName}</h1>

        {/* Price */}
        {price && (
          <div className="text-2xl font-semibold">
            ${price.toLocaleString()}
          </div>
        )}

        {/* Category */}
        {category?.value && (
          <div className="text-sm text-muted-foreground">
            Category: {category.value}
          </div>
        )}

        {/* Description */}
        {description && (
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* Size Selection */}
        {sizesAvailable.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium">Size</h3>
            <div className="flex gap-2">
              {sizesAvailable.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          className={`w-full py-3 px-6 rounded-lg font-medium ${
            inStock
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!inStock || (sizesAvailable.length > 0 && !selectedSize)}
        >
          {!inStock ? 'Out of Stock' : 'Add to Cart'}
        </button>

        {/* Stock Status */}
        <div className={`text-sm ${inStock ? 'text-green-600' : 'text-red-600'}`}>
          {inStock ? '✓ In Stock' : '✗ Out of Stock'}
        </div>

        {/* Materials */}
        {materials && (
          <div className="space-y-2">
            <h3 className="font-medium">Materials</h3>
            <p className="text-muted-foreground">{materials}</p>
          </div>
        )}

        {/* Care Instructions */}
        {careInstructions && (
          <div className="space-y-2">
            <h3 className="font-medium">Care Instructions</h3>
            <p className="text-muted-foreground">{careInstructions}</p>
          </div>
        )}
      </div>
    </div>
  )
}