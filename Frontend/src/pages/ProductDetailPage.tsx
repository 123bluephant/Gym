import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Share2, ChevronLeft, Truck, Shield, RotateCcw, Plus, Minus } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Mock product data - in a real app, this would be fetched based on the ID
  const product = {
    id: 1,
    name: 'Premium Yoga Mat',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviews: 234,
    inStock: true,
    description: 'Experience the ultimate in yoga comfort and performance with our Premium Yoga Mat. Crafted from eco-friendly materials, this mat provides superior grip, cushioning, and durability for all your yoga practices.',
    features: [
      'Non-slip surface with superior grip',
      'Eco-friendly TPE material',
      '6mm thickness for optimal cushioning',
      'Lightweight and portable design',
      'Easy to clean and maintain',
      'Free carrying strap included'
    ],
    specifications: {
      'Material': 'TPE (Thermoplastic Elastomer)',
      'Dimensions': '72" x 24" x 6mm',
      'Weight': '2.5 lbs',
      'Care': 'Wipe clean with damp cloth',
      'Warranty': '1 year manufacturer warranty'
    },
    images: [
      'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: [
      { name: 'Purple', value: '#8B5CF6' },
      { name: 'Blue', value: '#3B82F6' },
      { name: 'Green', value: '#10B981' },
      { name: 'Pink', value: '#EC4899' }
    ],
    sizes: ['Standard'],
    category: 'Equipment'
  };

  const reviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      date: '2024-03-10',
      comment: 'Amazing quality! The grip is fantastic and it\'s so comfortable for long yoga sessions.',
      verified: true
    },
    {
      id: 2,
      name: 'Mike R.',
      rating: 4,
      date: '2024-03-08',
      comment: 'Great mat, very durable. The thickness is perfect for my knees during floor poses.',
      verified: true
    },
    {
      id: 3,
      name: 'Emma L.',
      rating: 5,
      date: '2024-03-05',
      comment: 'Love the eco-friendly material. Easy to clean and the carrying strap is very convenient.',
      verified: true
    }
  ];

  const relatedProducts = [
    {
      id: 2,
      name: 'Yoga Blocks Set',
      price: 24.99,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Yoga Strap',
      price: 15.99,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'Meditation Cushion',
      price: 39.99,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', { productId: product.id, quantity, selectedSize, selectedColor });
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/shop" className="text-purple-600 hover:text-purple-700 transition-colors">
              Shop
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.category}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
          <Link 
            to="/shop" 
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors mt-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-purple-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-colors ${
                        selectedColor === color.name ? 'border-gray-900' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
                <div className="flex space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                        selectedSize === size 
                          ? 'border-purple-500 bg-purple-50 text-purple-700' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
              </button>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </button>
                <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Free shipping on orders over $75</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">1-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8">
                <button className="py-4 border-b-2 border-purple-500 text-purple-600 font-medium">
                  Features
                </button>
                <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
                  Specifications
                </button>
                <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
                  Reviews ({product.reviews})
                </button>
              </nav>
            </div>
            
            <div className="p-8">
              {/* Features Tab */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Product Features</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Customer Reviews</h3>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-900">{review.name}</span>
                      {review.verified && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < review.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link 
                key={relatedProduct.id}
                to={`/shop/${relatedProduct.id}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
              >
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-gray-900">${relatedProduct.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;