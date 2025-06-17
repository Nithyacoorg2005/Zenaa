
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, Clock, Users } from 'lucide-react';

const stats = [
  {
    label: 'Problems Solved',
    value: '47',
    change: '+12 this week',
    color: 'green',
    icon: CheckCircle
  },
  {
    label: 'Forms Created',
    value: '23',
    change: '+5 this month',
    color: 'blue',
    icon: TrendingUp
  },
  {
    label: 'Tasks Completed',
    value: '89',
    change: '+15 today',
    color: 'purple',
    icon: Clock
  },
  {
    label: 'People Helped',
    value: '1.2k',
    change: 'Community impact',
    color: 'orange',
    icon: Users
  }
];

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
              <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
            </div>
            <span className={`text-xs font-medium text-${stat.color}-600 bg-${stat.color}-50 px-2 py-1 rounded-full`}>
              {stat.change}
            </span>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}