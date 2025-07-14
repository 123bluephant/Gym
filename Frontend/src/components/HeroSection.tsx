import { useEffect, useState } from 'react';
import { Play, Star, TrendingUp } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const controls = useAnimation();
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
  );
};

export default HeroSection;