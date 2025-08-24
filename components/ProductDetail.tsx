"use client"

import { Product } from '@/types'
import { useState } from 'react'
import Link from 'next/link'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>('')

  const productName = product.metadata?.product_name || product.title
  const description = product.metadata?.description
  const price = product.metadata?.price
  const images = product.metadata?.product_images || []
  const designerBrand = product.metadata?.designer_brand
  const category = product.metadata?.category
  const sizesAvailable = product.metadata?.sizes_available || []
  const materials = product.metadata?.materials
  const careInstructions = product.metadata?.care_instructions
  const inStock = product.metadata?.in_stock

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {images.length > 0 ? (
            <img
              src={`${images[selectedImageIndex].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
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
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(index)}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === selectedImageIndex
                    ? 'border-black'
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
        {/* Brand and Category */}
        <div className="space-y-2">
          {designerBrand && (
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {designerBrand}
            </p>
          )}
          {category && (
            <Link
              href={`/products?category=${category.key}`}
              className="text-sm text-primary hover:text-primary/80"
            >
              {category.value}
            </Link>
          )}
        </div>

        {/* Product Name */}
        <h1 className="text-3xl font-bold">{productName}</h1>

        {/* Price */}
        {price && (
          <p className="text-2xl font-semibold">
            {formatPrice(price)}
          </p>
        )}

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className={`text-sm font-medium ${inStock ? 'text-green-700' : 'text-red-700'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Size Selection */}
        {sizesAvailable.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizesAvailable.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-4 py-2 border rounded-md font-medium transition-colors ${
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
          disabled={!inStock || (sizesAvailable.length > 0 && !selectedSize)}
          className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {!inStock ? 'Out of Stock' : 'Add to Cart'}
        </button>

        {/* Description */}
        {description && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Description</h3>
            <div 
              className="text-gray-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        )}

        {/* Materials */}
        {materials && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Materials</h3>
            <p className="text-gray-700">{materials}</p>
          </div>
        )}

        {/* Care Instructions */}
        {careInstructions && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Care Instructions</h3>
            <p className="text-gray-700">{careInstructions}</p>
          </div>
        )}
      </div>
    </div>
  )
}