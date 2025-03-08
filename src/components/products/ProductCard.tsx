
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/utils/mockData";
import { useCart } from "@/lib/context/CartContext";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { addToCart, isInCart } = useCart();
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);
  
  const formattedDiscountPrice = product.discountPrice 
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(product.discountPrice)
    : null;
  
  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null;
    
  return (
    <div className={cn("group relative", className)}>
      <Link 
        to={`/product/${product.id}`} 
        className="block overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative pb-[125%] overflow-hidden bg-gray-100 rounded-md">
          {/* Product Image */}
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className={cn(
              "absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-in-out",
              isImageLoaded ? "opacity-100" : "opacity-0",
              isHovered ? "scale-105" : "scale-100"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.newArrival && (
              <Badge className="bg-black text-white px-2 py-1 text-xs rounded">New</Badge>
            )}
            {product.bestSeller && (
              <Badge className="bg-saree-gold text-black px-2 py-1 text-xs rounded">Best Seller</Badge>
            )}
            {discountPercentage && (
              <Badge className="bg-red-600 text-white px-2 py-1 text-xs rounded">-{discountPercentage}%</Badge>
            )}
          </div>
          
          {/* Hover Action Buttons */}
          <div 
            className={`absolute bottom-4 left-0 right-0 flex justify-center space-x-2 transition-transform duration-300 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <button 
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
            <button 
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
              aria-label="Quick view"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button 
              onClick={handleAddToCart}
              className={`p-2 rounded-full transition-colors shadow-sm ${
                isInCart(product.id)
                  ? "bg-primary/90 text-white hover:bg-primary"
                  : "bg-white/90 backdrop-blur-sm hover:bg-white"
              }`}
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="mt-4 text-left">
          <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
          <h3 className="font-medium text-base truncate">{product.name}</h3>
          <div className="mt-1 flex items-center">
            {product.discountPrice ? (
              <>
                <span className="font-medium">{formattedDiscountPrice}</span>
                <span className="ml-2 text-sm text-muted-foreground line-through">{formattedPrice}</span>
              </>
            ) : (
              <span className="font-medium">{formattedPrice}</span>
            )}
          </div>
          
          {/* Rating Stars */}
          <div className="mt-1 flex items-center">
            <div className="flex text-saree-gold">
              {Array.from({ length: 5 }).map((_, index) => {
                const starValue = index + 1;
                const filled = product.rating >= starValue;
                const halfFilled = product.rating >= starValue - 0.5 && product.rating < starValue;
                
                return (
                  <span key={index} className="text-xs">
                    {filled ? "★" : halfFilled ? "★" : "☆"}
                  </span>
                );
              })}
            </div>
            <span className="ml-1 text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
