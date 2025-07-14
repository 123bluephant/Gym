import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronRight, Activity, ChefHat, Award, ShoppingCart, Star, Clock, Target, Users, Heart, TrendingUp, Flame } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

import { useInView } from 'react-intersection-observer';

const HomePage = () => {
  // Featured Workouts (from WorkoutsPage)
  const featuredWorkouts = [
    {
      id: 1,
      title: 'Full Body Strength Builder',
      category: 'strength',
      level: 'intermediate',
      duration: '45 min',
      instructor: 'Sarah Johnson',
      thumbnail: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400',
      participants: 2847,
      rating: 4.9,
    },
    {
      id: 2,
      title: 'HIIT Fat Burn Express',
      category: 'hiit',
      level: 'advanced',
      duration: '20 min',
      instructor: 'Mike Chen',
      thumbnail: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=400',
      participants: 3251,
      rating: 4.8,
    },
    {
      id: 3,
      title: 'Gentle Morning Yoga Flow',
      category: 'yoga',
      level: 'beginner',
      duration: '30 min',
      instructor: 'Emma Wilson',
      thumbnail: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=400',
      participants: 1456,
      rating: 4.9,
    }
  ];

  // Popular Products (from ShopPage)
  const popularProducts = [
    {
      id: 1,
      name: 'Premium Yoga Mat',
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      name: 'Athletic Leggings Set',
      price: 45.99,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      name: 'Adjustable Dumbbells',
      price: 299.99,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400',
    }
  ];

  // Diet Plans (from NutritionPage)
  const dietPlans = [
    {
      id: 'mediterranean',
      name: 'Mediterranean',
      description: 'Heart-healthy, rich in omega-3s and antioxidants',
      color: 'from-blue-500 to-green-500',
      meals: 125,
    },
    {
      id: 'plant-based',
      name: 'Plant-Based',
      description: 'Nutrient-dense, eco-friendly whole foods',
      color: 'from-green-500 to-emerald-500',
      meals: 98,
    },
    {
      id: 'high-protein',
      name: 'High Protein',
      description: 'Muscle building, strength focused nutrition',
      color: 'from-purple-500 to-pink-500',
      meals: 156,
    }
  ];

  // Stats (from TrackingPage)
  const stats = [
    { label: 'Workouts Completed', value: 90, change: '+12%', icon: Activity },
    { label: 'Hours Trained', value: 42.5, change: '+8%', icon: Clock },
    { label: 'Calories Burned', value: 8450, change: '+15%', icon: Flame },
    { label: 'Current Streak', value: 12, change: '+4 days', icon: Target }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }; const controls = useAnimation();
  const [ref, inView] = useInView();
  const [progress, setProgress] = useState(0);

  // Animation for progress bar
  useEffect(() => {
    if (inView) {
      controls.start("visible");
      const timer = setTimeout(() => setProgress(65), 800);
      return () => clearTimeout(timer);
    }
  }, [controls, inView]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section
        ref={ref}
        className="relative pt-16 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              variants={container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div
                className="space-y-4"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.6,
                      ease: ["easeOut"] as const
                    }
                  }
                }}
              >
                <motion.div
                  className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.6,
                        ease: ["easeOut"] as const
                      }
                    }
                  }}
                >
                  <Star className="w-4 h-4" />
                  <span>Rated #1 Fitness Platform</span>
                </motion.div>

                <motion.h1
                  className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.6,
                        ease: ["easeOut"] as const
                      }
                    }
                  }}
                >
                  Transform Your
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '200% 200%'
                    }}
                  >
                    Body & Mind
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-600 leading-relaxed"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.6,
                        ease: ["easeOut"] as const
                      }
                    }
                  }}
                >
                  Personalized workouts, nutrition plans, and wellness tracking designed for every body, every goal, and every stage of life.
                </motion.p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.6,
                      ease: ["easeOut"] as const
                    }
                  }
                }}
              >
                <motion.button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(192, 38, 211, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Free Trial
                </motion.button>

                <motion.button
                  className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  whileHover={{
                    backgroundColor: "#f9fafb",
                    scale: 1.03
                  }}
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </motion.button>
              </motion.div>

              <motion.div
                className="flex items-center space-x-8 pt-4"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.6,
                      ease: ["easeOut"] as const
                    }
                  }
                }}
              >
                {[["50K+", "Active Members"], ["1M+", "Workouts Completed"], ["98%", "Success Rate"]].map(([value, label], index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.3 + (index * 0.2),
                        duration: 0.5
                      }
                    }}
                  >
                    <div className="text-2xl font-bold text-gray-900">{value}</div>
                    <div className="text-sm text-gray-600">{label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              variants={{
                hidden: { scale: 0.9, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    ease: ["easeOut"] as const
                  }
                }
              }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div
                className="relative bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl p-8 shadow-2xl"
                animate={{
                  boxShadow: [
                    '0 25px 50px -12px rgba(192, 38, 211, 0.3)',
                    '0 25px 60px -12px rgba(219, 39, 119, 0.4)',
                    '0 25px 50px -12px rgba(192, 38, 211, 0.3)'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-lg font-semibold">Today's Workout</span>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      <TrendingUp className="w-6 h-6" />
                    </motion.div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center"
                        animate={{
                          scale: [1, 1.1, 1],
                          backgroundColor: [
                            'rgba(255, 255, 255, 0.2)',
                            'rgba(255, 255, 255, 0.3)',
                            'rgba(255, 255, 255, 0.2)'
                          ]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity
                        }}
                      >
                        <Play className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="text-white">
                        <div className="font-medium">HIIT Cardio Blast</div>
                        <div className="text-sm opacity-80">25 min • Advanced</div>
                      </div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-white h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{
                          duration: 1.5,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                    <div className="text-white text-sm opacity-80">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8 }}
                      >
                        {progress}% Complete
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg"
                variants={{
                  hidden: { y: 0, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                  animate: {
                    y: [0, -10, 0],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: ["easeInOut"] as const
                    }
                  }
                }}
                animate="animate"
              >
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  />
                  <span className="text-sm font-medium">Live Coaching</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg"
                variants={{
                  initial: { y: 0 },
                  animate: {
                    y: [-10, 0, -10],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut" as const
                    }
                  }
                }}
                animate="animate"
              >
                <div className="text-center">
                  <motion.div
                    className="text-lg font-bold text-gray-900"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                  >
                    1,247
                  </motion.div>
                  <div className="text-xs text-gray-600">Calories Burned</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating circles in background */}
        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-purple-200 opacity-40 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.5, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-1/3 w-48 h-48 rounded-full bg-pink-200 opacity-40 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600">Comprehensive tools to support your fitness goals</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Workouts',
                description: 'Access thousands of guided workouts for all fitness levels',
                icon: Activity,
                link: '/workouts',
                color: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Nutrition',
                description: 'Personalized meal plans and nutrition tracking',
                icon: ChefHat,
                link: '/nutrition',
                color: 'from-green-500 to-blue-500'
              },
              {
                title: 'Tracking',
                description: 'Monitor your progress with detailed analytics',
                icon: Award,
                link: '/tracking',
                color: 'from-orange-500 to-yellow-500'
              },
              {
                title: 'Shop',
                description: 'Premium fitness equipment and supplements',
                icon: ShoppingCart,
                link: '/shop',
                color: 'from-blue-500 to-indigo-500'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex items-center text-purple-600 font-medium">
                      <span>Learn more</span>
                      <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Workouts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Workouts</h2>
            <Link to="/workouts" className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
              View all workouts <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWorkouts.map((workout) => (
              <div key={workout.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative">
                  <img
                    src={workout.thumbnail}
                    alt={workout.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <Link
                    to={`/workouts/${workout.id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-colors">
                      <Play className="w-8 h-8 text-purple-600" />
                    </div>
                  </Link>
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-medium capitalize ${getLevelColor(workout.level)}`}>
                    {workout.level}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {workout.duration}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {workout.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">with {workout.instructor}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{workout.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{workout.rating}</span>
                    </div>
                  </div>

                  <Link
                    to={`/workouts/${workout.id}`}
                    className="w-full bg-gray-50 text-gray-700 py-2 rounded-lg font-medium hover:bg-purple-50 hover:text-purple-600 transition-all group flex items-center justify-center space-x-2 text-sm"
                  >
                    <span>Start Workout</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Diet Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Diet Plans</h2>
            <p className="text-xl text-gray-600">Find the perfect eating style that fits your goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {dietPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border-2 border-gray-100 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center`}>
                      <ChefHat className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{plan.meals}</div>
                  <div className="text-sm text-gray-600">Recipes Available</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Popular Fitness Products</h2>
            <Link to="/shop" className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
              View all products <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {popularProducts.map((product) => (
              <Link
                key={product.id}
                to={`/shop/${product.id}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Community Achievements</h2>
            <p className="text-xl text-purple-100">Join thousands who've transformed their health</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-green-200 bg-green-900/30 px-2 py-1 rounded">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {typeof stat.value === 'number' && stat.value > 1000
                      ? stat.value.toLocaleString()
                      : stat.value}
                  </div>
                  <div className="text-purple-100 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Health?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our community and get access to all features with a 7-day free trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Start Free Trial
              </Link>
              <Link
                to="/workouts"
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
              >
                Explore Workouts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;