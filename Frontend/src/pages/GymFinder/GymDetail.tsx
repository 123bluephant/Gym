import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, Clock, Phone, Mail, Check, Dumbbell } from 'lucide-react';
import { Gym } from '../../types/gym';

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

const GymDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [gym, setGym] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  useEffect(() => {
    const getGymDetails = async () => {
      const res = await fetch(`/api/gym/getGym/${id}`);
      const data = await res.json();
      setGym(data.gym || null);
      setLoading(false);
    }
    getGymDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="h-8 w-8 rounded-full bg-indigo-100 animate-pulse"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading gym details...</p>
        </div>
      </div>
    );
  }

  if (!gym) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Gym not found</h1>
          <Link
            to="/Finder"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gyms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={gym.gymImg[1]}
          alt={gym.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Link
            to="/Finder"
            className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-lg shadow-lg hover:bg-white transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gyms
          </Link>
        </div>

        {/* Gym Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{gym.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-lg">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-300 fill-current mr-1" />
                  <span>{gym.rating} ({Math.floor(gym.rating * 20)} reviews)</span>
                </div>
                {/* <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  gym.open_now ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {gym.open_now ? 'Open Now' : 'Closed'}
                </span> */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Gym</h2>
              <p className="text-gray-600 leading-relaxed">{gym.bio}</p>
            </motion.div>

            {/* Equipment & Facilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Dumbbell className="h-6 w-6 mr-2 text-indigo-600" />
                Equipment & Facilities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* {gym.equipment.map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-indigo-50 rounded-lg">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                    <span className="text-gray-800 font-medium">{item}</span>
                  </div>
                ))} */}
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* {gym.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))} */}
              </div>
            </motion.div>

            {/* Hours & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Hours */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                  Hours
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">{gym.hours}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">{gym?.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">{gym?.email}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                Location
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-4">{gym.location}</p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Membership Plans */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Membership Plans</h2>
                <div className="space-y-4">
                  {gym.membershipPlans.map((plan, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        selectedPlan === index
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedPlan(selectedPlan === index ? null : index)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-gray-900">{plan.name}</h3>
                        <span className="text-2xl font-bold text-indigo-600">{plan.price}</span>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        className={`mt-4 w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                          selectedPlan === index
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {selectedPlan === index ? 'Selected' : 'Select Plan'}
                      </button>
                    </div>
                  ))}
                </div>
                
                {selectedPlan !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200"
                  >
                    <h4 className="font-medium text-indigo-900 mb-2">Ready to join?</h4>
                    <p className="text-sm text-indigo-700 mb-4">
                      Contact the gym to complete your membership registration.
                    </p>
                    <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-200">
                      Contact Gym
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymDetail;