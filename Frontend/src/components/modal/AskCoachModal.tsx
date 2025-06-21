import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  from: 'user' | 'coach';
  text: string;
  timestamp: Date;
}

function AskCoachModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      // Add welcome message when modal opens
      setMessages([{
        id: '1',
        from: 'coach',
        text: 'Hi there! I\'m your virtual fitness coach. How can I help you today?',
        timestamp: new Date()
      }]);
    }
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!question.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      from: 'user',
      text: question,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        "Great question! For muscle building, aim for 3-4 sets of 8-12 reps with heavier weights.",
        "Nutrition is key! Make sure you're getting enough protein - about 1g per pound of body weight.",
        "Rest days are important for recovery. I recommend at least 1-2 rest days per week.",
        "For weight loss, focus on a combination of strength training and cardio, along with a calorie deficit.",
        "Proper form is crucial to prevent injuries. Would you like me to demonstrate any exercises?"
      ];
      
      const coachMessage: Message = {
        id: Date.now().toString(),
        from: 'coach',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, coachMessage]);
      setIsLoading(false);
    }, 1500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-xl">
          <h3 className="text-lg font-semibold text-white">Ask Your Coach</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                  msg.from === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <div className="text-sm">{msg.text}</div>
                <div className={`text-xs mt-1 ${
                  msg.from === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Type your question..."
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={!question.trim() || isLoading}
              className={`p-2 rounded-full ${
                !question.trim() || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Your virtual coach is here to help with fitness and nutrition advice
          </p>
        </div>
      </div>
    </div>
  );
}

export default AskCoachModal;