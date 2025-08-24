import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Luxury Fashion
              <span className="block text-primary">Redefined</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover exquisite designer pieces that embody timeless elegance and contemporary sophistication. 
              From evening gowns to everyday essentials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/products" 
                className="btn btn-primary px-8 py-3 text-lg"
              >
                Shop Collection
              </Link>
              <Link 
                href="/collections" 
                className="btn btn-secondary px-8 py-3 text-lg"
              >
                View Collections
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://imgix.cosmicjs.com/ebd4df30-809e-11f0-8dcc-651091f6a7c0-photo-1594633313593-bab3825d0caf-1756008047802.jpg?w=800&h=600&fit=crop&auto=format,compress"
              alt="Luxury Fashion"
              width={600}
              height={450}
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}