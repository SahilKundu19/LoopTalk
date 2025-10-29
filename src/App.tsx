import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LandingPage } from './components/landing-page';
import { LoginPage } from './components/login-page';
import { SignupPage } from './components/signup-page';
import { ChatArea } from './components/chat-area';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { Loader2 } from 'lucide-react';
import { Toaster } from 'sonner';

// Main App Component with Auth State Management
function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'signup' | 'chat'>('landing');
  const [selectedChat, setSelectedChat] = useState(1);

  // Update view based on auth state
  useEffect(() => {
    if (!loading) {
      if (user) {
        setCurrentView('chat');
      } else if (currentView === 'chat') {
        setCurrentView('landing');
      }
    }
  }, [user, loading]);

  const handleEnterChat = () => {
    setCurrentView('login');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleSwitchToSignup = () => {
    setCurrentView('signup');
  };

  const handleSendMessage = (message: string) => {
    // This will be handled by the ChatContext now
    console.log('Sending message:', message);
  };

  // Show loading screen while checking auth state
  if (loading) {
    return (
      <div className="size-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"
          >
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Loading ChatFlow...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // If user is authenticated, show chat interface
  if (user && currentView === 'chat') {
    return (
      <ChatProvider>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="size-full flex relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                background: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
              }}
            />
          </div>
          
          {/* Floating shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-blue-200 rounded-full opacity-20"
                animate={{
                  y: [0, -50, 0],
                  rotate: [0, 180],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                }}
              />
            ))}
          </div>

          {/* Main Chat Interface */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex size-full relative z-10"
          >
            <ChatArea 
              selectedChat={selectedChat} 
              setSelectedChat={setSelectedChat}
              onSendMessage={handleSendMessage}
            />
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-20 pointer-events-none blur-sm" />
          <div className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full opacity-20 pointer-events-none blur-sm" />
        </motion.div>
      </ChatProvider>
    );
  }

  // Landing Page
  if (currentView === 'landing') {
    return <LandingPage onEnterChat={handleEnterChat} />;
  }

  // Login Page
  if (currentView === 'login') {
    return <LoginPage onSwitchToSignup={handleSwitchToSignup} />;
  }

  // Signup Page
  if (currentView === 'signup') {
    return <SignupPage onSwitchToLogin={handleSwitchToLogin} />;
  }

  return null;
}

// Main App Component with Providers
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster 
        position="top-right"
        richColors
        theme="system"
        closeButton
      />
    </AuthProvider>
  );
}