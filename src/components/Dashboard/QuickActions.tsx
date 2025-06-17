import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mic, FileText, Lightbulb, Calendar } from 'lucide-react';

const actions = [
  {
    icon: Mic,
    title: 'Voice Query',
    description: 'Ask anything using your voice',
    action: 'Start Speaking',
    color: 'purple',
    path: '/voice'
  },
  {
    icon: FileText,
    title: 'Create Form',
    description: 'Generate official documents',
    action: 'Create Now',
    color: 'green',
    path: '/forms'
  },
  {
    icon: Lightbulb,
    title: 'Get Solutions',
    description: 'AI-powered problem solving',
    action: 'Solve Problem',
    color: 'orange',
    path: '/solver'
  },
  {
    icon: Calendar,
    title: 'Add Task',
    description: 'Schedule and track activities',
    action: 'Add Task',
    color: 'teal',
    path: '/tasks'
  }
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer"
            onClick={() => navigate(action.path)}
          >
            <div className={`p-4 rounded-xl border-2 border-transparent hover:border-${action.color}-200 bg-gradient-to-br from-gray-50 to-white transition-all duration-300`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className={`h-5 w-5 text-${action.color}-600`} />
                </div>
                <button className={`text-xs font-medium text-${action.color}-600 bg-${action.color}-50 px-3 py-1 rounded-full hover:bg-${action.color}-100 transition-colors`}>
                  {action.action}
                </button>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}