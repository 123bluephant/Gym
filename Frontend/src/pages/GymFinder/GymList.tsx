import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gym, Location } from '../../types/gym';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Star, Filter, Grid3X3, Map, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import MapView from './MapView';

// Mock data - in a real app you would fetch this from an API
const mockGyms: Gym[] = [
  {
    id: '1',
    name: 'Power Fitness Center',
    address: '123 Main St, New York, NY',
    distance: 0.5,
    rating: 4.5,
    open_now: true,
    photo_url: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800',
    equipment: ['Weights', 'Cardio', 'Pool', 'Yoga'],
    hours: '6:00 AM - 10:00 PM',
    description: 'A full-service fitness center with state-of-the-art equipment and a variety of classes for all fitness levels.',
    membership_plans: [
      { name: 'Basic', price: 29.99, features: ['Gym access', 'Locker room'] },
      { name: 'Premium', price: 49.99, features: ['Gym access', 'All classes', 'Pool', 'Sauna'] },
      { name: 'Annual', price: 499.99, features: ['All premium features', '1 free personal training session', '10% discount on merchandise'] }
    ],
    amenities: ['Free Wi-Fi', 'Locker rooms', 'Showers', 'Towel service'],
    contact: { phone: '(212) 555-1234', email: 'info@powerfitness.com' }
  },
  {
    id: '2',
    name: 'Iron Paradise Gym',
    address: '456 Broadway, New York, NY',
    distance: 1.2,
    rating: 4.2,
    open_now: true,
    photo_url: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
    equipment: ['Weights', 'Crossfit', 'Sauna'],
    hours: '5:00 AM - 11:00 PM',
    description: 'A hardcore gym for serious lifters with top-notch equipment and a no-frills approach to fitness.',
    membership_plans: [
      { name: 'Monthly', price: 39.99, features: ['Gym access', 'Locker room'] },
      { name: '6 Months', price: 199.99, features: ['Gym access', 'Crossfit classes'] },
      { name: 'Annual', price: 349.99, features: ['All features', '2 free personal training sessions'] }
    ],
    amenities: ['Locker rooms', 'Showers', 'Supplement shop'],
    contact: { phone: '(212) 555-5678', email: 'info@ironparadise.com' }
  },
  {
    id: '3',
    name: 'Zen Yoga & Fitness',
    address: '789 Park Ave, New York, NY',
    distance: 2.1,
    rating: 4.7,
    open_now: false,
    photo_url: 'https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg?auto=compress&cs=tinysrgb&w=800',
    equipment: ['Yoga', 'Pilates', 'Meditation'],
    hours: '7:00 AM - 9:00 PM',
    description: 'A peaceful sanctuary offering yoga, meditation, and holistic wellness programs in a serene environment.',
    membership_plans: [
      { name: 'Drop-in', price: 20.00, features: ['Single class'] },
      { name: 'Monthly Unlimited', price: 89.99, features: ['Unlimited classes', 'Meditation sessions'] },
      { name: 'Annual', price: 899.99, features: ['Unlimited classes', '2 private sessions', 'Wellness workshops'] }
    ],
    amenities: ['Changing rooms', 'Showers', 'Tea lounge', 'Retail shop'],
    contact: { phone: '(212) 555-9012', email: 'info@zenyoga.com' }
  },
];

