import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Heart } from 'lucide-react';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/UserAtom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleGetStarted = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const [user, setUser] = useRecoilState(userAtom);
  const handleLogout = async () => {
    try {
      const res = await fetch(
        "/api/user/logout",
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check if user is male to hide Women's Health section
  const shouldShowWomensHealth = !user || user.gender !== 'male';

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FitFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/workouts" 
              className={`transition-colors ${
                isActive('/workouts') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Workouts
            </Link>
            <Link 
              to="/nutrition" 
              className={`transition-colors ${
                isActive('/nutrition') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Nutrition
            </Link>
            <Link 
              to="/tracking" 
              className={`transition-colors ${
                isActive('/tracking') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Tracking
            </Link>
            {user && (
              <Link 
                to="/calories" 
                className={`transition-colors ${
                  isActive('/calories') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Calories
              </Link>
            )}
            {shouldShowWomensHealth && (
              <Link 
                to="/womens-health" 
                className={`transition-colors ${
                  isActive('/womens-health') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Women's Health
              </Link>
            )}
            <Link 
              to="/shop" 
              className={`transition-colors ${
                isActive('/shop') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Shop
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/shop" className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </Link>
            
            {user ? (
              <>
                <Link to="/profile" className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <User className="w-5 h-5" />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-purple-600 px-4 py-2 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/workouts" 
                className={`transition-colors ${
                  isActive('/workouts') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Workouts
              </Link>
              <Link 
                to="/nutrition" 
                className={`transition-colors ${
                  isActive('/nutrition') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Nutrition
              </Link>
              <Link 
                to="/tracking" 
                className={`transition-colors ${
                  isActive('/tracking') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tracking
              </Link>
              {user && (
                <Link 
                  to="/calories" 
                  className={`transition-colors ${
                    isActive('/calories') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Calories
                </Link>
              )}
              {shouldShowWomensHealth && (
                <Link 
                  to="/womens-health" 
                  className={`transition-colors ${
                    isActive('/womens-health') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Women's Health
                </Link>
              )}
              <Link 
                to="/shop" 
                className={`transition-colors ${
                  isActive('/shop') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <div className="flex items-center space-x-4 pt-4">
                <Link to="/shop" className="flex items-center space-x-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart (3)</span>
                </Link>
                
                {user ? (
                  <>
                    <Link 
                      to="/account" 
                      className="flex items-center space-x-2 text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Account</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-purple-600 px-4 py-2 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleGetStarted}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;