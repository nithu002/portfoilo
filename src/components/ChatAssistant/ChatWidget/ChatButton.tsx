import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  unreadCount?: number;
}

const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, onClick, unreadCount = 0 }) => {
  return (
    <motion.div
      className="fixed bottom-5 right-5 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.button
        onClick={onClick}
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg backdrop-blur-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: !isOpen && unreadCount > 0 ? [1, 1.1, 1] : 1,
          boxShadow: [
            "0 0 0 0px rgba(99, 102, 241, 0.4)",
            "0 0 0 20px rgba(99, 102, 241, 0)",
          ],
        }}
        transition={{
          scale: {
            duration: 0.5,
            repeat: !isOpen && unreadCount > 0 ? 2 : 0,
            repeatType: "reverse"
          },
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div className="absolute inset-0 rounded-full border border-white/20 bg-white/10" />
        {isOpen ? (
          <X size={32} className="relative z-10" />
        ) : (
          <MessageSquare size={32} className="relative z-10" />
        )}

        {!isOpen && unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold shadow-lg"
            transition={{ type: "spring", damping: 10, stiffness: 200 }}
          >
            {unreadCount}
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
};

export default ChatButton;
