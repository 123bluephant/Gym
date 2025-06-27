import React, { createContext, useContext, useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  isNew: boolean;
  onSale: boolean;
  description: string;
  features: string[];
}

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Premium Yoga Mat',
      category: 'equipment',
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.5,
      reviews: 128,
      image: '/images/yoga-mat.jpg',
      isNew: false,
      onSale: true,
      description: 'High-quality yoga mat with excellent grip and cushioning',
      features: ['Non-slip surface', 'Eco-friendly materials', '6mm thickness']
    },
    // Add more products as needed
  ]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};