import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Mic,  FileText, Lightbulb, 
 User, AlertTriangle, 
   Clock, Heart, Zap
} from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useEmotion } from '../../contexts/EmotionContext';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import PersonalizedRecommendations from './PersonalizedRecommendations';
import StatsOverview from './StatsOverview';

const quickFeatures = [
  { 
    id: 'voice', 
    icon: Mic, 
    title: 'Voice Assistant', 
    description: 'Speak your problems, get instant solutions',
    color: 'purple',
    path: '/voice'
  },
  { 
    id: 'forms', 
    icon: FileText, 
    title: 'Auto Forms', 
    description: 'Generate official documents instantly',
    color: 'green',
    path: '/forms'
  },
  { 
    id: 'solver', 
    icon: Lightbulb, 
    title: 'Problem Solver', 
    description: 'AI-powered personalized solutions',
    color: 'orange',
    path: '/solver'
  },
  { 
    id: 'emergency', 
    icon: AlertTriangle, 
    title: 'Emergency Help', 
    description: 'Instant SOS and emergency support',
    color: 'red',
    path: '/emergency'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, isProfileComplete } = useUser();
  const { emotionState } = useEmotion();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getPersonalizedMessage = () => {
    if (!profile) return 'Welcome to EasyAid+';
    
    const messages = [
      `${getGreeting()}, ${profile.name}!`,
      `Ready to tackle today's challenges?`,
      `Your AI assistant is here to help`,
      `Let's make today productive!`
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <motion.h1 
                className="text-3xl font-bold text-gray-900"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {getPersonalizedMessage()}
              </motion.h1>
              <p className="text-gray-600 flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}</span>
              </p>
              {emotionState.currentEmotion !== 'neutral' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-${emotionState.colorTheme}-50 text-${emotionState.colorTheme}-700`}
                >
                  <Heart className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    I sense you're feeling {emotionState.currentEmotion}. How can I help?
                  </span>
                </motion.div>
              )}
            </div>
            
            <div className="mt-6 lg:mt-0">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-white">
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6" />
                  <div>
                    <p className="font-semibold">AI Status: Active</p>
                    <p className="text-sm opacity-90">Ready to assist you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Completion Alert */}
        {!isProfileComplete && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900">Complete Your Profile</h3>
                  <p className="text-sm text-amber-700">
                    Help us provide better personalized recommendations
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/settings')}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
              >
                Complete Now
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats Overview */}
        <StatsOverview />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => navigate(feature.path)}
            >
              <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-${feature.color}-200`}>
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <QuickActions />
            <RecentActivity />
          </div>
          <div className="space-y-8">
            <PersonalizedRecommendations />
          </div>
        </div>
      </motion.div>
    </div>
  );
}