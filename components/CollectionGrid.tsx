import { Collection } from '@/types'
import CollectionCard from './CollectionCard'

interface CollectionGridProps {
  collections: Collection[]
  className?: string
}

export default function CollectionGrid({ collections, className = '' }: CollectionGridProps) {
  if (collections.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No collections found.</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  )
}