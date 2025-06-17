
import { motion } from 'framer-motion';
import { Menu,  MessageCircle, Bell } from 'lucide-react';
import { useEmotion } from '../../contexts/EmotionContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { emotionState } = useEmotion();
  const { currentLanguage, supportedLanguages } = useLanguage();

  const getEmotionIcon = () => {
    switch (emotionState.currentEmotion) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'angry': return '😠';
      case 'stressed': return '😰';
      case 'excited': return '🤩';
      default: return '😐';
    }
  };

  const currentLang = supportedLanguages.find(lang => lang.code === currentLanguage);

  return (
    <motion.header 
      className="bg-white shadow-sm border-b border-gray-200 px-4 py-3"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">Z</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Zenaa</h1>
              <p className="text-sm text-gray-500">Your AI Life Assistant</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {emotionState.currentEmotion !== 'neutral' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-sm font-medium bg-${emotionState.colorTheme}-100 text-${emotionState.colorTheme}-800`}
            >
              <span className="mr-2">{getEmotionIcon()}</span>
              {emotionState.currentEmotion}
            </motion.div>
          )}

          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg">
            <span className="text-sm font-medium text-gray-700">
              {currentLang?.nativeName || 'English'}
            </span>
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <MessageCircle className="h-5 w-5 text-gray-600" />
          </button>

          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}