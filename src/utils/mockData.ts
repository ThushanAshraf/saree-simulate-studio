
import { faker } from '@faker-js/faker/locale/en_IN';

export type ProductCategory = 
  | 'Banarasi Silk' 
  | 'Kanjivaram Silk' 
  | 'Chanderi' 
  | 'Patola' 
  | 'Mysore Silk' 
  | 'Sambalpuri' 
  | 'Bandhani' 
  | 'Gadwal' 
  | 'Paithani' 
  | 'Designer';

export type ProductColor = 
  | 'Red' 
  | 'Blue' 
  | 'Green' 
  | 'Yellow' 
  | 'Pink' 
  | 'Purple' 
  | 'Gold' 
  | 'Maroon' 
  | 'Teal' 
  | 'Beige' 
  | 'Coral' 
  | 'Black' 
  | 'White' 
  | 'Orange' 
  | 'Multicolor';

export type ProductMaterial = 
  | 'Pure Silk' 
  | 'Cotton Silk' 
  | 'Art Silk' 
  | 'Georgette' 
  | 'Chiffon' 
  | 'Cotton' 
  | 'Linen' 
  | 'Tussar Silk' 
  | 'Crepe' 
  | 'Organza';

export type ProductOccasion = 
  | 'Wedding' 
  | 'Festival' 
  | 'Party' 
  | 'Casual' 
  | 'Office Wear' 
  | 'Bridal' 
  | 'Ceremonial' 
  | 'Formal' 
  | 'Daily Wear';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: ProductCategory;
  color: ProductColor[];
  material: ProductMaterial;
  occasion: ProductOccasion[];
  blouseIncluded: boolean;
  rating: number;
  reviews: number;
  bestSeller: boolean;
  newArrival: boolean;
  featured: boolean;
  stock: number;
  weight: string;
  dimensions: string;
  careInstructions: string[];
  tags: string[];
}

// Generate realistic Indian saree names
const generateSareeName = (): string => {
  const prefixes = [
    'Royal', 'Elegant', 'Traditional', 'Handcrafted', 'Heritage', 'Luxurious',
    'Premium', 'Classic', 'Handwoven', 'Exquisite', 'Ethnic', 'Designer', 'Artisan'
  ];
  
  const styles = [
    'Banarasi', 'Kanjivaram', 'Patola', 'Chanderi', 'Paithani', 'Sambalpuri',
    'Mysore', 'Gadwal', 'Bandhani', 'Pochampally', 'Tussar', 'Baluchari', 'Jamdani'
  ];
  
  const suffixes = [
    'Silk Saree', 'Weave Saree', 'Handloom Saree', 'Zari Saree', 'Embroidered Saree',
    'Festive Saree', 'Bridal Saree', 'Pure Silk Saree', 'Designer Saree'
  ];
  
  const prefix = faker.helpers.arrayElement(prefixes);
  const style = faker.helpers.arrayElement(styles);
  const suffix = faker.helpers.arrayElement(suffixes);
  
  return `${prefix} ${style} ${suffix}`;
};

// Generate product descriptions
const generateDescription = (name: string, material: ProductMaterial, category: ProductCategory): string => {
  const intros = [
    `This exquisite ${category} saree showcases the rich tradition of Indian craftsmanship.`,
    `Elevate your ethnic wardrobe with this stunning ${category} saree.`,
    `A masterpiece of traditional artisanship, this ${category} saree exudes elegance.`,
    `This beautiful ${category} saree combines traditional designs with contemporary appeal.`
  ];
  
  const details = [
    `Crafted from premium ${material} that ensures comfort and durability.`,
    `Made with finest ${material} by skilled artisans using traditional techniques.`,
    `The luxurious ${material} fabric drapes beautifully and offers a comfortable fit.`,
    `Woven with intricate detail using high-quality ${material} for a luxurious feel.`
  ];
  
  const features = [
    'The ornate zari work adds a touch of opulence to this piece.',
    'Features intricate motifs that tell stories of ancient art forms.',
    'Adorned with traditional motifs that celebrate India\'s rich cultural heritage.',
    'The detailed embroidery highlights the exceptional craftsmanship.',
    'The rich color palette is inspired by India\'s vibrant cultural traditions.'
  ];
  
  const conclusions = [
    'Pair with traditional jewelry for a complete festive look.',
    'Perfect for special occasions and celebrations that call for elegance.',
    'An heirloom-quality piece that will be treasured for generations.',
    'A timeless addition to your ethnic wardrobe.',
    'Makes for a perfect gift to celebrate special moments.'
  ];
  
  return [
    faker.helpers.arrayElement(intros),
    faker.helpers.arrayElement(details),
    faker.helpers.arrayElement(features),
    faker.helpers.arrayElement(conclusions)
  ].join(' ');
};

