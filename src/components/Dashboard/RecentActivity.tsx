
import { motion } from 'framer-motion';
import { FileText, Lightbulb, Mic, Calendar, CheckCircle, Clock } from 'lucide-react';

const activities = [
  {
    icon: FileText,
    title: 'RTI Application Created',
    description: 'For electricity connection inquiry',
    time: '2 hours ago',
    status: 'completed',
    color: 'green'
  },
  {
    icon: Lightbulb,
    title: 'Job Search Assistance',
    description: 'Found 5 matching opportunities',
    time: '5 hours ago',
    status: 'completed',
    color: 'orange'
  },
  {
    icon: Mic,
    title: 'Voice Query Resolved',
    description: 'Pension scheme eligibility check',
    time: '1 day ago',
    status: 'completed',
    color: 'purple'
  },
  {
    icon: Calendar,
    title: 'Task Reminder Set',
    description: 'Aadhaar card renewal next week',
    time: '2 days ago',
    status: 'pending',
    color: 'teal'
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className={`w-10 h-10 bg-${activity.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
              <activity.icon className={`h-5 w-5 text-${activity.color}-600`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {activity.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-orange-500" />
                  )}
                  <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}