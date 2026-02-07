import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, Mail, ExternalLink } from 'lucide-react';

interface ConfirmationCardProps {
  details: {
    type: string;
    date: Date;
    time: string;
    email: string;
  };
  onClose: () => void;
}

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({ details, onClose }) => {
  return (
    <div className="flex flex-col items-center p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
      >
        <CheckCircle size={40} />
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-2 text-2xl font-bold text-white"
      >
        Meeting Scheduled!
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8 text-sm text-zinc-400"
      >
        A calendar invitation has been sent to your email.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8 w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-left"
      >
        <div className="mb-4 flex items-center gap-3">
          <Calendar size={18} className="text-blue-400" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-zinc-500 font-bold">Date</span>
            <span className="text-sm text-white font-medium">{details.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        
        <div className="mb-4 flex items-center gap-3">
          <Clock size={18} className="text-purple-400" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-zinc-500 font-bold">Time</span>
            <span className="text-sm text-white font-medium">{details.time} (Your Timezone)</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Mail size={18} className="text-pink-400" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-zinc-500 font-bold">Confirmation Email</span>
            <span className="text-sm text-white font-medium">{details.email}</span>
          </div>
        </div>
      </motion.div>
      
      <div className="flex w-full flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 p-4 text-sm font-semibold text-white Transition-all hover:bg-white/10"
        >
          <ExternalLink size={16} />
          Add to Google Calendar
        </motion.button>
        
        <button 
          onClick={onClose}
          className="p-2 text-sm text-zinc-500 hover:text-white transition-colors"
        >
          Go Back to Chat
        </button>
      </div>
    </div>
  );
};

export default ConfirmationCard;
