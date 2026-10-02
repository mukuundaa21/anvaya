export function Footer() {
  return (
    <footer className="bg-anvaya-navy text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="font-serif text-2xl tracking-widest text-anvaya-gold block mb-4">ANVAYA</span>
            <p className="text-sm">The B2B Inventory Recovery Exchange.</p>
            <p className="text-sm mt-2">Turn surplus inventory into working capital.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/marketplace" className="hover:text-anvaya-gold">Marketplace</a></li>
              <li><a href="/premium" className="hover:text-anvaya-gold">Premium Exchange</a></li>
              <li><a href="/for-sellers" className="hover:text-anvaya-gold">For Sellers</a></li>
              <li><a href="/for-buyers" className="hover:text-anvaya-gold">For Buyers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/about" className="hover:text-anvaya-gold">About Us</a></li>
              <li><a href="/how-it-works" className="hover:text-anvaya-gold">How It Works</a></li>
              <li><a href="/contact" className="hover:text-anvaya-gold">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/terms" className="hover:text-anvaya-gold">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-anvaya-gold">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Anvaya Exchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
