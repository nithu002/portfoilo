import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Coffee, MessageCircle, Briefcase } from 'lucide-react';

export type MeetingType = {
  id: string;
  title: string;
  duration: string;
  icon: React.ReactNode;
  description: string;
};

const MEETING_TYPES: MeetingType[] = [
  { id: '15', title: 'Quick Chat', duration: '15 min', icon: <Coffee size={20} />, description: 'A brief talk to say hello.' },
  { id: '30', title: 'Consultation', duration: '30 min', icon: <MessageCircle size={20} />, description: 'Discussing project ideas.' },
  { id: '60', title: 'Project Talk', duration: '60 min', icon: <Briefcase size={20} />, description: 'Deep dive into collaboration.' }
];

interface MeetingTypeSelectorProps {
  onSelect: (type: MeetingType) => void;
}

const MeetingTypeSelector: React.FC<MeetingTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col gap-3 p-4">
      {MEETING_TYPES.map((type) => (
        <motion.button
          key={type.id}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(type)}
          className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left Transition-all hover:border-blue-500/50 hover:bg-white/10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
            {type.icon}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white">{type.title}</h4>
            <p className="text-xs text-zinc-400">{type.description}</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-medium text-zinc-500 uppercase">
            <Clock size={12} />
            <span>{type.duration}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default MeetingTypeSelector;
