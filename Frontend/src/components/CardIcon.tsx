// src/components/CartIcon.tsx
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { cartItemsCount } = useCart();
  
  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="w-6 h-6" />
      {cartItemsCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartItemsCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;