const GymList = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'open'>('all');
  const [activeTab, setActiveTab] = useState<'gyms' | 'map'>('gyms');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
            },
            () => {
              setLocationError('Unable to retrieve your location. Using default location.');
              setUserLocation({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
            }
          );
        } else {
          setLocationError('Geolocation is not supported by your browser. Using default location.');
          setUserLocation({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
        }
      } catch (err) {
        setLocationError('Error getting location. Using default location.');
        setUserLocation({ lat: 40.7128, lng: -74.0060 });
      }
    };
    getLocation();
  }, []);

  useEffect(() => {
    const loadGyms = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/gym/getAllgyms');
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch gyms');
        }
        setGyms(data.gyms);
        setError(null);
      } catch (err) {
        setError('Failed to load gyms. Please try again later.');
        setGyms([]);
      } finally {
        setLoading(false);
      }
    };

    loadGyms();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    
    setGyms(filtered);
    setIsSearching(false);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilter('all');
  };

  const filteredGyms = filter === 'open'
    ? gyms.filter(gym => gym.open_now)
    : gyms;
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header with Search */}
      <header className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg py-12 md:py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/10 rounded-full"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                top: `${i * 20}%`,
                left: `${i * 15}%`,
              }}
              animate={{
                x: [0, 30 * (i + 1), 0],
                y: [0, -20 * (i + 1), 0],
                scale: [1, 1.1 + i * 0.1, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4"
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              Find Your Perfect Gym
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Discover fitness centers tailored to your needs and goals
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 sm:py-4 rounded-lg border-0 shadow-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500 text-gray-900 placeholder-gray-500 transition-all duration-200"
                placeholder="Search by gym name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <motion.button
                type="submit"
                className="absolute right-1.5 top-1.5 inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSearching}
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Search'
                )}
              </motion.button>
            </form>
          </motion.div>

          {userLocation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 flex justify-center"
            >
              <div className="inline-flex items-center bg-white/20 px-3 py-1.5 rounded-full text-sm shadow-md backdrop-blur-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Searching near: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</span>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:-mt-8">
        {/* View Toggle and Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* View Toggle */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <motion.button
                onClick={() => setActiveTab('gyms')}
                className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${activeTab === 'gyms' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600 hover:text-gray-800'
                  }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                List View
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('map')}
                className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${activeTab === 'map' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600 hover:text-gray-800'
                  }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Map className="h-4 w-4 mr-2" />
                Map View
              </motion.button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Filter:</span>
              <motion.button
                onClick={() => setFilter('all')}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${filter === 'all'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                All Gyms
              </motion.button>
              <motion.button
                onClick={() => setFilter('open')}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${filter === 'open'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Open Now
              </motion.button>
            </div>
          </div>

          {locationError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-yellow-700 text-sm bg-yellow-50 p-2 sm:p-3 rounded-md border border-yellow-100 flex items-start"
            >
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{locationError}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Loading and error states */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-12 sm:py-20"
          >
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="h-16 w-16 rounded-full border-4 border-indigo-500 border-t-transparent"></div>
              </motion.div>
              <motion.p
                className="mt-4 text-gray-600 font-medium"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Finding the best gyms near you...
              </motion.p>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-lg shadow-sm"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading gyms</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <motion.button
                  onClick={() => window.location.reload()}
                  className="mt-2 inline-flex items-center text-sm font-medium text-red-700 hover:text-red-600"
                  whileHover={{ x: 2 }}
                >
                  Try again <RefreshCw className="h-4 w-4 ml-1" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gym listings */}
        {!loading && !error && activeTab === 'gyms' && (
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            <AnimatePresence>
              {filteredGyms.length > 0 ? (
                filteredGyms.map((gym: any) => (
                  <motion.div
                    key={gym?._id}
                    layout
                    variants={itemVariants}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-lg group"
                  >
                    <Link to={`/Finder/${gym._id}`} className="block">
                      {gym.gymImg && (
                        <div className="h-48 sm:h-56 overflow-hidden relative">
                          <motion.img
                            className="w-full h-full object-cover"
                            src={gym.gymImg[1]}
                            alt={gym.gymName}
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                          {console.log('Gym image:', gym)}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 left-0 p-4 text-white">
                            <h2 className="text-xl font-bold">{gym.gymName}</h2>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-300 fill-current" />
                              <span className="ml-1 text-sm">{gym.rating} ({Math.floor(gym.rating * 20)})</span>
                            </div>
                          </div>
                          {/* <motion.span 
                            className={`absolute top-3 right-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
                              gym.open_now ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {gym.open_now ? 'Open Now' : 'Closed'}
                          </motion.span> */}
                          {/* <span className="absolute top-3 left-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/70 text-white shadow-sm">
                            {gym.distance.toFixed(1)} miles
                          </span> */}
                        </div>
                      )}
                      <div className="p-4 sm:p-5">
                        <div className="text-gray-600 space-y-2">
                          <p className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{gym.location}</span>
                          </p>
                          <p className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                            {gym.hours}
                          </p>
                        </div>
                        {gym.equipment && gym.equipment.length > 0 && (
                          <div className="mt-3 sm:mt-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Facilities:</h3>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              {gym.equipment.slice(0, 4).map((item) => (
                                <motion.span
                                  key={item}
                                  className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {item}
                                </motion.span>
                              ))}
                              {gym.equipment.length > 4 && (
                                <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  +{gym.equipment.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        <motion.div
                          className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 group-hover:shadow-md"
                          whileHover={{ scale: 1.02 }}
                        >
                          View Details
                          <svg className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="col-span-full text-center py-12 sm:py-16"
                >
                  <div className="max-w-md mx-auto">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                    </motion.div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No gyms found</h3>
                    <p className="mt-2 text-gray-600">
                      We couldn't find any gyms matching your search criteria. Try adjusting your filters.
                    </p>
                    <motion.button
                      onClick={resetFilters}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Reset Filters
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Map View */}
        {!loading && !error && activeTab === 'map' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Gyms Near You</h2>
              <p className="text-gray-600">
                Explore {filteredGyms.length} gym{filteredGyms.length !== 1 ? 's' : ''} on the map
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl overflow-hidden shadow-lg border border-gray-200 h-96 sm:h-[500px]"
            >
              <MapView gyms={filteredGyms} userLocation={userLocation} />
            </motion.div>

            {/* Gym list below map for reference */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Locations</h3>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filteredGyms.map((gym) => (
                  <motion.div
                    key={gym.id}
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                  >
                    <Link
                      to={`/Finder/${gym.id}`}
                      className="block bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        {gym.photo_url && (
                          <motion.img
                            src={gym.photo_url}
                            alt={gym.name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            whileHover={{ scale: 1.05 }}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{gym.name}</h4>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-gray-600">{gym.rating}</span>
                            <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${gym.open_now ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                              {gym.open_now ? 'Open' : 'Closed'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 truncate">{gym.address}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default GymList;