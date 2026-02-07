import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, animate = true }) => {
  const Component = animate ? motion.div : 'div';

  return (
    <Component
      whileHover={animate ? { y: -5, scale: 1.02 } : undefined}
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-colors hover:bg-white/10 hover:border-white/20",
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </Component>
  );
};

export default GlassCard;
