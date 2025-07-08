import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { Gym, Location } from '../types/gym';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data - in a real app you would fetch this from an API
const mockGyms: Gym[] = [
  {
    id: '1',
    name: 'Power Fitness Center',
    address: '123 Main St, New York, NY',
    distance: 0.5,
    rating: 4.5,
    open_now: true,
    photo_url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
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
    photo_url: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb',
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
    photo_url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597',
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

const GymFinder = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'open'>('all');
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'gyms' | 'map'>('gyms');

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (err) => {
          setLocationError('Unable to retrieve your location. Using default location.');
          setUserLocation({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
          setLoading(false);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser. Using default location.');
      setUserLocation({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
    }
  }, []);

  // Load gyms - in a real app, this would be an API call
  useEffect(() => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setGyms(mockGyms);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to load gyms. Please try again later.');
      setLoading(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = mockGyms.filter(gym =>
      gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setGyms(filtered);
  };

  const handleGymClick = (gym: Gym) => {
    setSelectedGym(gym);
    setShowModal(true);
  };

  const filteredGyms = filter === 'open'
    ? gyms.filter(gym => gym.open_now)
    : gyms;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header with Search */}
      <header className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Gym</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Discover fitness centers tailored to your needs and goals
            </p>
          </motion.div>
          
          {/* Search Bar in Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 rounded-lg border-0 shadow-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500 text-gray-900"
                placeholder="Search by gym name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Search
              </button>
            </form>
          </motion.div>

          {userLocation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex justify-center"
            >
              <div className="inline-flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm shadow-md backdrop-blur-sm">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Searching near: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</span>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        {/* View Toggle and Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-xl p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* View Toggle */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab('gyms')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                  activeTab === 'gyms' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <svg className={`h-5 w-5 mr-2 ${activeTab === 'gyms' ? 'text-indigo-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                List View
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                  activeTab === 'map' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <svg className={`h-5 w-5 mr-2 ${activeTab === 'map' ? 'text-indigo-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Map View
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                  filter === 'all'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <svg className={`h-4 w-4 mr-1 ${filter === 'all' ? 'text-white' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                All Gyms
              </button>
              <button
                onClick={() => setFilter('open')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                  filter === 'open'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <svg className={`h-4 w-4 mr-1 ${filter === 'open' ? 'text-white' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Open Now
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200 flex items-center">
                <svg className="h-4 w-4 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                More Filters
              </button>
            </div>
          </div>

          {locationError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-yellow-700 text-sm bg-yellow-50 p-3 rounded-md border border-yellow-100 flex items-start"
            >
              <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{locationError}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Loading and error states */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 animate-pulse"></div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Finding the best gyms near you...</p>
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
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading gyms</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
                >
                  Try again →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gym listings */}
        {!loading && !error && activeTab === 'gyms' && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredGyms.length > 0 ? (
                filteredGyms.map((gym) => (
                  <motion.div
                    key={gym.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer border border-gray-100 transition-all duration-200 hover:shadow-xl group"
                    onClick={() => handleGymClick(gym)}
                  >
                    {gym.photo_url && (
                      <div className="h-48 overflow-hidden relative">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={gym.photo_url}
                          alt={gym.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <h2 className="text-xl font-bold">{gym.name}</h2>
                          <div className="flex items-center mt-1">
                            <svg className="h-4 w-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-sm">{gym.rating} ({Math.floor(gym.rating * 20)})</span>
                          </div>
                        </div>
                        <span className={`absolute top-3 right-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shadow-sm ${
                          gym.open_now ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {gym.open_now ? 'Open Now' : 'Closed'}
                        </span>
                        <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-black/70 text-white shadow-sm">
                          {gym.distance.toFixed(1)} miles
                        </span>
                      </div>
                    )}
                    <div className="p-5">
                      <div className="text-gray-600 space-y-2">
                        <p className="flex items-center text-sm">
                          <svg className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{gym.address}</span>
                        </p>
                        <p className="flex items-center text-sm">
                          <svg className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {gym.hours}
                        </p>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Facilities:</h3>
                        <div className="flex flex-wrap gap-2">
                          {gym.equipment.slice(0, 4).map((item) => (
                            <span key={item} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {item}
                            </span>
                          ))}
                          {gym.equipment.length > 4 && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              +{gym.equipment.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 group-hover:shadow-md">
                        View Details
                        <svg className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="max-w-md mx-auto">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No gyms found</h3>
                    <p className="mt-2 text-gray-600">
                      We couldn't find any gyms matching your search criteria. Try adjusting your filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilter('all');
                        setGyms(mockGyms);
                      }}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Map View (Placeholder) */}
        {!loading && !error && activeTab === 'map' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 h-96"
          >
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
              <div className="text-center p-6">
                <svg className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Map View</h3>
                <p className="mt-1 text-gray-600">Interactive map showing gym locations would appear here.</p>
                <button 
                  onClick={() => setActiveTab('gyms')}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Switch to List View
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Register Gym CTA Section */}
      <section className="bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-white/20"
          >
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-4">Own a Gym? Join Our Platform!</h2>
                <p className="text-lg text-indigo-100 max-w-2xl">
                  List your gym on our platform and reach thousands of fitness enthusiasts in your area. 
                  Get more visibility, manage memberships, and grow your business.
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-indigo-100">Increase visibility</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-indigo-100">Manage memberships</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-indigo-100">Verified badge</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 md:mt-0 md:w-1/3 md:flex md:justify-end">
                <button
                  className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-indigo-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 hover:scale-[1.02]"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Register Your Gym
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gym Detail Modal */}
      <AnimatePresence>
        {showModal && selectedGym && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-900/75 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
              </motion.div>

              {/* Modal content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="inline-block align-bottom bg-white rounded-t-2xl rounded-b-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl leading-6 font-bold text-gray-900" id="modal-headline">
                            {selectedGym.name}
                          </h3>
                          <div className="mt-1 flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-5 w-5 ${i < Math.floor(selectedGym.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-1 text-gray-600">
                              {selectedGym.rating} ({Math.floor(selectedGym.rating * 20)} reviews)
                            </span>
                            <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedGym.open_now ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                              {selectedGym.open_now ? 'Open Now' : 'Closed'}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="sr-only">Close</span>
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          {selectedGym.photo_url && (
                            <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-md">
                              <img
                                className="w-full h-full object-cover"
                                src={selectedGym.photo_url}
                                alt={selectedGym.name}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                            </div>
                          )}

                          <div className="mt-6">
                            <h4 className="text-lg font-medium text-gray-900">Description</h4>
                            <p className="mt-2 text-gray-600">{selectedGym.description}</p>
                          </div>

                          <div className="mt-6">
                            <h4 className="text-lg font-medium text-gray-900">Hours</h4>
                            <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-600">{selectedGym.hours}</p>
                            </div>
                          </div>

                          <div className="mt-6">
                            <h4 className="text-lg font-medium text-gray-900">Address</h4>
                            <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-600">{selectedGym.address}</p>
                              <div className="mt-4">
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  Get Directions
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                            <h4 className="text-lg font-medium text-gray-900">Membership Plans</h4>
                            <div className="mt-4 space-y-4">
                              {selectedGym.membership_plans.map((plan: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: number; features: (string | number | boolean | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined)[]; }, index: Key | null | undefined) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white shadow-xs">
                                  <div className="flex justify-between items-start">
                                    <h5 className="font-medium text-gray-900">{plan.name}</h5>
                                    <span className="text-lg font-bold text-indigo-600">${plan.price.toFixed(2)}</span>
                                  </div>
                                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                                    {plan.features.map((feature: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, i: Key | null | undefined) => (
                                      <li key={i} className="flex items-start">
                                        <svg className="h-4 w-4 mr-1.5 mt-0.5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                  <button className="mt-3 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Select Plan
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-sm">
                            <h4 className="text-lg font-medium text-gray-900">Amenities</h4>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {selectedGym.amenities.map((amenity: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, index: Key | null | undefined) => (
                                <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-sm">
                            <h4 className="text-lg font-medium text-gray-900">Contact</h4>
                            <div className="mt-2 space-y-2 text-gray-600">
                              <p className="flex items-center">
                                <svg className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {selectedGym.contact.phone}
                              </p>
                              <p className="flex items-center">
                                <svg className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {selectedGym.contact.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-base font-medium text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GymFinder;