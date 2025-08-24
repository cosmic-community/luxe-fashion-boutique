# Luxe Fashion Boutique

![Fashion Store Preview](https://imgix.cosmicjs.com/ebd4df30-809e-11f0-8dcc-651091f6a7c0-photo-1594633313593-bab3825d0caf-1756008047802.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A sophisticated high-end fashion e-commerce website showcasing luxury products, curated collections, and authentic customer reviews. Built with Next.js 15 and powered by Cosmic for seamless content management.

## Features

- 🛍️ **Elegant Product Showcase** - High-resolution product galleries with detailed information
- 👗 **Curated Collections** - Featured collections like "Evening Elegance" and "Spring Essentials"  
- ⭐ **Customer Reviews** - Verified customer reviews with star ratings and size information
- 🎯 **Category Filtering** - Browse products by category (Dresses, Bags, Shoes, etc.)
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 🚀 **SEO Optimized** - Proper meta tags and structured data for search engines
- 💎 **Premium Experience** - Luxurious design matching high-end fashion brands

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68aa8c90d9e4dc4e1d0a40c1&clone_repository=68aa9019d9e4dc4e1d0a40e0)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store for high end fashion with products, collections, and customer reviews"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **React** - UI library for building components

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd luxe-fashion-boutique
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env.local

# Add your Cosmic credentials
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Products
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all products with images and category info
const products = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Collections with Products
```typescript
// Get collections with their associated products
const collections = await cosmic.objects
  .find({ type: 'collections' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Product Reviews
```typescript
// Get reviews for a specific product
const reviews = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product': productId,
    'metadata.approved': true 
  })
  .depth(1)
```

## Cosmic CMS Integration

This website integrates seamlessly with your Cosmic content:

- **Products** - Display luxury fashion items with pricing, images, and detailed descriptions
- **Collections** - Showcase curated product collections with beautiful imagery
- **Reviews** - Customer feedback system with ratings and purchase verification
- **Categories** - Product organization by type (Dresses, Bags, Shoes, etc.)

The content structure supports rich metadata including designer brands, materials, care instructions, and size availability.

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify settings

### Environment Variables for Production
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Visit [Cosmic docs](https://www.cosmicjs.com/docs) for more information about the Cosmic CMS.
<!-- README_END -->