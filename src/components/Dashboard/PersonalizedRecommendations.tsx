import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import { TrendingUp, Users, BookOpen, Briefcase, Heart, Star } from 'lucide-react';

export default function PersonalizedRecommendations() {
  const { profile } = useUser();

  const getRecommendations = () => {
    if (!profile) return [];
    
    const recommendations = [];
    
    // Job-related recommendations
    if (profile.occupation.toLowerCase().includes('student') || profile.occupation.toLowerCase().includes('unemployed')) {
      recommendations.push({
        icon: Briefcase,
        title: 'Job Fair Near You',
        description: 'IT Jobs Fair in Bengaluru - March 15',
        type: 'opportunity',
        color: 'blue',
        priority: 'high'
      });
    }
    
    // Education recommendations
    if (profile.age < 30) {
      recommendations.push({
        icon: BookOpen,
        title: 'Free Skill Training',
        description: 'Digital Marketing Course - Apply by March 20',
        type: 'education',
        color: 'green',
        priority: 'medium'
      });
    }
    
    // Health recommendations
    if (profile.age > 45) {
      recommendations.push({
        icon: Heart,
        title: 'Health Checkup Scheme',
        description: 'Free medical checkup for seniors',
        type: 'health',
        color: 'red',
        priority: 'high'
      });
    }
    
    // Government scheme recommendations
    recommendations.push({
      icon: TrendingUp,
      title: 'PM Mudra Loan',
      description: 'Business loan up to ₹10 lakhs',
      type: 'finance',
      color: 'purple',
      priority: 'medium'
    });
    
    return recommendations;
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">For You</h2>
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Complete your profile to get personalized recommendations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">For You</h2>
        <Star className="h-5 w-5 text-yellow-500" />
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border-l-4 border-${rec.color}-500 bg-${rec.color}-50 hover:bg-${rec.color}-100 transition-colors cursor-pointer`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 bg-${rec.color}-500 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <rec.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold text-${rec.color}-900`}>{rec.title}</h3>
                  {rec.priority === 'high' && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      High Priority
                    </span>
                  )}
                </div>
                <p className={`text-sm text-${rec.color}-700 mt-1`}>{rec.description}</p>
                <button className={`text-xs font-medium text-${rec.color}-600 mt-2 hover:text-${rec.color}-800`}>
                  Learn More →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}