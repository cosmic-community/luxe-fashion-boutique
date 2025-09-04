export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/50 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Luxe Fashion Boutique</h3>
            <p className="text-muted-foreground">
              Discover luxury fashion pieces from renowned designers. Quality, elegance, and style redefined.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/products" className="hover:text-foreground">Products</a></li>
              <li><a href="/collections" className="hover:text-foreground">Collections</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/products?category=dresses" className="hover:text-foreground">Dresses</a></li>
              <li><a href="/products?category=bags" className="hover:text-foreground">Bags</a></li>
              <li><a href="/products?category=shoes" className="hover:text-foreground">Shoes</a></li>
              <li><a href="/products?category=accessories" className="hover:text-foreground">Accessories</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} Luxe Fashion Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}