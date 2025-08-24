import HeroSection from '@/components/HeroSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import FeaturedCollections from '@/components/FeaturedCollections'
import CustomerReviews from '@/components/CustomerReviews'
import { getFeaturedProducts, getFeaturedCollections, getReviews } from '@/lib/cosmic'

export default async function HomePage() {
  try {
    const [featuredProducts, featuredCollections, reviews] = await Promise.all([
      getFeaturedProducts(),
      getFeaturedCollections(), 
      getReviews()
    ])

    return (
      <div className="space-y-16">
        <HeroSection />
        
        {featuredProducts.length > 0 && (
          <FeaturedProducts products={featuredProducts} />
        )}
        
        {featuredCollections.length > 0 && (
          <FeaturedCollections collections={featuredCollections} />
        )}
        
        {reviews.length > 0 && (
          <CustomerReviews reviews={reviews.slice(0, 6)} />
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading homepage data:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Luxe Fashion Boutique</h1>
          <p className="text-muted-foreground">Loading content...</p>
        </div>
      </div>
    )
  }
}