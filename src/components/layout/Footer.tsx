
import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail,
  ArrowRight
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container-custom pt-16 pb-12">
        {/* Newsletter section */}
        <div className="mb-12 max-w-xl mx-auto text-center">
          <h3 className="heading-md mb-4">Subscribe to our newsletter</h3>
          <p className="text-muted-foreground mb-6">
            Stay updated with our latest collections, exclusive offers, and styling tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              Subscribe <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h2 className="font-serif text-xl font-medium mb-4">DHISHA</h2>
            <p className="text-muted-foreground mb-4">
              Curating the finest silk sarees from across India, celebrating the rich heritage of traditional craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-muted-foreground hover:text-foreground">Shop Now</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
            </ul>
          </div>
          
          {/* Help & Support */}
          <div>
            <h3 className="font-medium text-lg mb-4">Help & Support</h3>
            <ul className="space-y-3">
              <li><Link to="/shipping" className="text-muted-foreground hover:text-foreground">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-foreground">Returns & Exchanges</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms & Conditions</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">
                  123 Silk Avenue, Gandhi Nagar<br />
                  Bangalore, Karnataka 560001<br />
                  India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                <a href="tel:+919876543210" className="text-muted-foreground hover:text-foreground">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                <a href="mailto:info@dhisha.com" className="text-muted-foreground hover:text-foreground">
                  info@dhisha.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Payment Methods and bottom info */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Dhisha. All rights reserved.
              </p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2 text-center md:text-right">
                Secure Payments
              </p>
              <div className="flex space-x-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" 
                  alt="Visa" 
                  className="h-8 w-auto"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png" 
                  alt="Mastercard" 
                  className="h-8 w-auto"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" 
                  alt="American Express" 
                  className="h-8 w-auto"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1200px-Stripe_Logo%2C_revised_2016.svg.png" 
                  alt="Stripe" 
                  className="h-8 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
