// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Product interface matching your content model
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name?: string;
    description?: string;
    price?: number;
    product_images?: {
      url: string;
      imgix_url: string;
    }[];
    designer_brand?: string;
    category?: {
      key: string;
      value: string;
    };
    sizes_available?: string[];
    materials?: string;
    care_instructions?: string;
    in_stock?: boolean;
    featured_product?: boolean;
  };
}

// Collection interface matching your content model
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    collection_name?: string;
    description?: string;
    collection_image?: {
      url: string;
      imgix_url: string;
    };
    products?: Product[];
    season_year?: string;
    featured_collection?: boolean;
  };
}

// Review interface matching your content model
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    product?: Product;
    customer_name?: string;
    rating?: {
      key: string;
      value: string;
    };
    review_title?: string;
    review_content?: string;
    verified_purchase?: boolean;
    size_purchased?: {
      key: string;
      value: string;
    };
    approved?: boolean;
  };
}

// Type literals for select-dropdown values
export type ProductCategory = 'dresses' | 'tops' | 'bottoms' | 'outerwear' | 'accessories' | 'shoes' | 'bags';
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type RatingValue = '1' | '2' | '3' | '4' | '5';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Utility types
export type ProductWithReviews = Product & {
  reviews?: Review[];
  averageRating?: number;
  reviewCount?: number;
};

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}