import { Link } from 'react-router-dom';
import { ShoppingCart, X, ChevronLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-hot-toast';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, cartItemsCount } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const handleIncreaseQuantity = (productId: number) => {
    const product = cartItems.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      toast.success(`Added another ${product.name}`);
    }
  };

  const handleDecreaseQuantity = (productId: number) => {
    const product = cartItems.find(item => item.id === productId);
    if (product) {
      if (product.quantity > 1) {
        // Create a new item with quantity reduced by 1
        addToCart({ ...product, quantity: product.quantity - 1 });
        toast.success(`Removed one ${product.name}`);
      } else {
        removeFromCart(productId);
        toast.success(`${product.name} removed from cart`);
      }
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link 
            to="/shop" 
            className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold ml-8">Your Cart ({cartItemsCount})</h1>
        </div>

        {cartItemsCount === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
            <Link
              to="/shop"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {cartItems.map((product) => (
                  <div key={product.id} className="p-6 border-b border-gray-100 last:border-b-0">
                    <div className="flex">
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="ml-6 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                            <p className="text-gray-600 text-sm mt-1">{product.category}</p>
                          </div>
                          <button
                            onClick={() => {
                              removeFromCart(product.id);
                              toast.success(`${product.name} removed from cart`);
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => handleDecreaseQuantity(product.id)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              -
                            </button>
                            <span className="px-3">{product.quantity}</span>
                            <button
                              onClick={() => handleIncreaseQuantity(product.id)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-semibold">
                              ${(product.price * product.quantity).toFixed(2)}
                            </span>
                            {product.quantity > 1 && (
                              <p className="text-sm text-gray-500">
                                ${product.price.toFixed(2)} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-4">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItemsCount} items)</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;