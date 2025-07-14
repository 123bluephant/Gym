import React, { useState } from 'react';
import { MessageCircle, Search, ChevronDown, ChevronUp, Bot, User, Send, Heart, Dumbbell, Users, Calendar, ShoppingCart, BarChart } from 'lucide-react';

const HelpCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', message: 'Hi! I\'m your FitLife AI assistant. How can I help you today?' }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  const categories = [
    { id: 'all', name: 'All Topics', icon: Heart },
    { id: 'gym-owners', name: 'Gym Owners', icon: Dumbbell },
    { id: 'women-health', name: 'Women\'s Health', icon: Heart },
    { id: 'nutrition', name: 'Nutrition', icon: ShoppingCart },
    { id: 'community', name: 'Community', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: BarChart }
  ];

  const faqs = [
    {
      id: 1,
      category: 'gym-owners',
      question: 'How do I create personalized diet plans for my clients?',
      answer: 'Navigate to your dashboard > Client Management > Select a client > Diet Plans. You can create custom meal plans based on their goals, dietary restrictions, and preferences. Our AI nutritionist suggests optimal macronutrient ratios.'
    },
    {
      id: 2,
      category: 'gym-owners',
      question: 'Can I upload custom workout videos for my clients?',
      answer: 'Yes! Go to Content Library > Upload Videos. You can organize videos by muscle groups, difficulty levels, and create playlists for specific training programs. Videos support HD quality and include progress tracking.'
    },
    {
      id: 3,
      category: 'women-health',
      question: 'How does the menstrual cycle tracking work with workout plans?',
      answer: 'Our smart algorithm adjusts workout intensity based on your cycle phase. During menstruation, we recommend gentle yoga and stretching. During ovulation, high-intensity workouts are optimized for peak performance.'
    },
    {
      id: 4,
      category: 'women-health',
      question: 'Are there specific exercises for pregnancy and postpartum?',
      answer: 'Absolutely! We offer specialized programs for each trimester and postpartum recovery. All exercises are approved by certified prenatal fitness specialists and include modifications for different stages.'
    },
    {
      id: 5,
      category: 'nutrition',
      question: 'How do I access the nutrition shop?',
      answer: 'The nutrition shop is available in your dashboard under "Supplements & Nutrition". Browse by categories like protein powders, vitamins, and healthy snacks. All products are vetted by our nutrition experts.'
    },
    {
      id: 6,
      category: 'community',
      question: 'How can I join fitness challenges and connect with others?',
      answer: 'Visit the Community section to join monthly challenges, participate in forums, and connect with users who share similar fitness goals. You can also create your own groups and challenges.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    const newUserMessage = {
      id: chatMessages.length + 1,
      type: 'user' as const,
      message: userMessage
    };

    setChatMessages(prev => [...prev, newUserMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: chatMessages.length + 2,
        type: 'bot' as const,
        message: getBotResponse(userMessage)
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);

    setUserMessage('');
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition')) {
      return 'For nutrition and diet plans, you can access our personalized meal planning feature in your dashboard. Would you like me to guide you through creating your first meal plan?';
    } else if (lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
      return 'Our workout library has over 1000+ exercises with video demonstrations. You can filter by muscle group, equipment, or difficulty level. What type of workout are you looking for?';
    } else if (lowerMessage.includes('period') || lowerMessage.includes('menstrual')) {
      return 'Our cycle-synced workouts adapt to your menstrual phase for optimal results. Track your cycle in the Women\'s Health section to get personalized recommendations.';
    } else {
      return 'I understand you need help with that. Let me connect you with our support team for personalized assistance. In the meantime, you can browse our FAQ section below.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-6 mt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Help Center</h1>
            <p className="text-xl text-gray-600">Get the support you need for your fitness journey</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles, tutorials, and guides..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'border-pink-300 bg-pink-50 text-pink-700'
                          : 'border-gray-200 hover:border-pink-200 hover:bg-pink-50'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Chat Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-pink-500 to-pink-400 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white rounded-full p-2">
                      <Bot className="w-6 h-6 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">AI Assistant</h3>
                      <p className="text-pink-100 text-sm">Always here to help</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChat(!showChat)}
                    className="text-white hover:bg-pink-600 rounded-full p-2 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {showChat && (
                <>
                  <div className="h-80 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs p-3 rounded-lg ${
                            msg.type === 'user'
                              ? 'bg-pink-500 text-white rounded-br-none'
                              : 'bg-gray-100 text-gray-800 rounded-bl-none'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {msg.type === 'bot' && <Bot className="w-4 h-4 mt-0.5 text-pink-500" />}
                            {msg.type === 'user' && <User className="w-4 h-4 mt-0.5" />}
                            <p className="text-sm">{msg.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Ask me anything..."
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent text-sm"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;