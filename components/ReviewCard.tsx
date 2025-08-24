import Link from 'next/link'
import { Review } from '@/types'

interface ReviewCardProps {
  review: Review
  className?: string
}

export default function ReviewCard({ review, className = '' }: ReviewCardProps) {
  const customerName = review.metadata?.customer_name
  const reviewTitle = review.metadata?.review_title || review.title
  const reviewContent = review.metadata?.review_content
  const rating = review.metadata?.rating
  const product = review.metadata?.product
  const sizePurchased = review.metadata?.size_purchased
  const isVerified = review.metadata?.verified_purchase

  // Convert rating key to number for star display
  const starCount = rating?.key ? parseInt(rating.key) : 0

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border ${className}`}>
      {/* Rating Stars */}
      <div className="flex items-center mb-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < starCount ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        {isVerified && (
          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            Verified Purchase
          </span>
        )}
      </div>

      {/* Review Title */}
      <h3 className="font-semibold text-lg mb-2">{reviewTitle}</h3>

      {/* Review Content */}
      {reviewContent && (
        <p className="text-muted-foreground mb-4 line-clamp-4">
          {reviewContent}
        </p>
      )}

      {/* Product Link */}
      {product && (
        <div className="mb-3">
          <Link 
            href={`/products/${product.slug}`}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            {product.metadata?.product_name || product.title}
          </Link>
          {sizePurchased && (
            <span className="text-sm text-muted-foreground ml-2">
              • Size {sizePurchased.value}
            </span>
          )}
        </div>
      )}

      {/* Customer Name */}
      {customerName && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{customerName}</span>
          {rating && (
            <span className="text-sm text-muted-foreground">{rating.value}</span>
          )}
        </div>
      )}
    </div>
  )
}