import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import Footer from './components/Layout/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import VoiceAssistant from './components/VoiceAssistant/VoiceAssistant';
import FormCreator from './components/Forms/FormCreator';
import ProblemSolver from './components/ProblemSolver/ProblemSolver';
import GovSchemes from './components/GovSchemes/GovSchemes';
import TaskScheduler from './components/Tasks/TaskScheduler';
import ResumeBuilder from './components/Resume/ResumeBuilder';
import DigitalLocker from './components/Locker/DigitalLocker';
import EmergencyHelp from './components/Emergency/EmergencyHelp';
import LearningModules from './components/Learning/LearningModules';
import Settings from './components/Settings/Settings';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import { EmotionProvider } from './contexts/EmotionContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const authStatus = localStorage.getItem('zenaa-auth');
      setIsAuthenticated(authStatus === 'true');
    };
    
    checkAuth();

    // Apply saved theme on app load
    const savedTheme = localStorage.getItem('zenaa-theme') || 'light';
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeId: string) => {
    const themes = {
      light: { bg: '#FFFFFF', text: '#111827', secondary: '#F9FAFB', textSecondary: '#6B7280' },
      dark: { bg: '#1F2937', text: '#F9FAFB', secondary: '#374151', textSecondary: '#D1D5DB' },
      nature: { bg: '#F0FDF4', text: '#14532D', secondary: '#DCFCE7', textSecondary: '#166534' },
      sunset: { bg: '#FEF3C7', text: '#92400E', secondary: '#FDE68A', textSecondary: '#B45309' },
      ocean: { bg: '#EFF6FF', text: '#1E3A8A', secondary: '#DBEAFE', textSecondary: '#1D4ED8' },
      auto: { bg: '#FFFFFF', text: '#111827', secondary: '#F9FAFB', textSecondary: '#6B7280' }
    };

    const theme = themes[themeId as keyof typeof themes] || themes.light;
    const root = document.documentElement;
    
    root.style.setProperty('--bg-primary', theme.bg);
    root.style.setProperty('--bg-secondary', theme.secondary);
    root.style.setProperty('--text-primary', theme.text);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    
    document.body.style.backgroundColor = theme.bg;
    document.body.style.color = theme.text;
    document.body.classList.add(`theme-${themeId}`);
  };

  // Show authentication pages if not authenticated
  if (!isAuthenticated) {
    return (
      <LanguageProvider>
        <div style={{ backgroundColor: 'var(--bg-primary, #FFFFFF)', minHeight: '100vh' }}>
          <Routes>
            <Route path="/signin" element={<SignIn onSignIn={() => setIsAuthenticated(true)} />} />
            <Route path="*" element={<SignUp onSignUp={() => setIsAuthenticated(true)} />} />
          </Routes>
        </div>
      </LanguageProvider>
    );
  }

  return (
    <UserProvider>
      <LanguageProvider>
        <EmotionProvider>
          <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary, #F9FAFB)' }}>
            <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            
            <div className="flex flex-1">
              {/* Sidebar - Always visible on desktop, toggleable on mobile */}
              <div className="hidden lg:block">
                <Sidebar onClose={() => setSidebarOpen(false)} />
              </div>

              {/* Mobile Sidebar Overlay */}
              <AnimatePresence>
                {sidebarOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
                      onClick={() => setSidebarOpen(false)}
                    />
                    <motion.div
                      initial={{ x: -280 }}
                      animate={{ x: 0 }}
                      exit={{ x: -280 }}
                      transition={{ type: "spring", damping: 20 }}
                      className="lg:hidden"
                    >
                      <Sidebar onClose={() => setSidebarOpen(false)} />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              <main className="flex-1 min-h-0 lg:ml-0">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/voice" element={<VoiceAssistant />} />
                  <Route path="/forms" element={<FormCreator />} />
                  <Route path="/solver" element={<ProblemSolver />} />
                  <Route path="/schemes" element={<GovSchemes />} />
                  <Route path="/tasks" element={<TaskScheduler />} />
                  <Route path="/resume" element={<ResumeBuilder />} />
                  <Route path="/locker" element={<DigitalLocker />} />
                  <Route path="/emergency" element={<EmergencyHelp />} />
                  <Route path="/learning" element={<LearningModules />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/signin" element={<SignIn onSignIn={() => setIsAuthenticated(true)} />} />
                  <Route path="/signup" element={<SignUp onSignUp={() => setIsAuthenticated(true)} />} />
                </Routes>
              </main>
            </div>
            
            <Footer />
          </div>
        </EmotionProvider>
      </LanguageProvider>
    </UserProvider>
  );
}

export default App;