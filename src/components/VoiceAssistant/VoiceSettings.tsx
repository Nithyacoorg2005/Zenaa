import { motion } from 'framer-motion';
import { Settings, Volume2, Languages, Mic } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function VoiceSettings() {
  const { currentLanguage, supportedLanguages, setLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Settings className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Voice Settings</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Language Selection */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Languages className="h-4 w-4 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">Language</label>
          </div>
          <select
            value={currentLanguage}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName}
              </option>
            ))}
          </select>
        </div>

        {/* Voice Speed */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Volume2 className="h-4 w-4 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">Speech Speed</label>
          </div>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="0.7">Slow</option>
            <option value="0.9">Normal</option>
            <option value="1.1">Fast</option>
          </select>
        </div>

        {/* Voice Sensitivity */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Mic className="h-4 w-4 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">Mic Sensitivity</label>
          </div>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h4 className="font-medium text-purple-900 mb-2">Voice Tips</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Speak clearly and at a normal pace</li>
          <li>• Use simple, direct language for better understanding</li>
          <li>• Try mixing languages if you're more comfortable</li>
          <li>• You can always switch to text input if needed</li>
        </ul>
      </div>
    </motion.div>
  );
}