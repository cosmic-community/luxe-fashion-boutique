import Link from 'next/link'
import { Collection } from '@/types'

interface CollectionCardProps {
  collection: Collection
  className?: string
}

export default function CollectionCard({ collection, className = '' }: CollectionCardProps) {
  const collectionName = collection.metadata?.collection_name || collection.title
  const description = collection.metadata?.description
  const seasonYear = collection.metadata?.season_year
  const collectionImage = collection.metadata?.collection_image
  const productCount = collection.metadata?.products?.length || 0

  // Clean HTML from description for display
  const cleanDescription = description 
    ? description.replace(/<[^>]*>/g, '').slice(0, 120) + '...'
    : 'Explore this curated collection of luxury fashion pieces'

  return (
    <div className={`group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow ${className}`}>
      <Link href={`/collections/${collection.slug}`}>
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
          {collectionImage ? (
            <img 
              src={`${collectionImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={collectionName}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-2xl font-bold mb-2">{collectionName}</h3>
            {seasonYear && (
              <p className="text-sm opacity-90">{seasonYear}</p>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {cleanDescription}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {productCount} {productCount === 1 ? 'item' : 'items'}
            </span>
            
            <span className="text-primary font-medium group-hover:text-primary/80 transition-colors">
              Explore Collection →
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}