// Generate unique descriptive tags
const generateTags = (category: ProductCategory, material: ProductMaterial, colors: ProductColor[], occasion: ProductOccasion[]): string[] => {
  const tags = [category, material, ...colors, ...occasion];
  
  const additionalTags = [
    'Traditional', 'Handloom', 'Handcrafted', 'Authentic', 'Ethnic Wear',
    'Indian Heritage', 'Sustainable Fashion', 'Artisan Made', 'Luxury', 'Premium'
  ];
  
  // Add 2-3 random additional tags
  for (let i = 0; i < faker.number.int({min: 2, max: 3}); i++) {
    tags.push(faker.helpers.arrayElement(additionalTags));
  }
  
  // Remove duplicates
  return [...new Set(tags)];
};

// Generate care instructions
const generateCareInstructions = (): string[] => {
  const careInstructions = [
    'Dry clean only',
    'Do not bleach',
    'Do not tumble dry',
    'Store in a cool, dry place',
    'Iron on low heat if necessary',
    'Hand wash with mild detergent',
    'Do not wring',
    'Dry in shade'
  ];
  
  // Return 4-5 random care instructions
  return faker.helpers.arrayElements(careInstructions, faker.number.int({min: 4, max: 5}));
};

// Get image URL for sarees (using placeholder services with specific dimensions)
const getSareeImageUrl = (id: number, index: number): string => {
  // For realistic saree images, we'll use placeholder with saree-related terms
  const keywords = ['indian saree', 'silk saree', 'traditional saree', 'wedding saree', 'handloom saree'];
  const keyword = encodeURIComponent(faker.helpers.arrayElement(keywords));
  const seed = `saree-${id}-${index}`;
  
  // Use a combination of different placeholder services
  const services = [
    `https://source.unsplash.com/800x1200/?${keyword}&sig=${id * 10 + index}`,
    `https://picsum.photos/seed/${seed}/800/1200`,
    `https://images.unsplash.com/photo-1583391733981-8698e5f9c6db?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1200&ixid=MnwxfDB8MXxyYW5kb218MHx8c2FyZWV8fHx8fHwxNjg2NTg0NzIw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=800`
  ];
  
  return services[index % services.length];
};

// Generate a single product
const generateProduct = (id: number): Product => {
  const category = faker.helpers.arrayElement([
    'Banarasi Silk', 'Kanjivaram Silk', 'Chanderi', 'Patola', 
    'Mysore Silk', 'Sambalpuri', 'Bandhani', 'Gadwal', 'Paithani', 'Designer'
  ] as ProductCategory[]);
  
  const material = faker.helpers.arrayElement([
    'Pure Silk', 'Cotton Silk', 'Art Silk', 'Georgette', 
    'Chiffon', 'Cotton', 'Linen', 'Tussar Silk', 'Crepe', 'Organza'
  ] as ProductMaterial[]);
  
  const colors = faker.helpers.arrayElements([
    'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 
    'Gold', 'Maroon', 'Teal', 'Beige', 'Coral', 'Black', 
    'White', 'Orange', 'Multicolor'
  ] as ProductColor[], faker.number.int({min: 1, max: 3}));
  
  const occasions = faker.helpers.arrayElements([
    'Wedding', 'Festival', 'Party', 'Casual', 'Office Wear',
    'Bridal', 'Ceremonial', 'Formal', 'Daily Wear'
  ] as ProductOccasion[], faker.number.int({min: 1, max: 3}));
  
  const name = generateSareeName();
  const price = faker.number.int({min: 2500, max: 50000});
  
  // Only some products have discounts
  const hasDiscount = faker.datatype.boolean(0.3);
  const discountPrice = hasDiscount 
    ? Math.round(price * (1 - faker.number.float({min: 0.1, max: 0.4}))) 
    : undefined;
  
  return {
    id: `SAREE${id.toString().padStart(4, '0')}`,
    name,
    description: generateDescription(name, material, category),
    price,
    discountPrice,
    images: Array.from({ length: faker.number.int({min: 3, max: 5}) }, (_, index) => 
      getSareeImageUrl(id, index)
    ),
    category,
    color: colors,
    material,
    occasion: occasions,
    blouseIncluded: faker.datatype.boolean(0.7),
    rating: faker.number.float({ min: 3.5, max: 5, precision: 0.1 }),
    reviews: faker.number.int({min: 0, max: 500}),
    bestSeller: faker.datatype.boolean(0.2),
    newArrival: faker.datatype.boolean(0.3),
    featured: faker.datatype.boolean(0.25),
    stock: faker.number.int({min: 0, max: 50}),
    weight: `${faker.number.float({min: 0.5, max: 2.5, precision: 0.1})} kg`,
    dimensions: `${faker.number.int({min: 5, max: 6})} meters (length) x ${faker.number.int({min: 45, max: 48})} inches (width)`,
    careInstructions: generateCareInstructions(),
    tags: generateTags(category, material, colors, occasions)
  };
};

