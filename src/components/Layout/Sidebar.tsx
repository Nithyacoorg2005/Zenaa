import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  Home, Mic, FileText, Lightbulb, Building, Calendar, 
  User, Shield, AlertTriangle, GraduationCap, Settings, X 
} from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
}

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard', color: 'blue' },
  { path: '/voice', icon: Mic, label: 'Voice Assistant', color: 'purple' },
  { path: '/forms', icon: FileText, label: 'Form Creator', color: 'green' },
  { path: '/solver', icon: Lightbulb, label: 'Problem Solver', color: 'orange' },
  { path: '/schemes', icon: Building, label: 'Govt Schemes', color: 'red' },
  { path: '/tasks', icon: Calendar, label: 'Task Scheduler', color: 'teal' },
  { path: '/resume', icon: User, label: 'Resume Builder', color: 'indigo' },
  { path: '/locker', icon: Shield, label: 'Digital Locker', color: 'gray' },
  { path: '/emergency', icon: AlertTriangle, label: 'Emergency Help', color: 'red' },
  { path: '/learning', icon: GraduationCap, label: 'Learn & Grow', color: 'pink' },
  { path: '/settings', icon: Settings, label: 'Settings', color: 'gray' }
];

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <motion.div 
      className="w-72 h-full shadow-xl flex flex-col fixed lg:relative z-50"
      style={{ backgroundColor: 'var(--bg-secondary, #FFFFFF)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
           
           
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" style={{ color: 'var(--text-secondary, #6B7280)' }} />
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <NavLink
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? `border-l-4`
                    : 'hover:bg-gray-50'
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? 'var(--bg-primary, #FFFFFF)' : 'transparent',
                color: isActive ? 'var(--theme-primary, #3B82F6)' : 'var(--text-secondary, #6B7280)',
                borderLeftColor: isActive ? 'var(--theme-primary, #3B82F6)' : 'transparent'
              })}
            >
              <item.icon className={`h-5 w-5 transition-colors`} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-primary, #F3F4F6)' }}>
          <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary, #111827)' }}>Need Help?</h3>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary, #6B7280)' }}>
            Chat with our AI assistant for instant support
          </p>
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
            Start Chat
          </button>
        </div>
      </div>
    </motion.div>
  );
}