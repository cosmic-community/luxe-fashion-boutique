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

// Select-dropdown field interface for consistent typing
interface SelectDropdownField {
  key: string;
  value: string;
}

// Category interface for the new categories object type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    category_name?: string;
    description?: string;
    category_image?: {
      url: string;
      imgix_url: string;
    };
    featured_category?: boolean;
    sort_order?: number;
  };
}

// Product interface matching updated content model
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
    category?: SelectDropdownField; // Fixed: category is a select-dropdown field, not Category object
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
    rating?: SelectDropdownField;
    review_title?: string;
    review_content?: string;
    verified_purchase?: boolean;
    size_purchased?: SelectDropdownField;
    approved?: boolean;
  };
}

// Type literals for select-dropdown values
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

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}