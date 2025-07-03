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
    // In a real app, this would trigger an API call with the search term
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">GymFinder</h1>
            {userLocation && (
              <div className="text-sm bg-indigo-700 px-3 py-1 rounded-full">
                <span className="hidden sm:inline">Your location: </span>
                {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Search and filter section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg p-6 mb-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Find Your Perfect Gym</h2>
            <p className="mt-2 text-gray-600">Discover fitness centers tailored to your needs</p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="search" className="sr-only">Search</label>
              <input
                type="text"
                id="search"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${filter === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            >
              All Gyms
            </button>
            <button
              onClick={() => setFilter('open')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${filter === 'open'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            >
              Open Now
            </button>
          </div>

          {locationError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-yellow-600 text-sm bg-yellow-50 p-3 rounded-md"
            >
              {locationError}
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
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-md"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gym listings */}
        {!loading && !error && (
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
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => handleGymClick(gym)}
                  >
                    {gym.photo_url && (
                      <div className="h-48 overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          src={gym.photo_url}
                          alt={gym.name}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-baseline justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">{gym.name}</h2>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${gym.open_now ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {gym.open_now ? 'Open Now' : 'Closed'}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(gym.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-gray-600 text-sm">
                          {gym.rating} ({Math.floor(gym.rating * 20)} reviews)
                        </span>
                      </div>
                      <div className="mt-3 text-gray-600 space-y-1">
                        <p className="flex items-center">
                          <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {gym.address}
                        </p>
                        {gym.distance && (
                          <p className="flex items-center">
                            <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {gym.distance.toFixed(1)} miles away • {gym.hours}
                          </p>
                        )}
                      </div>
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-900">Facilities:</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {gym.equipment.slice(0, 4).map((item) => (
                            <span key={item} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {item}
                            </span>
                          ))}
                          {gym.equipment.length > 4 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              +{gym.equipment.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16"
                >
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
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilter('all');
                      setGyms(mockGyms);
                    }}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

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
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowModal(false)}></div>
              </motion.div>

              {/* Modal content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
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
                            <img
                              className="w-full h-64 object-cover rounded-lg shadow-md"
                              src={selectedGym.photo_url}
                              alt={selectedGym.name}
                            />
                          )}

                          <div className="mt-6">
                            <h4 className="text-lg font-medium text-gray-900">Description</h4>
                            <p className="mt-2 text-gray-600">{selectedGym.description}</p>
                          </div>

                          <div className="mt-6">
                            <h4 className="text-lg font-medium text-gray-900">Hours</h4>
                            <p className="mt-2 text-gray-600">{selectedGym.hours}</p>
                          </div>

                          <div className="mt-6">
                            <h4 className="text-lg font-medium text-gray-900">Address</h4>
                            <p className="mt-2 text-gray-600">{selectedGym.address}</p>
                            <div className="mt-4">
                              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Get Directions
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-lg font-medium text-gray-900">Membership Plans</h4>
                            <div className="mt-4 space-y-4">
                              {selectedGym.membership_plans.map((plan: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: number; features: (string | number | boolean | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined)[]; }, index: Key | null | undefined) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                  <div className="flex justify-between items-start">
                                    <h5 className="font-medium text-gray-900">{plan.name}</h5>
                                    <span className="text-lg font-bold text-indigo-600">${plan.price.toFixed(2)}</span>
                                  </div>
                                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                    {plan.features.map((feature: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, i: Key | null | undefined) => (
                                      <li key={i} className="flex items-center">
                                        <svg className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                  <button className="mt-3 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Select Plan
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6">
                            <h4 className="text-lg font-medium text-gray-900">Amenities</h4>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {selectedGym.amenities.map((amenity: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, index: Key | null | undefined) => (
                                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6">
                            <h4 className="text-lg font-medium text-gray-900">Contact</h4>
                            <div className="mt-2 space-y-2 text-gray-600">
                              <p className="flex items-center">
                                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {selectedGym.contact.phone}
                              </p>
                              <p className="flex items-center">
                                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
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