import { getProducts, getCategories } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import CategoryFilter from '@/components/CategoryFilter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products - Luxe Fashion Boutique',
  description: 'Discover our collection of luxury fashion pieces including dresses, bags, shoes, and accessories.',
}

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  try {
    const params = await searchParams
    const categorySlug = typeof params.category === 'string' ? params.category : undefined

    const [allProducts, categories] = await Promise.all([
      getProducts(),
      getCategories()
    ])

    // Filter products by category if specified
    const filteredProducts = categorySlug 
      ? allProducts.filter(product => {
          // Check if product has a category and if its value matches the slug
          const productCategory = product.metadata?.category
          if (!productCategory || typeof productCategory !== 'object' || !('value' in productCategory)) {
            return false
          }
          // Find the matching category by comparing the category value with category names
          const matchingCategory = categories.find(cat => 
            cat.slug === categorySlug && 
            (cat.metadata?.category_name === productCategory.value || cat.title === productCategory.value)
          )
          return !!matchingCategory
        })
      : allProducts

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-muted-foreground">
            Discover our carefully curated collection of luxury fashion pieces
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <CategoryFilter categories={categories} />
        )}

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold">
                {categorySlug 
                  ? `${categories.find(c => c.slug === categorySlug)?.metadata?.category_name || 'Category'} Products`
                  : 'All Products'
                } ({filteredProducts.length})
              </h2>
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">No products found</h2>
            <p className="text-muted-foreground">
              {categorySlug 
                ? 'No products are currently available in this category.'
                : 'No products are currently available.'
              }
            </p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading products:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Error Loading Products</h1>
          <p className="text-muted-foreground">Failed to load products. Please try again later.</p>
        </div>
      </div>
    )
  }
}