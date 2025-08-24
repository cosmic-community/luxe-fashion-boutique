"use client"

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
  const designerBrand = product.metadata?.designer_brand
  const category = product.metadata?.category
  const sizesAvailable = product.metadata?.sizes_available || []
  const materials = product.metadata?.materials
  const careInstructions = product.metadata?.care_instructions
  const inStock = product.metadata?.in_stock ?? true

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            {images.length > 0 ? (
              <img
                src={`${images[selectedImage]?.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
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
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded border-2 transition-colors ${
                    selectedImage === index 
                      ? 'border-black' 
                      : 'border-gray-200 hover:border-gray-300'
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

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand and Category */}
          <div className="space-y-1">
            {designerBrand && (
              <p className="text-sm text-muted-foreground font-medium">
                {designerBrand}
              </p>
            )}
            {category && (
              <p className="text-sm text-muted-foreground">
                {category.value}
              </p>
            )}
          </div>

          {/* Product Name */}
          <h1 className="text-3xl font-bold">{productName}</h1>

          {/* Price */}
          {price && (
            <p className="text-2xl font-semibold">
              ${price.toLocaleString()}
            </p>
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
              <div className="flex flex-wrap gap-2">
                {sizesAvailable.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded transition-colors ${
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

          {/* Add to Cart */}
          <div className="space-y-4">
            <button
              disabled={!inStock || (sizesAvailable.length > 0 && !selectedSize)}
              className="w-full bg-black text-white py-3 px-6 rounded font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {!inStock 
                ? 'Out of Stock' 
                : sizesAvailable.length > 0 && !selectedSize 
                  ? 'Select a Size' 
                  : 'Add to Cart'
              }
            </button>
            
            <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded font-medium hover:border-gray-400 transition-colors">
              Add to Wishlist
            </button>
          </div>

          {/* Product Details */}
          <div className="space-y-4 border-t pt-6">
            {materials && (
              <div>
                <h4 className="font-medium mb-2">Materials</h4>
                <p className="text-muted-foreground text-sm">{materials}</p>
              </div>
            )}
            
            {careInstructions && (
              <div>
                <h4 className="font-medium mb-2">Care Instructions</h4>
                <p className="text-muted-foreground text-sm">{careInstructions}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}