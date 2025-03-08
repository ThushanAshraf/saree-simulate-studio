
import React, { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  filters, 
  ProductCategory, 
  ProductColor, 
  ProductMaterial, 
  ProductOccasion,
  FilterOptions
} from "@/utils/mockData";
import { X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductFilterProps {
  activeFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  productCount: number;
  totalCount: number;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  activeFilters,
  onFilterChange,
  onClearFilters,
  productCount,
  totalCount
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleCategoryChange = (category: ProductCategory, checked: boolean) => {
    const currentCategories = activeFilters.categories || [];
    const newCategories = checked
      ? [...currentCategories, category]
      : currentCategories.filter(c => c !== category);
    
    onFilterChange({
      ...activeFilters,
      categories: newCategories.length > 0 ? newCategories : undefined
    });
  };

  const handleColorChange = (color: ProductColor, checked: boolean) => {
    const currentColors = activeFilters.colors || [];
    const newColors = checked
      ? [...currentColors, color]
      : currentColors.filter(c => c !== color);
    
    onFilterChange({
      ...activeFilters,
      colors: newColors.length > 0 ? newColors : undefined
    });
  };

  const handleMaterialChange = (material: ProductMaterial, checked: boolean) => {
    const currentMaterials = activeFilters.materials || [];
    const newMaterials = checked
      ? [...currentMaterials, material]
      : currentMaterials.filter(m => m !== material);
    
    onFilterChange({
      ...activeFilters,
      materials: newMaterials.length > 0 ? newMaterials : undefined
    });
  };

  const handleOccasionChange = (occasion: ProductOccasion, checked: boolean) => {
    const currentOccasions = activeFilters.occasions || [];
    const newOccasions = checked
      ? [...currentOccasions, occasion]
      : currentOccasions.filter(o => o !== occasion);
    
    onFilterChange({
      ...activeFilters,
      occasions: newOccasions.length > 0 ? newOccasions : undefined
    });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const applyPriceRange = () => {
    onFilterChange({
      ...activeFilters,
      priceRange: { min: priceRange[0], max: priceRange[1] }
    });
  };

  const getActiveFilterCount = (): number => {
    let count = 0;
    if (activeFilters.categories?.length) count += activeFilters.categories.length;
    if (activeFilters.colors?.length) count += activeFilters.colors.length;
    if (activeFilters.materials?.length) count += activeFilters.materials.length;
    if (activeFilters.occasions?.length) count += activeFilters.occasions.length;
    if (activeFilters.priceRange) count += 1;
    if (activeFilters.sortBy) count += 1;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  const filterContent = (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-lg">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Clear all
          </button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["category", "price", "color"]}>
        {/* Categories Filter */}
        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {filters.categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={activeFilters.categories?.includes(category) || false}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category, checked === true)
                    }
                  />
                  <label 
                    htmlFor={`category-${category}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2 px-1">
              <Slider
                defaultValue={[0, 50000]}
                max={50000}
                step={1000}
                value={priceRange}
                onValueChange={handlePriceChange}
                minStepsBetweenThumbs={1}
                className="mb-6"
              />
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm">
                  ₹{priceRange[0].toLocaleString('en-IN')}
                </span>
                <span className="text-sm">
                  ₹{priceRange[1].toLocaleString('en-IN')}
                </span>
              </div>
              <Button 
                onClick={applyPriceRange} 
                variant="outline" 
                size="sm" 
                className="w-full"
              >
                Apply
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors Filter */}
        <AccordionItem value="color">
          <AccordionTrigger className="text-base font-medium">Colors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {filters.colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`color-${color}`}
                    checked={activeFilters.colors?.includes(color) || false}
                    onCheckedChange={(checked) => 
                      handleColorChange(color, checked === true)
                    }
                  />
                  <label 
                    htmlFor={`color-${color}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <span 
                      className="w-4 h-4 rounded-full mr-2 inline-block border border-gray-200"
                      style={{ backgroundColor: color.toLowerCase() }}
                    ></span>
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Materials Filter */}
        <AccordionItem value="material">
          <AccordionTrigger className="text-base font-medium">Materials</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {filters.materials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`material-${material}`}
                    checked={activeFilters.materials?.includes(material) || false}
                    onCheckedChange={(checked) => 
                      handleMaterialChange(material, checked === true)
                    }
                  />
                  <label 
                    htmlFor={`material-${material}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {material}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Occasions Filter */}
        <AccordionItem value="occasion">
          <AccordionTrigger className="text-base font-medium">Occasions</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {filters.occasions.map((occasion) => (
                <div key={occasion} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`occasion-${occasion}`}
                    checked={activeFilters.occasions?.includes(occasion) || false}
                    onCheckedChange={(checked) => 
                      handleOccasionChange(occasion, checked === true)
                    }
                  />
                  <label 
                    htmlFor={`occasion-${occasion}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {occasion}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );

  return (
    <>
      {/* Desktop filter sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        {filterContent}
      </div>

      {/* Mobile filter button and display count */}
      <div className="lg:hidden w-full flex justify-between items-center mb-6">
        <div>
          <span className="text-sm text-muted-foreground">
            Showing {productCount} of {totalCount} products
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile filter slide-in */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 overflow-y-auto animate-slide-left">
            <button 
              onClick={() => setMobileFiltersOpen(false)}
              className="absolute top-4 right-4 p-2"
              aria-label="Close filters"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="pt-4">
              {filterContent}
            </div>
            <div className="mt-8 flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilter;
