import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Luxe Fashion Boutique
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Products
            </Link>
            <Link 
              href="/collections" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Collections
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}