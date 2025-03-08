
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductGrid from "@/components/products/ProductGrid";
import { getFeaturedProducts } from "@/utils/mockData";

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts(8);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="heading-lg mb-3">Featured Collection</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our handpicked selection of exquisite sarees, each piece a testament to India's rich textile heritage and artisanal craftsmanship.
            </p>
          </div>
          <Link 
            to="/shop" 
            className="hidden md:inline-flex items-center mt-4 md:mt-0 text-primary hover:underline font-medium"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <ProductGrid products={featuredProducts} columns={4} />
        
        <div className="text-center mt-8 md:hidden">
          <Link 
            to="/shop" 
            className="btn-outline"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
