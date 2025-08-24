import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Collection, Review, Category, CosmicResponse } from '@/types'

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

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort by sort_order if available
    const categories = response.objects as Category[];
    return categories.sort((a, b) => {
      const orderA = a.metadata?.sort_order || 999;
      const orderB = b.metadata?.sort_order || 999;
      return orderA - orderB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Fetch single category by slug
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch category: ${slug}`);
  }
}

// Fetch featured categories
export async function getFeaturedCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'categories',
        'metadata.featured_category': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const categories = response.objects as Category[];
    return categories.sort((a, b) => {
      const orderA = a.metadata?.sort_order || 999;
      const orderB = b.metadata?.sort_order || 999;
      return orderA - orderB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured categories');
  }
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

// Fetch products by category slug (filtering by category value, not ID)
export async function getProductsByCategorySlug(categorySlug: string): Promise<Product[]> {
  try {
    // First get the category to find its name
    const category = await getCategory(categorySlug);
    if (!category) {
      return [];
    }

    // Get all products and filter by category value
    const allProducts = await getProducts();
    const categoryName = category.metadata?.category_name || category.title;
    
    return allProducts.filter(product => {
      const productCategory = product.metadata?.category;
      return productCategory && 
             typeof productCategory === 'object' && 
             'value' in productCategory && 
             productCategory.value === categoryName;
    });
  } catch (error) {
    throw new Error(`Failed to fetch products for category slug: ${categorySlug}`);
  }
}

// Updated method - keep for backwards compatibility but use slug-based filtering
export async function getProductsByCategory(categoryIdOrSlug: string): Promise<Product[]> {
  // Check if this looks like an ID (mongo-style) or a slug
  if (categoryIdOrSlug.length === 24 && /^[a-f\d]+$/i.test(categoryIdOrSlug)) {
    // This looks like a MongoDB ObjectId, but since we can't query by category ID directly
    // in the current data structure, we'll need to get all products and filter
    try {
      const allProducts = await getProducts();
      // This won't work with current data structure, so return empty array
      return [];
    } catch (error) {
      return [];
    }
  } else {
    // Treat as slug
    return getProductsByCategorySlug(categoryIdOrSlug);
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