import { Collection } from '@/types'
import CollectionCard from './CollectionCard'
import Link from 'next/link'

interface FeaturedCollectionsProps {
  collections: Collection[]
}

export default function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  if (collections.length === 0) {
    return null
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Collections</h2>
            <p className="text-muted-foreground">Curated collections for every style and occasion</p>
          </div>
          <Link 
            href="/collections" 
            className="text-primary hover:text-primary/80 font-medium"
          >
            View All Collections →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  )
}