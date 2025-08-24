// app/products/[slug]/page.tsx
import { getProduct, getProductReviews } from '@/lib/cosmic'
import ProductDetail from '@/components/ProductDetail'
import ProductReviews from '@/components/ProductReviews'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    return {
      title: 'Product Not Found - Luxe Fashion Boutique'
    }
  }

  const productName = product.metadata?.product_name || product.title
  const description = product.metadata?.description
    ? product.metadata.description.replace(/<[^>]*>/g, '').slice(0, 160)
    : `Shop ${productName} at Luxe Fashion Boutique`

  return {
    title: `${productName} - Luxe Fashion Boutique`,
    description,
    openGraph: {
      title: productName,
      description,
      images: product.metadata?.product_images?.[0]?.imgix_url ? [{
        url: `${product.metadata.product_images[0].imgix_url}?w=800&h=600&fit=crop&auto=format,compress`,
        width: 800,
        height: 600,
        alt: productName
      }] : []
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  
  try {
    const product = await getProduct(slug)
    
    if (!product) {
      notFound()
    }

    const reviews = await getProductReviews(product.id)

    return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetail product={product} />
        
        {reviews.length > 0 && (
          <div className="mt-16">
            <ProductReviews reviews={reviews} />
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading product:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Product</h1>
          <p className="text-muted-foreground">Failed to load product details. Please try again later.</p>
        </div>
      </div>
    )
  }
}