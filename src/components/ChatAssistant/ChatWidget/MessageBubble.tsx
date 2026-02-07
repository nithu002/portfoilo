import React from 'react';
import { motion } from 'framer-motion';
import { CheckCheck } from 'lucide-react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAI = message.sender === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, x: isAI ? -20 : 20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 150 }}
      className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`group flex max-w-[85%] flex-col gap-1 ${isAI ? 'items-start' : 'items-end'}`}>
        <div
          className={`relative rounded-[20px] px-4 py-3 text-sm shadow-lg backdrop-blur-md ${
            isAI
              ? 'rounded-tl-none border border-white/10 bg-white/5 text-zinc-100'
              : 'rounded-tr-none bg-gradient-to-br from-blue-600 to-purple-600 text-white'
          }`}
        >
          {message.text}
          
          <div className={`mt-1 flex items-center gap-1 text-[10px] opacity-0 transition-opacity group-hover:opacity-100 ${isAI ? 'text-zinc-500' : 'text-zinc-200 justify-end'}`}>
            <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            {!isAI && <CheckCheck size={12} className="text-blue-300" />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
