// src/components/Shop/ProductDetail.tsx
import React from 'react';
import { Product } from '../../types/gymTypes';
import { FiStar } from 'react-icons/fi';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const hasDiscount = product.discount && product.discount.amount > 0;
  const discountedPrice = hasDiscount
    ? product.discount?.type === 'percentage'
      ? product.price * (1 - product.discount.amount / 100)
      : product.price - (product.discount?.amount ?? 0)
    : product.price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative pb-[100%] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="absolute h-full w-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm capitalize">
                  {product.category}
                </span>
                {product.isFeatured && (
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm flex items-center">
                    <FiStar className="mr-1" /> Featured
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                <div className="flex items-center">
                  {hasDiscount ? (
                    <>
                      <span className="text-2xl font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
                      <span className="ml-3 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                      <span className="ml-3 bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                        {product.discount?.type === 'percentage'
                          ? `${product.discount.amount}% OFF`
                          : `$${product.discount?.amount} OFF`}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Availability</h3>
                <span className={`px-3 py-1 rounded-full ${
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;