import React from 'react';
import { motion } from 'framer-motion';

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM"
];

interface TimeSlotGridProps {
  onSelect: (time: string) => void;
  selectedTime?: string;
}

const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({ onSelect, selectedTime }) => {
  return (
    <div className="p-4 pt-2">
      <h4 className="text-xs font-semibold text-zinc-500 uppercase mb-3 px-1">Available Times</h4>
      <div className="grid grid-cols-2 gap-2">
        {TIME_SLOTS.map((time) => (
          <motion.button
            key={time}
            whileHover={{ y: -1, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(time)}
            className={`rounded-xl border border-white/10 p-3 text-center text-xs transition-all ${
              selectedTime === time
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                : 'bg-white/5 text-zinc-300'
            }`}
          >
            {time}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotGrid;
