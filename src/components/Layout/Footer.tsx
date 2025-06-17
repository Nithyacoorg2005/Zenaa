import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border-t border-gray-200 py-4 px-6"
      style={{ backgroundColor: 'var(--bg-secondary, #F9FAFB)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="font-semibold" style={{ color: 'var(--text-primary, #111827)' }}>
              Zenaa
            </span>
            <span className="text-sm" style={{ color: 'var(--text-secondary, #6B7280)' }}>
              © 2024
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm" style={{ color: 'var(--text-secondary, #6B7280)' }}>
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>by</span>
            <span className="font-medium text-purple-600">Nithya Shree</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}