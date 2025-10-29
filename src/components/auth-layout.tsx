import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MessageCircle } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Progressive loading simulation
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 flex flex-col lg:flex-row">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Left side - Form */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 flex items-center justify-center p-4 md:p-8 relative z-10 min-h-screen lg:min-h-0"
      >
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"
              >
                <MessageCircle size={20} className="text-white" />
              </motion.div>
            <span className="text-2xl text-white">ChatFlow</span>
            </div>

          {/* Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-3xl text-white">{title}</h1>
            <p className="text-gray-400">{subtitle}</p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: loadingComplete ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Visual */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="flex-1 hidden lg:flex items-center justify-center p-8 relative"
      >
        <div className="relative w-full max-w-lg">
          {/* Grid background */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 opacity-20">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.8 + (i * 0.1), 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                className="bg-white/10 rounded-lg backdrop-blur-sm border border-white/20"
              />
            ))}
          </div>

          {/* Main visual */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
            className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <ImageWithFallback
              src="src/assets/b571fbff29327b47d4d0190560775f9c5dffa304.png"
              alt="Futuristic Technology"
              className="w-full h-64 object-cover rounded-lg"
            />
            
            {/* Floating elements */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center"
            >
              <div className="w-8 h-8 bg-white/90 rounded-lg" />
            </motion.div>

            <motion.div
              animate={{
                y: [10, -10, 10],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full flex items-center justify-center"
            >
              <div className="w-6 h-6 bg-white/90 rounded-full" />
            </motion.div>
          </motion.div>

          {/* Scale up info card */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="absolute bottom-8 right-0 bg-gradient-to-r from-cyan-400 to-blue-400 p-4 rounded-lg max-w-48"
          >
            <h3 className="text-black mb-1">Scale Up</h3>
            <p className="text-black/70 text-sm">Connect and chat with people around the world</p>
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mt-2 w-8 h-1 bg-black/30 rounded-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}