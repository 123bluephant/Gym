// src/pages/Shop/ProductCard.tsx
import React from 'react';
import { Product } from '../../types/gymTypes';
import { FiStar } from 'react-icons/fi';

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <div 
            className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col"
            onClick={onClick}
        >
            <div className="relative pb-[100%] bg-gray-100">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="absolute h-full w-full object-cover"
                />
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                    {product.isFeatured && (
                        <FiStar className="text-yellow-500" />
                    )}
                </div>
                <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
                <div className="mt-auto">
                    <p className="text-lg font-bold">
                        ${product.price.toFixed(2)}
                        {product.discount && (
                            <span className="ml-2 text-sm text-red-500">
                                {product.discount.type === 'percentage'
                                    ? `(${product.discount.amount}% off)`
                                    : `($${product.discount.amount} off)`}
                            </span>
                        )}
                    </p>
                    <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;