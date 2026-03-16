// Client-side products storage service
const STORAGE_KEY = 'divine_products';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  image?: string;
  published: boolean;
  createdAt: string;
}

export const productsService = {
  // Get all products from localStorage
  getAll(): Product[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // Get single product by ID
  getById(id: string): Product | undefined {
    return this.getAll().find(p => p.id === id);
  },

  // Create new product
  create(product: Omit<Product, 'id' | 'createdAt'>): Product {
    if (typeof window === 'undefined') {
      throw new Error('Cannot create product in server context');
    }

    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const products = this.getAll();
    products.push(newProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return newProduct;
  },

  // Update existing product
  update(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Product | undefined {
    if (typeof window === 'undefined') {
      throw new Error('Cannot update product in server context');
    }

    const products = this.getAll();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) return undefined;

    products[index] = { ...products[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return products[index];
  },

  // Delete product
  delete(id: string): boolean {
    if (typeof window === 'undefined') {
      throw new Error('Cannot delete product in server context');
    }

    const products = this.getAll();
    const filtered = products.filter(p => p.id !== id);

    if (filtered.length === products.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // Get published products only
  getPublished(): Product[] {
    return this.getAll().filter(p => p.published);
  },

  // Initialize with sample data if empty
  initializeIfEmpty() {
    if (typeof window === 'undefined') return;

    const existing = this.getAll();
    if (existing.length > 0) return;

    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Silk Evening Gown',
        description: 'Luxurious silk evening gown perfect for formal occasions',
        price: 299.99,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        published: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Cashmere Sweater',
        description: 'Premium cashmere sweater for ultimate comfort',
        price: 179.99,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        published: true,
        createdAt: new Date().toISOString(),
      },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleProducts));
  },
};
