
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown 
} from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { Badge } from "@/components/ui/badge";

interface NavLink {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { 
    name: "Collections", 
    href: "/shop",
    subItems: [
      { name: "Banarasi Silk", href: "/shop?category=Banarasi%20Silk" },
      { name: "Kanjivaram Silk", href: "/shop?category=Kanjivaram%20Silk" },
      { name: "Patola", href: "/shop?category=Patola" },
      { name: "Chanderi", href: "/shop?category=Chanderi" },
      { name: "Mysore Silk", href: "/shop?category=Mysore%20Silk" },
      { name: "View All", href: "/shop" },
    ]
  },
  { name: "New Arrivals", href: "/shop?filter=new-arrivals" },
  { name: "Best Sellers", href: "/shop?filter=best-sellers" },
  { name: "Wedding Collection", href: "/shop?occasion=Wedding" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useCart();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?query=${encodeURIComponent(searchQuery)}`;
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-2" 
          : "bg-white py-4"
      }`}
    >
      {/* Top announcement bar */}
      <div className="bg-black text-white text-center text-xs py-2">
        Free shipping on orders above ₹10,000 | Easy returns within 7 days
      </div>
      
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button 
            className="lg:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h1 className="font-serif text-xl md:text-2xl font-medium">DHISHA</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.subItems ? (
                  <>
                    <button 
                      className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                        location.pathname === link.href ? "text-primary" : ""
                      }`}
                      onClick={() => toggleDropdown(link.name)}
                    >
                      {link.name}
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                    
                    <div 
                      className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out ${
                        activeDropdown === link.name 
                          ? "opacity-100 visible transform translate-y-0" 
                          : "opacity-0 invisible transform -translate-y-2"
                      }`}
                    >
                      <div className="py-1">
                        {link.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === link.href ? "text-primary" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="p-1 rounded-full hover:bg-gray-100 transition-colors hidden sm:flex"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>
            
            {/* User account */}
            <Link 
              to="/account" 
              className="p-1 rounded-full hover:bg-gray-100 transition-colors hidden sm:flex"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
            
            {/* Cart */}
            <Link 
              to="/cart" 
              className="p-1 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cart.totalItems > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs rounded-full" 
                  variant="default"
                >
                  {cart.totalItems}
                </Badge>
              )}
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white">
            <div className="container pt-20 pb-6">
              <button 
                className="absolute top-4 right-4" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
              
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <div key={link.name} className="py-2">
                    {link.subItems ? (
                      <>
                        <button 
                          className="flex items-center justify-between w-full text-lg font-medium"
                          onClick={() => toggleDropdown(link.name)}
                        >
                          {link.name}
                          <ChevronDown className={`h-5 w-5 transition-transform ${
                            activeDropdown === link.name ? "rotate-180" : ""
                          }`} />
                        </button>
                        
                        {activeDropdown === link.name && (
                          <div className="mt-2 ml-4 space-y-2">
                            {link.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className="block py-2 text-base text-gray-600 hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-lg font-medium hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 border-t border-gray-200">
                  <Link 
                    to="/account" 
                    className="flex items-center py-2 text-lg font-medium hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" /> My Account
                  </Link>
                  <Link 
                    to="/wishlist" 
                    className="flex items-center py-2 text-lg font-medium hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="h-5 w-5 mr-2" /> Wishlist
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
        
        {/* Search Overlay */}
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20 px-4 animate-fade-in">
            <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl overflow-hidden">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="search"
                  placeholder="Search for sarees..."
                  className="w-full px-4 py-4 pr-12 text-lg outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button 
                  type="submit" 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
              
              <div className="p-4 border-t">
                <p className="font-medium mb-2">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {["Banarasi Silk", "Wedding Collection", "Red Saree", "Patola", "New Arrivals"].map((term) => (
                    <Link
                      key={term}
                      to={`/shop?query=${encodeURIComponent(term)}`}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      onClick={() => setSearchOpen(false)}
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="p-4 flex justify-end border-t">
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
