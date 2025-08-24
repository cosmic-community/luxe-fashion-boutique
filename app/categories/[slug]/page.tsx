// app/categories/[slug]/page.tsx
import { getCategory, getProductsByCategory } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found - Luxe Fashion Boutique'
    }
  }

  const categoryName = category.metadata?.category_name || category.title
  const description = category.metadata?.description 
    ? category.metadata.description.slice(0, 160)
    : `Shop ${categoryName} at Luxe Fashion Boutique`

  return {
    title: `${categoryName} - Luxe Fashion Boutique`,
    description,
    openGraph: {
      title: categoryName,
      description,
      images: category.metadata?.category_image?.imgix_url ? [{
        url: `${category.metadata.category_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`,
        width: 800,
        height: 600,
        alt: categoryName
      }] : []
    }
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  
  try {
    const category = await getCategory(slug)
    
    if (!category) {
      notFound()
    }

    const products = await getProductsByCategory(category.id)
    const categoryName = category.metadata?.category_name || category.title

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-12">
          {category.metadata?.category_image && (
            <div className="mb-8 aspect-[3/1] lg:aspect-[4/1] overflow-hidden rounded-lg">
              <img
                src={`${category.metadata.category_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
                alt={categoryName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
            {category.metadata?.description && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {category.metadata.description}
              </p>
            )}
          </div>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold">
                Products ({products.length})
              </h2>
            </div>
            <ProductGrid products={products} />
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">No products found</h2>
            <p className="text-muted-foreground">
              No products are currently available in this category.
            </p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading category:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Category</h1>
          <p className="text-muted-foreground">Failed to load category. Please try again later.</p>
        </div>
      </div>
    )
  }
}