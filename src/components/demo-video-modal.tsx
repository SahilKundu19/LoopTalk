"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DemoVideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center">
      {/* 🎬 Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-blue-600 hover-text-white text-black text-md shadow-lg transition-all duration-300"
      >
        🎬 Watch Demo Video
      </button>

      {/* 🪟 Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Video Frame */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative bg-black border-4 border-black rounded-2xl overflow-hidden shadow-2xl w-[70%] max-w-2xl aspect-video flex items-center justify-center">
                
                {/* 🎞 Video */}
                <video
                  ref={videoRef}
                  src="src/assets/Chat_Video_With_Mobile_View.mp4" // ✅ ensure it's in /public
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />

                {/* ❌ Close Button - Visible on Frame */}
                <div>
                <button
                  onClick={handleClose}
                  className="absolute bg-white text-black hover:bg-blue-600 hover:text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow-lg border border-black transition-all duration-200"
                  title="Close Video"
                  style={{ top: '10px', right: '10px' }}
                >
                  ×
                </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
