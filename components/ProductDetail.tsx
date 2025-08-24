import { Product } from '@/types'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const productName = product.metadata?.product_name || product.title
  const description = product.metadata?.description
  const price = product.metadata?.price
  const brand = product.metadata?.designer_brand
  const category = product.metadata?.category?.value
  const sizes = product.metadata?.sizes_available || []
  const materials = product.metadata?.materials
  const careInstructions = product.metadata?.care_instructions
  const images = product.metadata?.product_images || []
  const isInStock = product.metadata?.in_stock

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        {images.length > 0 ? (
          <div className="grid gap-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={`${images[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={productName}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {images.slice(1, 4).map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                      alt={`${productName} - Image ${index + 2}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">No Images Available</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        {brand && (
          <p className="text-sm text-muted-foreground uppercase tracking-wide">{brand}</p>
        )}
        
        <h1 className="text-3xl font-bold">{productName}</h1>
        
        {price && (
          <p className="text-3xl font-bold text-primary">${price}</p>
        )}
        
        {!isInStock && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">Currently Out of Stock</p>
          </div>
        )}
        
        {description && (
          <div 
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        
        {sizes.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Available Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <span 
                  key={size}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {materials && (
          <div>
            <h3 className="font-semibold mb-2">Materials</h3>
            <p className="text-muted-foreground">{materials}</p>
          </div>
        )}
        
        {careInstructions && (
          <div>
            <h3 className="font-semibold mb-2">Care Instructions</h3>
            <p className="text-muted-foreground">{careInstructions}</p>
          </div>
        )}
        
        {category && (
          <div>
            <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-muted-foreground">
              {category}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}