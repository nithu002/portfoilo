import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CalendarPickerProps {
  onDateSelect: (date: Date) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
  };

  const isSelected = (day: number) => {
    return selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth() && selectedDate?.getFullYear() === currentDate.getFullYear();
  };

  return (
    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between mb-4 px-2">
        <h4 className="text-sm font-semibold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        <div className="flex gap-2">
          <button onClick={handlePrevMonth} className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button onClick={handleNextMonth} className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <span key={day} className="text-[10px] font-bold text-zinc-500 uppercase">{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map(i => <div key={`empty-${i}`} />)}
        {days.map(day => (
          <motion.button
            key={day}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              setSelectedDate(d);
              onDateSelect(d);
            }}
            className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs transition-all ${
              isSelected(day)
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                : isToday(day)
                ? 'border border-blue-500/50 text-blue-400'
                : 'text-zinc-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {day}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CalendarPicker;
