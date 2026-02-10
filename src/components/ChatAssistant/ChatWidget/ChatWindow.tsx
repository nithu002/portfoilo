import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatWindowProps {
  isOpen: boolean;
  isMaximized?: boolean;
  children: React.ReactNode;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, isMaximized, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={isMaximized ? { opacity: 0, scale: 0.95 } : { opacity: 0, scale: 0.8, y: 20, x: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            x: 0,
            width: isMaximized ? 'min(1000px, 95vw)' : undefined,
            height: isMaximized ? 'min(800px, 85vh)' : undefined,
          }}
          exit={isMaximized ? { opacity: 0, scale: 0.95 } : { opacity: 0, scale: 0.9, y: 20, x: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={`fixed z-[110] flex flex-col overflow-hidden bg-black shadow-2xl backdrop-blur-2xl Transition-all duration-300
            ${isMaximized 
              ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-white/20' 
              : 'bottom-0 right-0 h-screen w-full sm:bottom-28 sm:right-5 sm:h-[650px] sm:w-[420px] sm:rounded-[24px] sm:border sm:border-white/10 sm:bg-black/80'}`}
        >
            {/* Subtle gradient border effect */}
            <div className="absolute inset-0 pointer-events-none rounded-[24px] border border-transparent [background:linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.05))_border-box] [mask-image:linear-gradient(#fff,#fff)_padding-box,linear-gradient(#fff,#fff)] [mask-composite:exclude]" />
            
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[100px] animate-pulse" />
            </div>

            {children}
          </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWindow;
