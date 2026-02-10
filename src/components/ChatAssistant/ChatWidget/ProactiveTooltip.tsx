import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ProactiveTooltipProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const ProactiveTooltip: React.FC<ProactiveTooltipProps> = ({ message, isVisible, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 8000); // Hide after 8 seconds
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50, x: 20, rotate: -5 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: [0, -10, 0], // Floating effect
            x: 0,
            rotate: 0,
          }}
          exit={{ opacity: 0, scale: 0.8, y: 20, x: 10, transition: { duration: 0.2 } }}
          transition={{ 
            type: "spring", 
            damping: 12, 
            stiffness: 200,
            y: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }
          }}
          className="fixed bottom-[110px] right-8 z-[110] flex max-w-[300px] flex-col gap-2"
        >
          <div className="relative rounded-2xl border border-white/10 bg-black/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden group">
            {/* Animated Background Shimmer */}
            <motion.div 
              animate={{ 
                x: ['-100%', '200%'],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3, 
                ease: "linear",
                repeatDelay: 2
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
            />

            {/* Glowing Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute -bottom-2 right-6 h-5 w-5 rotate-45 border-b border-r border-white/10 bg-black/90 backdrop-blur-2xl" />
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShow(false);
                onClose();
              }}
              className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-zinc-900/80 text-zinc-400 hover:bg-red-500/20 hover:text-white transition-all z-20"
            >
              <X size={14} />
            </button>

            <div className="flex items-start gap-4">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20"
              >
                <span className="text-xl">🤖</span>
              </motion.div>
              <div className="pt-0.5">
                <p className="text-sm font-semibold text-white/90 leading-snug">
                  {message}
                </p>
                <p className="text-[10px] text-blue-400 mt-1.5 font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity italic">
                  Click to Chat
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProactiveTooltip;
