import { getProducts } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import CategoryFilter from '@/components/CategoryFilter'
import { Product } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products - Luxe Fashion Boutique',
  description: 'Discover our curated collection of luxury fashion items including dresses, shoes, bags, and accessories from top designers.',
}

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; search?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const { category, search } = params
  
  try {
    const allProducts = await getProducts()
    
    // Filter products based on category and search
    let filteredProducts = allProducts
    
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => {
        const productCategory = product.metadata?.category
        if (!productCategory) return false
        
        // Match against both key and value for flexibility
        return productCategory.key === category || 
               productCategory.value.toLowerCase() === category.toLowerCase()
      })
    }
    
    if (search) {
      const searchTerm = search.toLowerCase()
      filteredProducts = filteredProducts.filter(product => {
        const productName = product.metadata?.product_name || product.title
        const description = product.metadata?.description || ''
        const brand = product.metadata?.designer_brand || ''
        
        return productName.toLowerCase().includes(searchTerm) ||
               description.toLowerCase().includes(searchTerm) ||
               brand.toLowerCase().includes(searchTerm)
      })
    }
    
    // Get unique categories from all products for the filter
    const categories = Array.from(
      new Set(
        allProducts
          .map(product => product.metadata?.category)
          .filter(Boolean)
          .map(category => category?.key)
          .filter(Boolean)
      )
    )

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our curated collection of luxury fashion items crafted by the world's finest designers.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter 
            categories={categories}
            selectedCategory={category || 'all'}
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">No products found</h2>
            <p className="text-muted-foreground mb-6">
              {category && category !== 'all' ? 
                `No products found in the "${category}" category.` : 
                search ? 
                  `No products found matching "${search}".` : 
                  'No products available at the moment.'
              }
            </p>
            <a 
              href="/products" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
            >
              View All Products
            </a>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {category && category !== 'all' && ` in "${category}"`}
                {search && ` matching "${search}"`}
              </p>
            </div>
            
            <ProductGrid products={filteredProducts} />
          </>
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