import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Play, BookOpen, Award, Clock,  CheckCircle,  Target } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: 'Digital Literacy Basics',
    description: 'Learn essential digital skills for daily life including internet usage, email, and online safety',
    duration: '2 hours',
    level: 'Beginner',
    progress: 75,
    lessons: 8,
    color: 'blue',
    category: 'Digital Skills',
    topics: ['Internet Basics', 'Email Usage', 'Online Safety', 'Digital Payments'],
    certificate: true
  },
  {
    id: 2,
    title: 'Financial Planning 101',
    description: 'Understand budgeting, savings, investments, and government financial schemes',
    duration: '3 hours',
    level: 'Beginner',
    progress: 30,
    lessons: 12,
    color: 'green',
    category: 'Finance',
    topics: ['Budgeting', 'Savings', 'Investments', 'Insurance', 'Government Schemes'],
    certificate: true
  },
  {
    id: 3,
    title: 'Legal Rights Awareness',
    description: 'Know your rights and legal procedures including RTI, consumer rights, and legal aid',
    duration: '2.5 hours',
    level: 'Intermediate',
    progress: 0,
    lessons: 10,
    color: 'purple',
    category: 'Legal',
    topics: ['Constitutional Rights', 'RTI Act', 'Consumer Rights', 'Legal Aid'],
    certificate: true
  },
  {
    id: 4,
    title: 'Job Interview Skills',
    description: 'Master the art of job interviews with practical tips and mock sessions',
    duration: '1.5 hours',
    level: 'Beginner',
    progress: 100,
    lessons: 6,
    color: 'orange',
    category: 'Career',
    topics: ['Resume Writing', 'Interview Preparation', 'Communication Skills', 'Mock Interviews'],
    certificate: true
  },
  {
    id: 5,
    title: 'Health & Wellness',
    description: 'Basic health knowledge, nutrition, mental health, and government health schemes',
    duration: '2 hours',
    level: 'Beginner',
    progress: 50,
    lessons: 9,
    color: 'red',
    category: 'Health',
    topics: ['Nutrition', 'Mental Health', 'Exercise', 'Government Health Schemes'],
    certificate: false
  },
  {
    id: 6,
    title: 'Communication Skills',
    description: 'Improve your speaking, writing, and interpersonal communication skills',
    duration: '2.5 hours',
    level: 'Intermediate',
    progress: 20,
    lessons: 11,
    color: 'teal',
    category: 'Soft Skills',
    topics: ['Public Speaking', 'Written Communication', 'Body Language', 'Conflict Resolution'],
    certificate: true
  },
  {
    id: 7,
    title: 'Entrepreneurship Basics',
    description: 'Learn how to start and run a small business with government support schemes',
    duration: '4 hours',
    level: 'Advanced',
    progress: 0,
    lessons: 15,
    color: 'indigo',
    category: 'Business',
    topics: ['Business Planning', 'Funding Options', 'Marketing', 'Government Schemes'],
    certificate: true
  },
  {
    id: 8,
    title: 'Agriculture & Farming',
    description: 'Modern farming techniques, government schemes, and sustainable agriculture',
    duration: '3 hours',
    level: 'Intermediate',
    progress: 0,
    lessons: 12,
    color: 'yellow',
    category: 'Agriculture',
    topics: ['Modern Techniques', 'Crop Management', 'Government Schemes', 'Organic Farming'],
    certificate: true
  }
];

const categories = ['All', 'Digital Skills', 'Finance', 'Legal', 'Career', 'Health', 'Soft Skills', 'Business', 'Agriculture'];

export default function LearningModules() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredModules, setFilteredModules] = useState(modules);
  const [selectedModule, setSelectedModule] = useState<any>(null);

  const filterModules = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredModules(modules);
    } else {
      setFilteredModules(modules.filter(module => module.category === category));
    }
  };

  React.useEffect(() => {
    filterModules(selectedCategory);
  }, [selectedCategory]);

  const completedModules = modules.filter(m => m.progress === 100).length;
  const inProgressModules = modules.filter(m => m.progress > 0 && m.progress < 100).length;
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons, 0);
  const averageProgress = Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / modules.length);

  const startModule = (module: any) => {
    setSelectedModule(module);
    // Simulate starting the module
    setTimeout(() => {
      alert(`Starting ${module.title}! This would open the interactive learning interface.`);
      setSelectedModule(null);
    }, 1000);
  };

  if (selectedModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="text-center mb-8">
              <div className={`w-16 h-16 bg-${selectedModule.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <GraduationCap className={`h-8 w-8 text-${selectedModule.color}-600`} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Starting {selectedModule.title}</h1>
              <p className="text-gray-600">Preparing your learning environment...</p>
            </div>
            
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learn & Grow</h1>
          <p className="text-gray-600">Interactive learning modules to enhance your skills and knowledge</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Modules</p>
                <p className="text-2xl font-bold text-gray-900">{modules.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-pink-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedModules}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-orange-600">{inProgressModules}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-purple-600">{averageProgress}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => filterModules(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${module.color}-100 rounded-lg flex items-center justify-center`}>
                  <BookOpen className={`h-6 w-6 text-${module.color}-600`} />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 bg-${module.color}-100 text-${module.color}-700 rounded-full text-xs font-medium`}>
                    {module.level}
                  </span>
                  {module.certificate && (
                    <Award className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{module.description}</p>
              
              {/* Topics */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">What you'll learn:</p>
                <div className="flex flex-wrap gap-1">
                  {module.topics.slice(0, 3).map((topic, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {topic}
                    </span>
                  ))}
                  {module.topics.length > 3 && (
                    <span className="text-xs text-gray-500">+{module.topics.length - 3} more</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{module.lessons} lessons</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className={`font-medium text-${module.color}-600`}>{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-${module.color}-500 h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => startModule(module)}
                  className={`flex-1 bg-${module.color}-500 text-white py-2 px-4 rounded-lg hover:bg-${module.color}-600 transition-colors text-sm font-medium flex items-center justify-center space-x-1`}
                >
                  <Play className="h-4 w-4" />
                  <span>{module.progress === 0 ? 'Start' : module.progress === 100 ? 'Review' : 'Continue'}</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No modules found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}

        {/* Achievement Section */}
        <div className="mt-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <Award className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Keep Learning!</h2>
            <p className="text-pink-100 mb-6">
              You've completed {completedModules} modules and earned certificates. Continue your learning journey to unlock more achievements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{completedModules}</div>
                <div className="text-sm text-pink-100">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{averageProgress}%</div>
                <div className="text-sm text-pink-100">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalLessons}</div>
                <div className="text-sm text-pink-100">Total Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{modules.filter(m => m.certificate && m.progress === 100).length}</div>
                <div className="text-sm text-pink-100">Certificates Earned</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}