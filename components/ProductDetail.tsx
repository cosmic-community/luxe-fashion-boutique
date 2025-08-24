'use client'

import { Product } from '@/types'
import { useState } from 'react'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>('')

  const productName = product.metadata?.product_name || product.title
  const description = product.metadata?.description
  const price = product.metadata?.price
  const images = product.metadata?.product_images || []
  const brand = product.metadata?.designer_brand
  const category = product.metadata?.category
  const sizesAvailable = product.metadata?.sizes_available || []
  const materials = product.metadata?.materials
  const careInstructions = product.metadata?.care_instructions
  const inStock = product.metadata?.in_stock

  const handleAddToCart = () => {
    // Add to cart functionality would go here
    console.log('Add to cart:', {
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
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {images.length > 0 ? (
            <img
              src={`${images[selectedImage].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={productName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>

        {/* Image Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-black' : 'border-transparent'
                }`}
              >
                <img
                  src={`${image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
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
        {/* Brand */}
        {brand && (
          <div className="text-sm text-muted-foreground uppercase tracking-wide">
            {brand}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold">{productName}</h1>

        {/* Price */}
        {price && (
          <div className="text-2xl font-semibold">
            ${price.toLocaleString()}
          </div>
        )}

        {/* Category */}
        {category && (
          <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
            {category.value}
          </div>
        )}

        {/* Description */}
        {description && (
          <div 
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* Size Selection */}
        {sizesAvailable.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium">Size</h3>
            <div className="flex gap-2 flex-wrap">
              {sizesAvailable.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md transition-colors ${
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

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm">
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock || (sizesAvailable.length > 0 && !selectedSize)}
          className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {!inStock 
            ? 'Out of Stock' 
            : sizesAvailable.length > 0 && !selectedSize 
              ? 'Select Size' 
              : 'Add to Cart'
          }
        </button>

        {/* Materials */}
        {materials && (
          <div className="space-y-2">
            <h3 className="font-medium">Materials</h3>
            <p className="text-sm text-muted-foreground">{materials}</p>
          </div>
        )}

        {/* Care Instructions */}
        {careInstructions && (
          <div className="space-y-2">
            <h3 className="font-medium">Care Instructions</h3>
            <p className="text-sm text-muted-foreground">{careInstructions}</p>
          </div>
        )}
      </div>
    </div>
  )
}