// src/data/mockProducts.ts
import { Product } from '../types/gymTypes';
export interface ProductSale {
    id: string;
    productId: string;
    date: string;
    quantity: number;
    price: number;
}

export const mockProductSales: ProductSale[] = [
    { id: '1', productId: '1', date: '2023-06-15', quantity: 1, price: 29.99 },
    { id: '2', productId: '1', date: '2023-06-20', quantity: 1, price: 29.99 },
    { id: '3', productId: '2', date: '2023-06-10', quantity: 1, price: 59.99 },
    // Add more sales data...
];
export const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Whey Protein Powder',
        description: 'Premium quality whey protein with 24g protein per serving',
        price: 39.99,
        category: 'supplements',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15'),
        isFeatured: true,
        discount: {
            amount: 10,
            type: 'percentage',
        }
    },
    {
        id: '2',
        name: 'Yoga Mat',
        description: 'Non-slip, eco-friendly yoga mat with carrying strap',
        price: 29.99,
        category: 'equipment',
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
        createdAt: new Date('2023-02-20'),
        updatedAt: new Date('2023-02-20'),
        isFeatured: false
    },
    {
        id: '3',
        name: 'Gym T-Shirt',
        description: 'Moisture-wicking performance t-shirt for workouts',
        price: 24.99,
        category: 'clothing',
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
        createdAt: new Date('2023-03-10'),
        updatedAt: new Date('2023-03-10'),
        isFeatured: true
    },
    {
        id: '4',
        name: 'Premium Membership',
        description: '3-month premium gym membership with all access',
        price: 199.99,
        category: 'membership',
        stock: 100,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
        isFeatured: true,
        discount: {
            amount: 20,
            type: 'fixed',
        }
    }
];