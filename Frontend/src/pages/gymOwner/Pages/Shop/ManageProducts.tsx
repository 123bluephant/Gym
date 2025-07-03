// src/pages/Shop/ManageProducts.tsx
import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiX, FiSave, FiDollarSign, FiImage, FiPackage, FiStar, FiTrendingUp, FiBarChart2 } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { mockProducts, mockProductSales } from '../../Data/mockProducts';
import { Product } from '../../types/gymTypes';

const ManageProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editProduct, setEditProduct] = useState<Partial<Product> | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'details' | 'analytics'>('details');

    // Calculate sales data for a product
    const getProductSalesData = (productId: string) => {
        const allSales = mockProductSales.filter(sale => sale.productId === productId);
        const lastMonthSales = allSales.filter(sale => {
            const saleDate = new Date(sale.date);
            const now = new Date();
            return saleDate.getMonth() === now.getMonth() - 1 && saleDate.getFullYear() === now.getFullYear();
        }).length;

        const monthlySales = Array.from({ length: 6 }, (_, i) => {
            const now = new Date();
            const targetMonth = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
            return {
                month: targetMonth.toLocaleString('default', { month: 'short' }),
                sales: allSales.filter(sale => {
                    const saleDate = new Date(sale.date);
                    return saleDate.getMonth() === targetMonth.getMonth() && 
                           saleDate.getFullYear() === targetMonth.getFullYear();
                }).length
            };
        });

        return {
            totalSales: allSales.length,
            lastMonthSales,
            monthlySales,
            revenue: allSales.reduce((sum, sale) => sum + sale.price, 0)
        };
    };

    // Handle viewing product details
    const handleViewProduct = (product: Product) => {
        setSelectedProduct(product);
        setIsEditing(false);
        setActiveTab('details');
    };

    // Handle starting to edit a product
    const handleStartEdit = (product: Product) => {
        setEditProduct({ ...product });
        setImagePreview(product.imageUrl || null);
        setIsEditing(true);
        setSelectedProduct(null);
    };

    // Handle starting to add a new product
    const handleStartAdd = () => {
        setEditProduct({
            id: Date.now().toString(),
            name: '',
            description: '',
            price: 0,
            category: 'supplements',
            stock: 0,
            imageUrl: '',
            isFeatured: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        setImagePreview(null);
        setIsEditing(true);
        setSelectedProduct(null);
    };

    // Handle canceling edit/add
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditProduct(null);
        setImagePreview(null);
    };

    // Handle saving product (both add and edit)
    const handleSaveProduct = () => {
        if (!editProduct) return;

        const productToSave: Product = {
            ...editProduct as Product,
            updatedAt: new Date(),
            createdAt: editProduct.createdAt || new Date()
        };

        if (isEditing && editProduct.id) {
            // Update existing product
            setProducts(products.map(p =>
                p.id === editProduct.id ? productToSave : p
            ));
        } else {
            // Add new product
            setProducts([...products, productToSave]);
        }

        handleCancelEdit();
    };

    // Handle deleting a product
    const handleDeleteProduct = (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(product => product.id !== id));
            if (selectedProduct?.id === id) {
                setSelectedProduct(null);
            }
        }
    };

    // Handle input changes in edit form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setEditProduct(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) :
                type === 'checkbox' ? (e.target as HTMLInputElement).checked :
                    value
        }));
    };

    // Handle image upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setImagePreview(result);
            setEditProduct(prev => ({
                ...prev,
                imageUrl: result
            }));
        };
        reader.readAsDataURL(file);
    };

    // Handle discount changes
    const handleDiscountChange = (field: 'type' | 'amount', value: string | number) => {
        setEditProduct((prev: Partial<Product> | null): Partial<Product> | null => {
            if (!prev) return null;

            const updatedValue = field === 'amount' ? Number(value) : value;

            // If no existing discount and we're setting type, create new discount
            if (!prev.discount && field === 'type') {
                return {
                    ...prev,
                    discount: {
                        type: value as 'percentage' | 'fixed',
                        amount: 0 // Default amount
                    }
                };
            }

            // If existing discount, update the field
            if (prev.discount) {
                return {
                    ...prev,
                    discount: {
                        ...prev.discount,
                        [field]: updatedValue
                    }
                };
            }

            // Otherwise return unchanged
            return prev;
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Products</h1>
                <button
                    onClick={handleStartAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                    <FiPlus className="mr-2" /> Add Product
                </button>
            </div>

            {products.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FiPackage className="text-gray-400 text-3xl" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No products yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding your first product</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div 
                            key={product.id} 
                            className="relative group cursor-pointer transition-transform hover:scale-105"
                            onClick={() => handleViewProduct(product)}
                        >
                            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity"></div>
                            <ProductCard product={product} />
                            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleStartEdit(product);
                                    }}
                                    className="bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-50"
                                    title="Edit product"
                                >
                                    <FiEdit2 size={16} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteProduct(product.id);
                                    }}
                                    className="bg-white p-2 rounded-full shadow-md text-red-600 hover:bg-red-50"
                                    title="Delete product"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mb-4">
                            <nav className="-mb-px flex space-x-8">
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className={`${activeTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Product Details
                                </button>
                                <button
                                    onClick={() => setActiveTab('analytics')}
                                    className={`${activeTab === 'analytics' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                                >
                                    <FiTrendingUp className="mr-1" /> Analytics
                                </button>
                            </nav>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative pb-[100%] rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src={selectedProduct.imageUrl}
                                    alt={selectedProduct.name}
                                    className="absolute h-full w-full object-cover"
                                />
                            </div>
                            
                            {activeTab === 'details' ? (
                                <div>
                                    <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                                    <p className="text-lg font-bold mb-4">
                                        ${selectedProduct.price.toFixed(2)}
                                        {selectedProduct.discount && (
                                            <span className="ml-2 text-sm text-red-500">
                                                {selectedProduct.discount.type === 'percentage'
                                                    ? `(${selectedProduct.discount.amount}% off)`
                                                    : `($${selectedProduct.discount.amount} off)`}
                                            </span>
                                        )}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm capitalize">
                                            {selectedProduct.category}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-sm ${selectedProduct.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : 'Out of stock'}
                                        </span>
                                        {selectedProduct.isFeatured && (
                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center">
                                                <FiStar className="mr-1" /> Featured
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => {
                                            handleStartEdit(selectedProduct);
                                            setSelectedProduct(null);
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                                    >
                                        <FiEdit2 className="mr-2" /> Edit Product
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="font-medium mb-4 text-lg">Sales Analytics</h3>
                                    {(() => {
                                        const salesData = getProductSalesData(selectedProduct.id);
                                        return (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-blue-50 p-3 rounded-lg">
                                                        <div className="text-sm text-blue-600">Total Sales</div>
                                                        <div className="text-2xl font-bold">{salesData.totalSales}</div>
                                                    </div>
                                                    <div className="bg-green-50 p-3 rounded-lg">
                                                        <div className="text-sm text-green-600">Last Month</div>
                                                        <div className="text-2xl font-bold">{salesData.lastMonthSales}</div>
                                                    </div>
                                                </div>

                                                <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                    <h4 className="font-medium mb-2 flex items-center">
                                                        <FiBarChart2 className="mr-2" /> Monthly Sales Trend
                                                    </h4>
                                                    <div className="h-40 flex items-end space-x-2">
                                                        {salesData.monthlySales.map((month, index) => (
                                                            <div key={index} className="flex-1 flex flex-col items-center">
                                                                <div 
                                                                    className="w-full bg-blue-200 rounded-t-sm"
                                                                    style={{ height: `${(month.sales / Math.max(...salesData.monthlySales.map(m => m.sales)) * 100)}%` }}
                                                                ></div>
                                                                <div className="text-xs mt-1 text-gray-500">{month.month}</div>
                                                                <div className="text-xs font-medium">{month.sales}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="bg-purple-50 p-3 rounded-lg">
                                                    <div className="text-sm text-purple-600">Total Revenue</div>
                                                    <div className="text-2xl font-bold">${salesData.revenue.toFixed(2)}</div>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Edit/Add Product Modal */}
            {isEditing && editProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-bold">
                                {isEditing && editProduct.id ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button
                                onClick={handleCancelEdit}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                                <div className="flex items-center">
                                    <label className="cursor-pointer">
                                        <div className="flex items-center justify-center h-32 w-32 rounded-md border-2 border-dashed border-gray-300 overflow-hidden">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="text-center p-4">
                                                    <FiImage className="mx-auto h-8 w-8 text-gray-400" />
                                                    <span className="mt-2 block text-sm text-gray-600">
                                                        Click to upload
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="sr-only"
                                        />
                                    </label>
                                    <div className="ml-4 text-sm text-gray-500">
                                        <p>Upload a product image</p>
                                        <p className="text-xs">Recommended size: 800x800px</p>
                                    </div>
                                </div>
                            </div>

                            {/* Product Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Product Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editProduct.name || ''}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={editProduct.description || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={editProduct.category || 'supplements'}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="supplements">Supplements</option>
                                        <option value="equipment">Equipment</option>
                                        <option value="clothing">Clothing</option>
                                        <option value="membership">Membership</option>
                                    </select>
                                </div>

                                {/* Price */}
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Price ($) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        min="0"
                                        step="0.01"
                                        value={editProduct.price || 0}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Stock */}
                                <div>
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                                        Stock Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id="stock"
                                        name="stock"
                                        min="0"
                                        value={editProduct.stock || 0}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Featured */}
                            <div className="flex items-center">
                                <input
                                    id="isFeatured"
                                    name="isFeatured"
                                    type="checkbox"
                                    checked={editProduct.isFeatured || false}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
                                    Feature this product
                                </label>
                            </div>

                            {/* Discount Section */}
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Discount Options</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">
                                            Discount Type
                                        </label>
                                        <select
                                            id="discountType"
                                            name="discountType"
                                            value={editProduct.discount?.type || ''}
                                            onChange={(e) => handleDiscountChange('type', e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">No discount</option>
                                            <option value="percentage">Percentage</option>
                                            <option value="fixed">Fixed amount</option>
                                        </select>
                                    </div>

                                    {editProduct.discount?.type && (
                                        <div>
                                            <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-700">
                                                Discount Amount
                                            </label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                {editProduct.discount.type === 'percentage' && (
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm">%</span>
                                                    </div>
                                                )}
                                                {editProduct.discount.type === 'fixed' && (
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FiDollarSign className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                )}
                                                <input
                                                    type="number"
                                                    id="discountAmount"
                                                    name="discountAmount"
                                                    min="0"
                                                    step={editProduct.discount.type === 'percentage' ? '1' : '0.01'}
                                                    value={editProduct.discount?.amount || 0}
                                                    onChange={(e) => handleDiscountChange('amount', e.target.value)}
                                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleSaveProduct}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                                >
                                    <FiSave className="mr-2" /> Save Product
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;