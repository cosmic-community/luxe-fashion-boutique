// app/collections/[slug]/page.tsx
import { getCollection } from '@/lib/cosmic'
import CollectionDetail from '@/components/CollectionDetail'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollection(slug)
  
  if (!collection) {
    return {
      title: 'Collection Not Found - Luxe Fashion Boutique'
    }
  }

  const collectionName = collection.metadata?.collection_name || collection.title
  const description = collection.metadata?.description
    ? collection.metadata.description.replace(/<[^>]*>/g, '').slice(0, 160)
    : `Explore the ${collectionName} collection at Luxe Fashion Boutique`

  return {
    title: `${collectionName} - Luxe Fashion Boutique`,
    description,
    openGraph: {
      title: collectionName,
      description,
      images: collection.metadata?.collection_image?.imgix_url ? [{
        url: `${collection.metadata.collection_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`,
        width: 800,
        height: 600,
        alt: collectionName
      }] : []
    }
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  
  try {
    const collection = await getCollection(slug)
    
    if (!collection) {
      notFound()
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <CollectionDetail collection={collection} />
      </div>
    )
  } catch (error) {
    console.error('Error loading collection:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Collection</h1>
          <p className="text-muted-foreground">Failed to load collection details. Please try again later.</p>
        </div>
      </div>
    )
  }
}