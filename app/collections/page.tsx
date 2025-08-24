import { getCollections } from '@/lib/cosmic'
import CollectionGrid from '@/components/CollectionGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections - Luxe Fashion Boutique',
  description: 'Explore our curated fashion collections featuring the finest luxury pieces for every occasion.',
}

export default async function CollectionsPage() {
  try {
    const collections = await getCollections()

    if (collections.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Collections</h1>
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No collections available at the moment.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Our Collections</h1>
          <p className="text-muted-foreground">Curated fashion collections for every occasion</p>
        </div>
        
        <CollectionGrid collections={collections} />
      </div>
    )
  } catch (error) {
    console.error('Error loading collections:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Collections</h1>
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">Failed to load collections. Please try again later.</p>
        </div>
      </div>
    )
  }
}