import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload, Download, Eye, Trash2, Lock, FileText, Image, File,  Search,  } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'document';
  size: string;
  uploadDate: string;
  category: string;
  content?: string;
}

const initialDocuments: Document[] = [
  {
    id: '1',
    name: 'Aadhaar Card.pdf',
    type: 'pdf',
    size: '2.1 MB',
    uploadDate: '2024-03-10',
    category: 'Identity',
    content: 'Aadhaar Card - 1234 5678 9012'
  },
  {
    id: '2',
    name: 'PAN Card.jpg',
    type: 'image',
    size: '1.5 MB',
    uploadDate: '2024-03-08',
    category: 'Identity',
    content: 'PAN Card - ABCDE1234F'
  },
  {
    id: '3',
    name: 'Degree Certificate.pdf',
    type: 'pdf',
    size: '3.2 MB',
    uploadDate: '2024-03-05',
    category: 'Education',
    content: 'Bachelor of Technology - Computer Science'
  },
  {
    id: '4',
    name: 'Bank Statement.pdf',
    type: 'pdf',
    size: '1.8 MB',
    uploadDate: '2024-03-01',
    category: 'Financial',
    content: 'Bank Statement - Account ending in 1234'
  }
];

const categories = ['All', 'Identity', 'Education', 'Financial', 'Medical', 'Legal', 'Other'];

export default function DigitalLocker() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState('');
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>(initialDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: '',
    category: 'Other',
    type: 'document' as 'pdf' | 'image' | 'document'
  });
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);

  const handleUnlock = () => {
    if (password === 'demo123') {
      setIsLocked(false);
    } else {
      alert('Incorrect password. Use "demo123" for demo.');
    }
  };

  const filterDocuments = (category: string, search: string = searchTerm) => {
    let filtered = documents;
    
    if (category !== 'All') {
      filtered = filtered.filter(doc => doc.category === category);
    }
    
    if (search) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredDocs(filtered);
  };

  React.useEffect(() => {
    filterDocuments(selectedCategory, searchTerm);
  }, [selectedCategory, searchTerm, documents]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return FileText;
      case 'image':
        return Image;
      default:
        return File;
    }
  };

  const uploadDocument = () => {
    if (!newDocument.name.trim()) return;
    
    const doc: Document = {
      id: Date.now().toString(),
      name: newDocument.name,
      type: newDocument.type,
      size: '1.2 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      category: newDocument.category,
      content: `Sample content for ${newDocument.name}`
    };
    
    setDocuments(prev => [...prev, doc]);
    setNewDocument({ name: '', category: 'Other', type: 'document' });
    setShowUploadForm(false);
  };

  const deleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  const downloadDocument = (doc: Document) => {
    const content = doc.content || `This is a sample document: ${doc.name}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Digital Locker</h1>
            <p className="text-gray-600">Enter your password to access your secure documents</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
            />
            <button
              onClick={handleUnlock}
              className="w-full bg-gradient-to-r from-gray-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all"
            >
              Unlock Locker
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Demo Password:</strong> demo123
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (viewingDocument) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  {React.createElement(getFileIcon(viewingDocument.type), { className: "h-6 w-6 text-blue-600" })}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{viewingDocument.name}</h2>
                  <p className="text-gray-600">{viewingDocument.category} • {viewingDocument.size}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingDocument(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Document Preview</h3>
              <div className="bg-white p-4 rounded border min-h-64">
                <p className="text-gray-700">{viewingDocument.content}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => downloadDocument(viewingDocument)}
                className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download</span>
              </button>
              <button
                onClick={() => setViewingDocument(null)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Locker</h1>
            <p className="text-gray-600">Secure storage for your important documents</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowUploadForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Document</span>
            </button>
            <button
              onClick={() => setIsLocked(true)}
              className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Lock className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Document</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={newDocument.name}
                onChange={(e) => setNewDocument(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Document name"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={newDocument.category}
                onChange={(e) => setNewDocument(prev => ({ ...prev, category: e.target.value }))}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.filter(cat => cat !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={newDocument.type}
                onChange={(e) => setNewDocument(prev => ({ ...prev, type: e.target.value as any }))}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="document">Document</option>
                <option value="pdf">PDF</option>
                <option value="image">Image</option>
              </select>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={uploadDocument}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Upload
              </button>
              <button
                onClick={() => setShowUploadForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-green-600">8.6 MB</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-purple-600">{categories.length - 1}</p>
              </div>
              <File className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Security</p>
                <p className="text-lg font-bold text-green-600">AES-256</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </div>
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
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc, index) => {
            const IconComponent = getFileIcon(doc.type);
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {doc.category}
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 truncate">{doc.name}</h3>
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>Size: {doc.size}</p>
                  <p>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setViewingDocument(doc)}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">View</span>
                  </button>
                  <button 
                    onClick={() => downloadDocument(doc)}
                    className="flex-1 bg-green-50 text-green-600 py-2 px-3 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Download</span>
                  </button>
                  <button 
                    onClick={() => deleteDocument(doc.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== 'All' 
                ? 'Try adjusting your search or filter criteria'
                : 'Upload your first document to get started'
              }
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}