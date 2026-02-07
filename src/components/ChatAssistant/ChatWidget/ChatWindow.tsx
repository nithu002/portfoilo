import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatWindowProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 right-0 z-50 flex h-screen w-full flex-col overflow-hidden bg-black shadow-2xl backdrop-blur-2xl sm:bottom-28 sm:right-5 sm:h-[650px] sm:w-[420px] sm:rounded-[24px] sm:border sm:border-white/10 sm:bg-black/80 md:right-5"
        >
          {/* Subtle gradient border effect */}
          <div className="absolute inset-0 pointer-events-none rounded-[24px] border border-transparent [background:linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.05))_border-box] [mask-image:linear-gradient(#fff,#fff)_padding-box,linear-gradient(#fff,#fff)] [mask-composite:exclude]" />
          
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWindow;
