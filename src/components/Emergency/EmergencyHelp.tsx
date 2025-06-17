import  { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, MessageCircle, MapPin, Clock, Shield, Heart, Zap } from 'lucide-react';

const emergencyContacts = [
  { name: 'Police', number: '100', icon: Shield, color: 'blue' },
  { name: 'Fire', number: '101', icon: Zap, color: 'red' },
  { name: 'Ambulance', number: '108', icon: Heart, color: 'green' },
  { name: 'Women Helpline', number: '1091', icon: Shield, color: 'purple' }
];

const quickActions = [
  { title: 'Send Location', description: 'Share your current location', icon: MapPin, color: 'blue' },
  { title: 'Emergency Message', description: 'Send pre-written SOS message', icon: MessageCircle, color: 'orange' },
  { title: 'Medical Info', description: 'Share medical conditions', icon: Heart, color: 'red' },
  { title: 'Emergency Contacts', description: 'Call saved emergency contacts', icon: Phone, color: 'green' }
];

export default function EmergencyHelp() {
  const [sosActivated, setSosActivated] = useState(false);
  const [location, setLocation] = useState<string | null>(null);

  const activateSOS = () => {
    setSosActivated(true);
    
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation('Location unavailable');
        }
      );
    }

    // Auto-deactivate after 30 seconds for demo
    setTimeout(() => {
      setSosActivated(false);
    }, 30000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Help</h1>
          <p className="text-gray-600">Quick access to emergency services and SOS features</p>
        </div>

        {/* SOS Button */}
        <div className="text-center mb-12">
          <motion.button
            whileHover={{ scale: sosActivated ? 1 : 1.05 }}
            whileTap={{ scale: sosActivated ? 1 : 0.95 }}
            onClick={activateSOS}
            disabled={sosActivated}
            className={`w-48 h-48 rounded-full flex items-center justify-center text-white font-bold text-2xl transition-all duration-300 ${
              sosActivated
                ? 'bg-red-600 animate-pulse cursor-not-allowed'
                : 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-2xl hover:shadow-red-200'
            }`}
          >
            {sosActivated ? (
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 mx-auto mb-2 animate-bounce" />
                <div>SOS ACTIVE</div>
                <div className="text-sm font-normal">Help is coming</div>
              </div>
            ) : (
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 mx-auto mb-2" />
                <div>EMERGENCY</div>
                <div className="text-sm font-normal">Tap for SOS</div>
              </div>
            )}
          </motion.button>
          
          {sosActivated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-red-50 border border-red-200 rounded-xl max-w-md mx-auto"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-red-900">Emergency Alert Activated</span>
              </div>
              <div className="space-y-2 text-sm text-red-800">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Time: {new Date().toLocaleTimeString()}</span>
                </div>
                {location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Location: {location}</span>
                  </div>
                )}
                <p className="mt-3 font-medium">
                  Emergency message ready to send via WhatsApp or SMS
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Emergency Contacts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Emergency Contacts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={contact.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center cursor-pointer hover:shadow-lg transition-all"
                onClick={() => window.open(`tel:${contact.number}`)}
              >
                <div className={`w-16 h-16 bg-${contact.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <contact.icon className={`h-8 w-8 text-${contact.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{contact.name}</h3>
                <p className={`text-2xl font-bold text-${contact.color}-600`}>{contact.number}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center`}>
                    <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Safety Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Before Emergency</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Keep emergency contacts updated</li>
                <li>• Share location with trusted contacts</li>
                <li>• Keep important documents accessible</li>
                <li>• Know your nearest hospital/police station</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">During Emergency</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Stay calm and assess the situation</li>
                <li>• Call appropriate emergency number</li>
                <li>• Provide clear location information</li>
                <li>• Follow instructions from emergency services</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}