import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Globe, Palette, Save, Moon, Sun, Monitor } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useLanguage } from '../../contexts/LanguageContext';

const themes = [
  { id: 'light', name: 'Light', icon: Sun, colors: ['#3B82F6', '#10B981', '#F59E0B'] },
  { id: 'dark', name: 'Dark', icon: Moon, colors: ['#1F2937', '#374151', '#4B5563'] },
  { id: 'auto', name: 'Auto', icon: Monitor, colors: ['#6366F1', '#8B5CF6', '#EC4899'] },
  { id: 'nature', name: 'Nature', icon: Sun, colors: ['#10B981', '#059669', '#047857'] },
  { id: 'sunset', name: 'Sunset', icon: Sun, colors: ['#F59E0B', '#EF4444', '#EC4899'] },
  { id: 'ocean', name: 'Ocean', icon: Sun, colors: ['#3B82F6', '#1D4ED8', '#1E40AF'] }
];

export default function Settings() {
  const { profile, updateProfile } = useUser();
  const { currentLanguage, supportedLanguages, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState(profile || {
    name: '',
    age: 0,
    gender: '',
    location: '',
    education: '',
    occupation: '',
    income: '',
    preferredLanguage: 'en',
    disabilities: []
  });
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem('zenaa-theme') || 'light';
  });
  // const [notifications, setNotifications] = useState(() => {
  //   const saved = localStorage.getItem('zenaa-notifications');
  //   return saved ? JSON.parse(saved) : {
  //     tasks: true,
  //     schemes: true,
  //     learning: false,
  //     emergency: true
  //   };
  // });

  const tabs = [
    { id: 'profile', title: 'Profile', icon: User, color: 'blue' },
    { id: 'notifications', title: 'Notifications', icon: Bell, color: 'green' },
    { id: 'privacy', title: 'Privacy', icon: Shield, color: 'purple' },
    { id: 'language', title: 'Language', icon: Globe, color: 'orange' },
    { id: 'appearance', title: 'Appearance', icon: Palette, color: 'pink' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (activeTab === 'profile') {
      updateProfile(formData);
      alert('Profile updated successfully!');
    } else if (activeTab === 'appearance') {
      applyTheme(selectedTheme);
      localStorage.setItem('zenaa-theme', selectedTheme);
      alert('Theme applied successfully!');
    // } else if (activeTab === 'notifications') {
    //   localStorage.setItem('zenaa-notifications', JSON.stringify(notifications));
      // alert('Notification preferences saved!');
    } else if (activeTab === 'language') {
      setLanguage(currentLanguage);
      alert('Language preference saved!');
    }
  };

  const applyTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      const root = document.documentElement;
      
      // Remove all existing theme classes
      themes.forEach(t => {
        document.body.classList.remove(`theme-${t.id}`);
      });
      
      // Add new theme class
      document.body.classList.add(`theme-${themeId}`);
      
      // Apply CSS custom properties for immediate effect
      root.style.setProperty('--theme-primary', theme.colors[0]);
      root.style.setProperty('--theme-secondary', theme.colors[1]);
      root.style.setProperty('--theme-accent', theme.colors[2]);
      
      // Apply specific theme styles
      if (themeId === 'dark') {
        root.style.setProperty('--bg-primary', '#1F2937');
        root.style.setProperty('--bg-secondary', '#374151');
        root.style.setProperty('--text-primary', '#F9FAFB');
        root.style.setProperty('--text-secondary', '#D1D5DB');
        document.body.style.backgroundColor = '#1F2937';
        document.body.style.color = '#F9FAFB';
      } else if (themeId === 'nature') {
        root.style.setProperty('--bg-primary', '#F0FDF4');
        root.style.setProperty('--bg-secondary', '#DCFCE7');
        root.style.setProperty('--text-primary', '#14532D');
        root.style.setProperty('--text-secondary', '#166534');
        document.body.style.backgroundColor = '#F0FDF4';
        document.body.style.color = '#14532D';
      } else if (themeId === 'sunset') {
        root.style.setProperty('--bg-primary', '#FEF3C7');
        root.style.setProperty('--bg-secondary', '#FDE68A');
        root.style.setProperty('--text-primary', '#92400E');
        root.style.setProperty('--text-secondary', '#B45309');
        document.body.style.backgroundColor = '#FEF3C7';
        document.body.style.color = '#92400E';
      } else if (themeId === 'ocean') {
        root.style.setProperty('--bg-primary', '#EFF6FF');
        root.style.setProperty('--bg-secondary', '#DBEAFE');
        root.style.setProperty('--text-primary', '#1E3A8A');
        root.style.setProperty('--text-secondary', '#1D4ED8');
        document.body.style.backgroundColor = '#EFF6FF';
        document.body.style.color = '#1E3A8A';
      } else {
        // Light theme (default)
        root.style.setProperty('--bg-primary', '#FFFFFF');
        root.style.setProperty('--bg-secondary', '#F9FAFB');
        root.style.setProperty('--text-primary', '#111827');
        root.style.setProperty('--text-secondary', '#6B7280');
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.color = '#111827';
      }
      
      // Force re-render by triggering a custom event
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: themeId }));
    }
  };

  // Apply theme on component mount
  React.useEffect(() => {
    applyTheme(selectedTheme);
  }, []);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-primary, #FFFFFF)', color: 'var(--text-primary, #111827)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <SettingsIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary, #111827)' }}>Settings</h1>
          <p style={{ color: 'var(--text-secondary, #6B7280)' }}>Customize your Zenaa experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6" style={{ backgroundColor: 'var(--bg-secondary, #F9FAFB)' }}>
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                    style={{ 
                      color: activeTab === tab.id ? 'var(--theme-primary, #3B82F6)' : 'var(--text-secondary, #6B7280)',
                      backgroundColor: activeTab === tab.id ? 'var(--bg-primary, #FFFFFF)' : 'transparent'
                    }}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100" style={{ backgroundColor: 'var(--bg-secondary, #F9FAFB)' }}>
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary, #111827)' }}>Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary, #111827)' }}>Full Name</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        style={{ backgroundColor: 'var(--bg-primary, #FFFFFF)', color: 'var(--text-primary, #111827)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary, #111827)' }}>Age</label>
                      <input
                        type="number"
                        value={formData.age || ''}
                        onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your age"
                        style={{ backgroundColor: 'var(--bg-primary, #FFFFFF)', color: 'var(--text-primary, #111827)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary, #111827)' }}>Gender</label>
                      <select
                        value={formData.gender || ''}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ backgroundColor: 'var(--bg-primary, #FFFFFF)', color: 'var(--text-primary, #111827)' }}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary, #111827)' }}>Location</label>
                      <input
                        type="text"
                        value={formData.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="City, State"
                        style={{ backgroundColor: 'var(--bg-primary, #FFFFFF)', color: 'var(--text-primary, #111827)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary, #111827)' }}>Education</label>
                      <select
                        value={formData.education || ''}
                        onChange={(e) => handleInputChange('education', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ backgroundColor: 'var(--bg-primary, #FFFFFF)', color: 'var(--text-primary, #111827)' }}
                      >
                        <option value="">Select education level</option>
                        <option value="primary">Primary School</option>
                        <option value="secondary">Secondary School</option>
                        <option value="higher_secondary">Higher Secondary</option>
                        <option value="diploma">Diploma</option>
                        <option value="graduate">Graduate</option>
                        <option value="postgraduate">Post Graduate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary, #111827)' }}>Occupation</label>
                      <input
                        type="text"
                        value={formData.occupation || ''}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your occupation"
                        style={{ backgroundColor: 'var(--bg-primary, #FFFFFF)', color: 'var(--text-primary, #111827)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary, #111827)' }}>Monthly Income</label>
                      <select
                        value={formData.income || ''}
                        onChange={(e) => handleInputChange('income', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ backgroundColor: 'var(--bg-primary, #FFFFFF)', color: 'var(--text-primary, #111827)' }}
                      >
                        <option value="">Select income range</option>
                        <option value="below_10k">Below ₹10,000</option>
                        <option value="10k_25k">₹10,000 - ₹25,000</option>
                        <option value="25k_50k">₹25,000 - ₹50,000</option>
                        <option value="50k_100k">₹50,000 - ₹1,00,000</option>
                        <option value="above_100k">Above ₹1,00,000</option>
                      </select>
                    </div>
                    <div>
                     
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'language' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary, #111827)' }}>Language Preferences</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-primary, #111827)' }}>Primary Language</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {supportedLanguages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className={`p-4 rounded-lg border-2 transition-colors text-left ${
                              currentLanguage === lang.code
                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            style={{ 
                              backgroundColor: currentLanguage === lang.code ? 'var(--theme-primary, #F59E0B)' : 'var(--bg-primary, #FFFFFF)',
                              color: currentLanguage === lang.code ? '#FFFFFF' : 'var(--text-primary, #111827)'
                            }}
                          >
                            <div className="font-medium">{lang.nativeName}</div>
                            <div className="text-sm opacity-75">{lang.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

             
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary, #111827)' }}>Privacy & Security</h2>
                  <div className="space-y-6">
                    <div className="p-6 border border-gray-200 rounded-lg" style={{ backgroundColor: 'var(--bg-primary, #FFFFFF)' }}>
                      <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary, #111827)' }}>Data Collection</h3>
                      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary, #6B7280)' }}>
                        We collect minimal data to provide personalized recommendations and improve your experience.
                      </p>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Privacy Policy
                      </button>
                    </div>
                    <div className="p-6 border border-gray-200 rounded-lg" style={{ backgroundColor: 'var(--bg-primary, #FFFFFF)' }}>
                      <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary, #111827)' }}>Data Export</h3>
                      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary, #6B7280)' }}>
                        Download all your data in a portable format.
                      </p>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                        Export Data
                      </button>
                    </div>
                    <div className="p-6 border border-red-200 rounded-lg bg-red-50">
                      <h3 className="font-semibold text-red-900 mb-2">Delete Account</h3>
                      <p className="text-sm text-red-700 mb-4">
                        Permanently delete your account and all associated data.
                      </p>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary, #111827)' }}>Appearance</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary, #111827)' }}>Theme</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {themes.map((theme) => (
                          <button
                            key={theme.id}
                            onClick={() => {
                              setSelectedTheme(theme.id);
                              applyTheme(theme.id);
                            }}
                            className={`p-4 border-2 rounded-lg transition-colors ${
                              selectedTheme === theme.id
                                ? 'border-pink-500 bg-pink-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            style={{ 
                              backgroundColor: selectedTheme === theme.id ? 'var(--theme-primary, #EC4899)' : 'var(--bg-primary, #FFFFFF)',
                              color: selectedTheme === theme.id ? '#FFFFFF' : 'var(--text-primary, #111827)',
                              borderColor: selectedTheme === theme.id ? 'var(--theme-primary, #EC4899)' : '#D1D5DB'
                            }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <theme.icon className="h-5 w-5" />
                              {selectedTheme === theme.id && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <div className="flex space-x-1 mb-3">
                              {theme.colors.map((color, idx) => (
                                <div
                                  key={idx}
                                  className="w-full h-6 rounded"
                                  style={{ backgroundColor: color }}
                                ></div>
                              ))}
                            </div>
                            <p className="font-medium">{theme.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--theme-primary, #EC4899)', color: '#FFFFFF' }}>
                      <h4 className="font-medium mb-2">Theme Preview</h4>
                      <p className="text-sm opacity-90">
                        The selected theme will be applied across the entire application. Changes take effect immediately.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}