// Generate all products
export const generateProducts = (count: number = 105): Product[] => {
  return Array.from({ length: count }, (_, index) => generateProduct(index + 1));
};

// Get all available filters
export const getAvailableFilters = (products: Product[]) => {
  const categories = new Set<ProductCategory>();
  const colors = new Set<ProductColor>();
  const materials = new Set<ProductMaterial>();
  const occasions = new Set<ProductOccasion>();
  const priceRanges = [
    { min: 0, max: 5000, label: 'Under ₹5,000' },
    { min: 5000, max: 10000, label: '₹5,000 - ₹10,000' },
    { min: 10000, max: 20000, label: '₹10,000 - ₹20,000' },
    { min: 20000, max: 50000, label: '₹20,000 - ₹50,000' },
    { min: 50000, max: Number.MAX_SAFE_INTEGER, label: 'Above ₹50,000' }
  ];
  
  products.forEach(product => {
    categories.add(product.category);
    product.color.forEach(c => colors.add(c));
    materials.add(product.material);
    product.occasion.forEach(o => occasions.add(o));
  });
  
  return {
    categories: Array.from(categories),
    colors: Array.from(colors),
    materials: Array.from(materials),
    occasions: Array.from(occasions),
    priceRanges
  };
};

// Create a singleton instance of products
export const products = generateProducts();
export const filters = getAvailableFilters(products);

// Export helper functions to get products
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (limit: number = 8): Product[] => {
  return products
    .filter(product => product.featured)
    .slice(0, limit);
};

export const getNewArrivals = (limit: number = 8): Product[] => {
  return products
    .filter(product => product.newArrival)
    .slice(0, limit);
};

export const getBestSellers = (limit: number = 8): Product[] => {
  return products
    .filter(product => product.bestSeller)
    .slice(0, limit);
};

// Simple search function
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Filter products
export interface FilterOptions {
  categories?: ProductCategory[];
  colors?: ProductColor[];
  materials?: ProductMaterial[];
  occasions?: ProductOccasion[];
  priceRange?: { min: number; max: number };
  sortBy?: 'price-low-high' | 'price-high-low' | 'newest' | 'popular';
  query?: string;
}

export const filterProducts = (options: FilterOptions): Product[] => {
  let filteredProducts = [...products];
  
  // Apply text search if provided
  if (options.query) {
    filteredProducts = searchProducts(options.query);
  }
  
  // Filter by categories
  if (options.categories && options.categories.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      options.categories!.includes(product.category)
    );
  }
  
  // Filter by colors (a product matches if it has ANY of the selected colors)
  if (options.colors && options.colors.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.color.some(c => options.colors!.includes(c))
    );
  }
  
  // Filter by materials
  if (options.materials && options.materials.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      options.materials!.includes(product.material)
    );
  }
  
  // Filter by occasions (a product matches if it has ANY of the selected occasions)
  if (options.occasions && options.occasions.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.occasion.some(o => options.occasions!.includes(o))
    );
  }
  
  // Filter by price range
  if (options.priceRange) {
    filteredProducts = filteredProducts.filter(product => {
      const priceToCompare = product.discountPrice ?? product.price;
      return priceToCompare >= options.priceRange!.min && 
             priceToCompare <= options.priceRange!.max;
    });
  }
  
  // Sort products
  if (options.sortBy) {
    switch(options.sortBy) {
      case 'price-low-high':
        filteredProducts.sort((a, b) => 
          (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)
        );
        break;
      case 'price-high-low':
        filteredProducts.sort((a, b) => 
          (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)
        );
        break;
      case 'newest':
        filteredProducts.sort((a, b) => 
          (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0)
        );
        break;
      case 'popular':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
  }
  
  return filteredProducts;
};
