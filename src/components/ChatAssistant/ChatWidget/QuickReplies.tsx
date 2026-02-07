import React from 'react';
import { motion } from 'framer-motion';
import type { QuickReply } from '../types';

interface QuickRepliesProps {
  replies: QuickReply[];
  onReplyClick: (reply: QuickReply) => void;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ replies, onReplyClick }) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 pt-0">
      {replies.map((reply, index) => (
        <motion.button
          key={reply.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onReplyClick(reply)}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-300 transition-all hover:border-blue-500/50 hover:bg-white/10 hover:text-white"
        >
          {reply.label}
        </motion.button>
      ))}
    </div>
  );
};

export default QuickReplies;
