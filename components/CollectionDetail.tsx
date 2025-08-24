import { Collection } from '@/types'
import ProductGrid from './ProductGrid'

interface CollectionDetailProps {
  collection: Collection
}

export default function CollectionDetail({ collection }: CollectionDetailProps) {
  const collectionName = collection.metadata?.collection_name || collection.title
  const description = collection.metadata?.description
  const seasonYear = collection.metadata?.season_year
  const collectionImage = collection.metadata?.collection_image
  const products = collection.metadata?.products || []

  return (
    <div className="space-y-8">
      {/* Collection Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">{collectionName}</h1>
          
          {seasonYear && (
            <p className="text-xl text-muted-foreground mb-4">{seasonYear}</p>
          )}
          
          {description && (
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
        
        {collectionImage && (
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <img 
              src={`${collectionImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={collectionName}
              width={600}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Collection Products */}
      {products.length > 0 && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Products in this Collection</h2>
            <p className="text-muted-foreground">
              {products.length} {products.length === 1 ? 'item' : 'items'} in this collection
            </p>
          </div>
          
          <ProductGrid products={products} />
        </div>
      )}
    </div>
  )
}