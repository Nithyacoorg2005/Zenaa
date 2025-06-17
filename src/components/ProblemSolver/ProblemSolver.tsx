import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Search, Clock, Star } from 'lucide-react';

const problemCategories = [
  { id: 'job', title: 'Job & Career', icon: '💼', color: 'blue' },
  { id: 'health', title: 'Health & Wellness', icon: '🏥', color: 'green' },
  { id: 'legal', title: 'Legal Issues', icon: '⚖️', color: 'purple' },
  { id: 'finance', title: 'Financial Help', icon: '💰', color: 'orange' },
  { id: 'education', title: 'Education', icon: '📚', color: 'teal' },
  { id: 'family', title: 'Family & Relationships', icon: '👨‍👩‍👧‍👦', color: 'pink' }
];

export default function ProblemSolver() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [problemText, setProblemText] = useState('');
  const [solutions, setSolutions] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeProblem = async () => {
    if (!problemText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setSolutions([
        {
          id: 1,
          title: 'Immediate Action',
          description: 'Steps you can take right now to address this issue',
          priority: 'high',
          timeframe: 'Today',
          resources: ['Government helpline', 'Online application']
        },
        {
          id: 2,
          title: 'Medium-term Solution',
          description: 'Actions to take over the next few weeks',
          priority: 'medium',
          timeframe: '1-2 weeks',
          resources: ['Local office visit', 'Document preparation']
        },
        {
          id: 3,
          title: 'Long-term Strategy',
          description: 'Preventive measures for the future',
          priority: 'low',
          timeframe: '1+ months',
          resources: ['Skill development', 'Network building']
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Problem Solver</h1>
          <p className="text-gray-600">Get personalized solutions for your daily life challenges</p>
        </div>

        {/* Problem Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {problemCategories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedCategory === category.id
                  ? `border-${category.color}-500 bg-${category.color}-50`
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="text-2xl mb-2 text-center">{category.icon}</div>
              <p className="text-sm font-medium text-gray-900 text-center">{category.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Problem Input */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Describe Your Problem</h2>
          <textarea
            value={problemText}
            onChange={(e) => setProblemText(e.target.value)}
            placeholder="Tell me about your problem in detail. The more information you provide, the better I can help you..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-4"
          />
          <button
            onClick={analyzeProblem}
            disabled={!problemText.trim() || isAnalyzing}
            className="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Clock className="h-5 w-5 animate-spin inline mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="h-5 w-5 inline mr-2" />
                Get Solutions
              </>
            )}
          </button>
        </div>

        {/* Solutions */}
        {solutions.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Personalized Solutions</h2>
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      solution.priority === 'high' ? 'bg-red-100 text-red-600' :
                      solution.priority === 'medium' ? 'bg-orange-100 text-orange-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      <Star className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{solution.title}</h3>
                  </div>
                  <span className="text-sm text-gray-500">{solution.timeframe}</span>
                </div>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <div className="flex flex-wrap gap-2">
                  {solution.resources.map((resource: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {resource}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}