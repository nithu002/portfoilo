import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface VisitorInfo {
  name: string;
  email: string;
  company?: string;
  notes?: string;
}

interface VisitorInfoFormProps {
  onSubmit: (info: VisitorInfo) => void;
}

const VisitorInfoForm: React.FC<VisitorInfoFormProps> = ({ onSubmit }) => {
  const [info, setInfo] = useState<VisitorInfo>({ name: '', email: '', company: '', notes: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (info.name && info.email) {
      onSubmit(info);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Full Name *</label>
        <input
          required
          type="text"
          value={info.name}
          onChange={(e) => setInfo({ ...info, name: e.target.value })}
          className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
          placeholder="John Doe"
        />
      </div>
      
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Email Address *</label>
        <input
          required
          type="email"
          value={info.email}
          onChange={(e) => setInfo({ ...info, email: e.target.value })}
          className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
          placeholder="john@example.com"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Company (Optional)</label>
        <input
          type="text"
          value={info.company}
          onChange={(e) => setInfo({ ...info, company: e.target.value })}
          className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
          placeholder="Acme Inc."
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Message/Notes (Optional)</label>
        <textarea
          rows={3}
          value={info.notes}
          onChange={(e) => setInfo({ ...info, notes: e.target.value })}
          className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
          placeholder="Briefly describe what you'd like to discuss..."
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-sm font-bold text-white shadow-lg transition-all hover:shadow-blue-500/20"
      >
        Confirm Booking
      </motion.button>
    </form>
  );
};

export default VisitorInfoForm;
