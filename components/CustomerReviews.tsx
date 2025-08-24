import { Review } from '@/types'
import ReviewCard from './ReviewCard'

interface CustomerReviewsProps {
  reviews: Review[]
}

export default function CustomerReviews({ reviews }: CustomerReviewsProps) {
  if (reviews.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
        <p className="text-muted-foreground">Real reviews from verified customers</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}