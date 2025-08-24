import { getCategories } from '@/lib/cosmic'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Categories - Luxe Fashion Boutique',
  description: 'Browse our fashion categories including dresses, bags, shoes, and accessories.',
}

export default async function CategoriesPage() {
  try {
    const categories = await getCategories()

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-muted-foreground">
            Explore our carefully curated categories of luxury fashion
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                  {/* Category Image */}
                  {category.metadata?.category_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={`${category.metadata.category_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                        alt={category.metadata?.category_name || category.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  {/* Category Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.metadata?.category_name || category.title}
                    </h3>
                    {category.metadata?.description && (
                      <p className="text-muted-foreground text-sm">
                        {category.metadata.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">No categories found</h2>
            <p className="text-muted-foreground">Categories are being set up.</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading categories:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Categories</h1>
          <p className="text-muted-foreground">Failed to load categories. Please try again later.</p>
        </div>
      </div>
    )
  }
}