import  { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Send, Loader } from 'lucide-react';
import { useEmotion } from '../../contexts/EmotionContext';
import { useLanguage } from '../../contexts/LanguageContext';
import VoiceWaveform from './VoiceWaveform';
import ConversationHistory from './ConversationHistory';
import VoiceSettings from './VoiceSettings';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language?: string;
  emotion?: string;
}

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const { analyzeText, emotionState } = useEmotion();
  const { currentLanguage, translate } = useLanguage();
  
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = getCurrentLanguageCode();
      
      recognitionRef.current.onstart = () => {
        setIsRecording(true);
        setIsListening(true);
      };
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentInput(transcript);
        setIsListening(false);
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsRecording(false);
      };
    }
    
    synthesisRef.current = window.speechSynthesis;
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, [currentLanguage]);

  const getCurrentLanguageCode = () => {
    const langCodes: { [key: string]: string } = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'ta': 'ta-IN',
      'kn': 'kn-IN',
      'bn': 'bn-IN',
      'te': 'te-IN',
      'ml': 'ml-IN',
      'gu': 'gu-IN',
      'mr': 'mr-IN',
      'pa': 'pa-IN'
    };
    return langCodes[currentLanguage] || 'en-US';
  };

  const startListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use the text input instead.');
      return;
    }
    
    try {
      setCurrentInput('');
      recognitionRef.current.lang = getCurrentLanguageCode();
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      setIsRecording(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setIsRecording(false);
  };

  const speak = async (text: string) => {
    if (!synthesisRef.current) return;
    
    setIsSpeaking(true);
    synthesisRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getCurrentLanguageCode();
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };
    
    synthesisRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('job') || lowerMessage.includes('नौकरी') || lowerMessage.includes('வேலை')) {
      return "I can help you find job opportunities! Based on your profile, I found several suitable positions. Would you like me to create a resume for you or search for specific job types? I can also help you prepare for interviews.";
    }
    
    if (lowerMessage.includes('form') || lowerMessage.includes('application') || lowerMessage.includes('document')) {
      return "I can help you create various forms and applications. What type of document do you need? For example, RTI application, bank forms, police complaints, or government scheme applications? Just tell me what you need and I'll guide you through it.";
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('worried') || lowerMessage.includes('anxiety') || lowerMessage.includes('sad')) {
      return "I understand you're feeling stressed. Let me suggest some government mental health resources and relaxation techniques. Would you also like me to schedule reminders for self-care activities? Remember, it's okay to seek help.";
    }
    
    if (lowerMessage.includes('scheme') || lowerMessage.includes('benefit') || lowerMessage.includes('government')) {
      return "I can help you find government schemes you're eligible for. Based on your location and profile, here are some schemes you might qualify for. Would you like detailed information about any specific scheme like PM Mudra Loan, Pradhan Mantri Awas Yojana, or Skill India Mission?";
    }

    if (lowerMessage.includes('learn') || lowerMessage.includes('study') || lowerMessage.includes('course')) {
      return "Great! I can help you with learning opportunities. We have interactive modules on digital literacy, financial planning, legal rights, and job skills. Which topic interests you most? I can also suggest free online courses based on your goals.";
    }

    if (lowerMessage.includes('emergency') || lowerMessage.includes('help') || lowerMessage.includes('urgent')) {
      return "If this is an emergency, please call the appropriate emergency number: Police (100), Fire (101), Ambulance (108). For non-emergency help, I'm here to assist you with any daily life problems. What specific help do you need?";
    }
    
    return "Hello! I'm your AI assistant, here to help you with daily life problems. You can ask me about jobs, government schemes, creating forms, managing tasks, learning new skills, or any other assistance you need. How can I help you today?";
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return;
    
    setIsProcessing(true);
    
    // Analyze emotion from user input
    analyzeText(currentInput);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentInput.trim(),
      timestamp: new Date(),
      language: currentLanguage,
      emotion: emotionState.currentEmotion
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(currentInput);
      
      // Translate response if needed
      const translatedResponse = currentLanguage === 'en' ? aiResponse : await translate(aiResponse);
      
      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: translatedResponse,
        timestamp: new Date(),
        language: currentLanguage
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Speak the response
      setTimeout(() => {
        speak(translatedResponse);
      }, 500);
      
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        language: currentLanguage
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
      setCurrentInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Mic className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice Assistant</h1>
          <p className="text-gray-600">Speak naturally in your preferred language</p>
          
          {!speechSupported && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-orange-800 text-sm">
                Voice recognition is not supported in your browser. Please use the text input instead.
              </p>
            </div>
          )}
        </div>

        {/* Voice Controls */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Voice Waveform */}
            <VoiceWaveform isActive={isListening || isSpeaking || isRecording} />
            
            {/* Main Voice Button */}
            <motion.button
              whileHover={{ scale: speechSupported ? 1.05 : 1 }}
              whileTap={{ scale: speechSupported ? 0.95 : 1 }}
              onClick={isListening ? stopListening : startListening}
              disabled={!speechSupported || isProcessing}
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening || isRecording
                  ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 animate-pulse'
                  : speechSupported 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 hover:shadow-lg hover:shadow-purple-200'
                    : 'bg-gray-400 cursor-not-allowed'
              } disabled:opacity-50`}
            >
              {isListening || isRecording ? (
                <MicOff className="h-12 w-12 text-white" />
              ) : (
                <Mic className="h-12 w-12 text-white" />
              )}
            </motion.button>

            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">
                {isRecording ? 'Recording...' : 
                 isListening ? 'Listening...' : 
                 speechSupported ? 'Tap to speak' : 'Voice not supported'}
              </p>
              {emotionState.currentEmotion !== 'neutral' && (
                <p className={`text-sm text-${emotionState.colorTheme}-600 mt-1`}>
                  I sense you're feeling {emotionState.currentEmotion}
                </p>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={isSpeaking ? stopSpeaking : undefined}
                disabled={!isSpeaking}
                className={`p-3 rounded-lg transition-colors ${
                  isSpeaking
                    ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              
              {speechSupported && (
                <div className="text-xs text-gray-500 text-center">
                  <p>Language: {currentLanguage.toUpperCase()}</p>
                  <p>Status: {isRecording ? 'Recording' : 'Ready'}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Text Input Alternative */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Or type your message</h3>
          
          <div className="flex space-x-4">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your question or problem here..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!currentInput.trim() || isProcessing}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Suggestions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Help me find a job",
              "Create an RTI application",
              "Show me government schemes",
              "I need to learn new skills",
              "Help with form filling",
              "Emergency assistance"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setCurrentInput(suggestion)}
                className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation History */}
        <ConversationHistory messages={messages} />
        
        {/* Voice Settings */}
        <VoiceSettings />
      </motion.div>
    </div>
  );
}