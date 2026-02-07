import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose, onMinimize, onMaximize }) => {
  return (
    <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-white/5 p-4 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10">
          <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
               <motion.span 
                 animate={{ opacity: [1, 1, 0, 1, 1] }}
                 transition={{ repeat: Infinity, duration: 4, times: [0, 0.45, 0.5, 0.55, 1] }}
                 className="text-xl"
               >
                 🤖
               </motion.span>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black bg-green-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
          <p className="text-[10px] text-zinc-400">● Online - Typically replies instantly</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button onClick={onMinimize} className="rounded-md p-1.5 text-zinc-400 Transition-colors hover:bg-white/10 hover:text-white">
          <Minus size={18} />
        </button>
        <button onClick={onMaximize} className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white hidden sm:block">
          <Square size={14} />
        </button>
        <button onClick={onClose} className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-red-500/20 hover:text-red-500">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
