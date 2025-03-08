
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/utils/mockData";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  showEmpty?: boolean;
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  subtitle,
  columns = 4,
  showEmpty = true,
  loading = false,
}) => {
  const gridColsClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns];

  const renderSkeletonCards = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <div key={`skeleton-${index}`} className="animate-pulse">
        <div className="rounded-md bg-gray-200 h-72 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
        <div className="h-5 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    ));
  };

  return (
    <section className="py-12">
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && <h2 className="heading-lg mb-3">{title}</h2>}
          {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      {loading ? (
        <div className={`grid ${gridColsClass} gap-x-6 gap-y-10`}>
          {renderSkeletonCards()}
        </div>
      ) : products.length > 0 ? (
        <div className={`grid ${gridColsClass} gap-x-6 gap-y-10`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        showEmpty && (
          <div className="text-center py-12">
            <h3 className="font-medium text-xl mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )
      )}
    </section>
  );
};

export default ProductGrid;
