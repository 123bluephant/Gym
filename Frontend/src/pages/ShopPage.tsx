import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Filter, Search, Heart, Eye, Grid, List, ChevronDown, ChevronUp, X } from 'lucide-react';
interface ShopPageProps {
  isLoggedIn?: boolean;
}

const ShopPage: React.FC<ShopPageProps> = ({ isLoggedIn = false }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'All Products', count: 156 },
    { id: 'equipment', name: 'Equipment', count: 45 },
    { id: 'clothing', name: 'Clothing', count: 67 },
    { id: 'supplements', name: 'Supplements', count: 23 },
    { id: 'accessories', name: 'Accessories', count: 21 }
  ];

  const products = [
    {
      id: 1,
      name: 'Premium Yoga Mat',
      category: 'equipment',
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400',
      isNew: false,
      onSale: true,
      description: 'Non-slip, eco-friendly yoga mat with superior grip and cushioning.',
      features: ['6mm thickness', 'Non-toxic materials', 'Carrying strap included'],
      colors: ['#4F46E5', '#10B981', '#F59E0B']
    },
    {
      id: 2,
      name: 'Athletic Leggings Set',
      category: 'clothing',
      price: 45.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400',
      isNew: true,
      onSale: false,
      description: 'High-waisted leggings with moisture-wicking fabric and side pockets.',
      features: ['Squat-proof', 'Quick-dry fabric', 'Side pockets'],
      colors: ['#000000', '#6B7280', '#EC4899']
    },
    {
      id: 3,
      name: 'Whey Protein Powder',
      category: 'supplements',
      price: 54.99,
      originalPrice: 69.99,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400',
      isNew: false,
      onSale: true,
      description: 'Premium whey protein isolate with 25g protein per serving.',
      features: ['25g protein', 'Low carb', 'Multiple flavors'],
      colors: ['#F97316', '#3B82F6', '#8B5CF6']
    },
    {
      id: 4,
      name: 'Adjustable Dumbbells',
      category: 'equipment',
      price: 299.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 67,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400',
      isNew: false,
      onSale: false,
      description: 'Space-saving adjustable dumbbells with quick-change weight system.',
      features: ['5-50 lbs per dumbbell', 'Quick adjustment', 'Compact design'],
      colors: ['#6B7280', '#111827']
    },
    {
      id: 5,
      name: 'Smart Water Bottle',
      category: 'accessories',
      price: 39.99,
      originalPrice: 49.99,
      rating: 4.6,
      reviews: 198,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400',
      isNew: true,
      onSale: true,
      description: 'Smart water bottle that tracks hydration and reminds you to drink.',
      features: ['Hydration tracking', 'App connectivity', 'Temperature display'],
      colors: ['#3B82F6', '#10B981', '#EF4444']
    },
    {
      id: 6,
      name: 'Performance Sports Bra',
      category: 'clothing',
      price: 32.99,
      originalPrice: null,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400',
      isNew: true,
      onSale: false,
      description: 'Medium support sports bra with removable padding and mesh panels.',
      features: ['Medium support', 'Removable padding', 'Breathable mesh'],
      colors: ['#EC4899', '#000000', '#F59E0B']
    },
    {
      id: 7,
      name: 'Resistance Band Set',
      category: 'equipment',
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.5,
      reviews: 312,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400',
      isNew: false,
      onSale: true,
      description: 'Complete resistance band set with multiple resistance levels.',
      features: ['5 resistance levels', 'Door anchor included', 'Exercise guide'],
      colors: ['#8B5CF6', '#EC4899', '#10B981']
    },
    {
      id: 8,
      name: 'Pre-Workout Supplement',
      category: 'supplements',
      price: 29.99,
      originalPrice: null,
      rating: 4.4,
      reviews: 156,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400',
      isNew: false,
      onSale: false,
      description: 'Clean energy pre-workout with natural caffeine and amino acids.',
      features: ['Natural caffeine', 'No artificial colors', 'Great taste'],
      colors: ['#F59E0B', '#EF4444', '#3B82F6']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return b.reviews - a.reviews;
    }
  });

  const toggleCart = (productId: number) => {
    setCartItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setPriceRange([0, 500]);
    setSearchQuery('');
    setSortBy('popularity');
  };

  return (
    <div className={`${isLoggedIn ? '' : 'pt-16'} min-h-screen bg-gray-50`}>
      {/* Hero Section */}
      <section className={`bg-gradient-to-br from-purple-600 to-pink-600 text-white ${isLoggedIn ? 'py-12' : 'py-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`${isLoggedIn ? 'text-4xl' : 'text-5xl'} font-bold mb-6`}>Fitness Shop</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Everything you need for your fitness journey. Premium equipment, stylish activewear, 
              and performance supplements - all in one place.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filters Button */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            {showMobileFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Mobile */}
          {showMobileFilters && (
            <div className="lg:hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        activeCategory === category.id
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">${priceRange[0]}</span>
                    <span className="text-sm text-gray-600">${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sort By</h3>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              <button 
                onClick={clearFilters}
                className="w-full py-2 text-purple-600 font-medium hover:text-purple-700"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block lg:w-64 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    >
                    <span>{category.name}</span>
                    <span className="text-sm text-gray-500">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">${priceRange[0]}</span>
                  <span className="text-sm text-gray-600">${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Featured Collections */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Collections</h3>
              <div className="space-y-3">
                <Link 
                  to="/shop/new-arrivals" 
                  className="block bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  <h4 className="font-semibold mb-1">New Arrivals</h4>
                  <p className="text-sm text-purple-100">Latest fitness gear</p>
                </Link>
                <Link 
                  to="/shop/best-sellers" 
                  className="block bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg p-4 text-white hover:from-blue-600 hover:to-teal-600 transition-colors"
                >
                  <h4 className="font-semibold mb-1">Best Sellers</h4>
                  <p className="text-sm text-blue-100">Most popular items</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{sortedProducts.length} products found</span>
                  <div className="hidden lg:flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="popularity">Sort by Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <button 
                    className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                  >
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(activeCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < 500 || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeCategory !== 'all' && (
                  <div className="flex items-center bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                    {categories.find(c => c.id === activeCategory)?.name}
                    <button 
                      onClick={() => setActiveCategory('all')}
                      className="ml-2 text-purple-500 hover:text-purple-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 500) && (
                  <div className="flex items-center bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                    ${priceRange[0]} - ${priceRange[1]}
                    <button 
                      onClick={() => setPriceRange([0, 500])}
                      className="ml-2 text-purple-500 hover:text-purple-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {searchQuery && (
                  <div className="flex items-center bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                    Search: "{searchQuery}"
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="ml-2 text-purple-500 hover:text-purple-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <button 
                  onClick={clearFilters}
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products Grid/List */}
            {sortedProducts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-6"
              }>
                {sortedProducts.map((product) => (
                  <div key={product.id} className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                  }`}>
                    <div className={`relative ${viewMode === 'list' ? 'md:w-64 flex-shrink-0' : ''}`}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === 'list' ? 'w-full h-64 md:h-full' : 'w-full h-64'
                        }`}
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            New
                          </span>
                        )}
                        {product.onSale && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Sale
                          </span>
                        )}
                      </div>

                      {/* Color Options */}
                      {viewMode === 'grid' && product.colors && (
                        <div className="absolute bottom-3 left-3 flex gap-2">
                          {product.colors.map((color, index) => (
                            <div 
                              key={index}
                              className="w-4 h-4 rounded-full border border-white shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            wishlist.includes(product.id)
                              ? 'bg-red-100 text-red-500'
                              : 'bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600'
                          }`}
                        >
                          <Heart 
                            className={`w-5 h-5 ${
                              wishlist.includes(product.id) ? 'fill-current' : ''
                            }`} 
                          />
                        </button>
                        <Link 
                          to={`/shop/${product.id}`}
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Eye className="w-5 h-5 text-gray-600" />
                        </Link>
                      </div>
                    </div>
                    
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {product.name}
                        </h3>
                        {wishlist.includes(product.id) && viewMode === 'list' && (
                          <Heart 
                            className="w-5 h-5 text-red-500 fill-current" 
                          />
                        )}
                      </div>
                      
                      {viewMode === 'list' && (
                        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                      )}
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        {product.onSale && product.originalPrice && (
                          <span className="text-sm font-medium text-red-600">
                            Save ${(product.originalPrice - product.price).toFixed(2)}
                          </span>
                        )}
                      </div>

                      {viewMode === 'list' && (
                        <>
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {product.features.map((feature, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {product.colors && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Colors:</h4>
                              <div className="flex space-x-2">
                                {product.colors.map((color, index) => (
                                  <div 
                                    key={index}
                                    className="w-6 h-6 rounded-full border border-gray-200 shadow-sm"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      
                      <button 
                        onClick={() => toggleCart(product.id)}
                        className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                          cartItems.includes(product.id)
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-gray-50 text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>{cartItems.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={clearFilters}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Load More */}
            {sortedProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;