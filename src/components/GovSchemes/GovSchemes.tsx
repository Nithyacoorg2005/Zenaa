import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Search } from 'lucide-react';

const schemes = [
  {
    id: 1,
    title: 'PM Mudra Loan',
    description: 'Business loan up to ₹10 lakhs for micro enterprises',
    category: 'Finance',
    eligibility: 'All citizens',
    amount: '₹10,00,000',
    deadline: '2024-12-31',
    status: 'Active',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Pradhan Mantri Awas Yojana',
    description: 'Housing scheme for economically weaker sections',
    category: 'Housing',
    eligibility: 'EWS/LIG families',
    amount: '₹2,50,000',
    deadline: '2024-10-15',
    status: 'Active',
    color: 'green'
  },
  {
    id: 3,
    title: 'Skill India Mission',
    description: 'Free skill development training programs',
    category: 'Education',
    eligibility: 'Youth 15-45 years',
    amount: 'Free + Stipend',
    deadline: 'Ongoing',
    status: 'Active',
    color: 'purple'
  },
  {
    id: 4,
    title: 'PM Kisan Samman Nidhi',
    description: 'Direct income support to farmers',
    category: 'Agriculture',
    eligibility: 'Small farmers',
    amount: '₹6,000/year',
    deadline: 'Ongoing',
    status: 'Active',
    color: 'orange'
  }
];

const categories = ['All', 'Finance', 'Housing', 'Education', 'Agriculture', 'Health', 'Women'];

export default function GovSchemes() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSchemes, setFilteredSchemes] = useState(schemes);

  const filterSchemes = () => {
    let filtered = schemes;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(scheme => 
        scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredSchemes(filtered);
  };

  React.useEffect(() => {
    filterSchemes();
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Government Schemes</h1>
          <p className="text-gray-600">Discover schemes and benefits you're eligible for</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search schemes..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 bg-${scheme.color}-100 rounded-lg flex items-center justify-center`}>
                  <Building className={`h-5 w-5 text-${scheme.color}-600`} />
                </div>
                <span className={`px-3 py-1 bg-${scheme.color}-100 text-${scheme.color}-700 rounded-full text-sm font-medium`}>
                  {scheme.category}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{scheme.title}</h3>
              <p className="text-gray-600 mb-4">{scheme.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Eligibility:</span>
                  <span className="font-medium text-gray-900">{scheme.eligibility}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-medium text-green-600">{scheme.amount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Deadline:</span>
                  <span className="font-medium text-gray-900">{scheme.deadline}</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className={`flex-1 bg-${scheme.color}-500 text-white py-2 px-4 rounded-lg hover:bg-${scheme.color}-600 transition-colors text-sm font-medium`}>
                  Apply Now
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No schemes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}