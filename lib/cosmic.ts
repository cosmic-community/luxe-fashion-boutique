import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Collection, Review, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

// Fetch single product by slug
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch product: ${slug}`);
  }
}

// Fetch products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.category.key': category
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error(`Failed to fetch products for category: ${category}`);
  }
}

// Fetch featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.featured_product': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured products');
  }
}

// Fetch all collections
export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Collection[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch collections');
  }
}

// Fetch single collection by slug
export async function getCollection(slug: string): Promise<Collection | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Collection;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch collection: ${slug}`);
  }
}

// Fetch featured collections
export async function getFeaturedCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'collections',
        'metadata.featured_collection': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Collection[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured collections');
  }
}

// Fetch reviews for a product
export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.product': productId,
        'metadata.approved': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Review[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error(`Failed to fetch reviews for product: ${productId}`);
  }
}

// Fetch all approved reviews
export async function getReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.approved': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Review[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}