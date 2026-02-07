import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 250 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const checkPointer = () => {
      const hoveredElement = document.querySelector(':hover');
      if (hoveredElement) {
        const style = window.getComputedStyle(hoveredElement);
        setIsPointer(style.cursor === 'pointer');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', checkPointer);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', checkPointer);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-primary mix-blend-difference pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isPointer ? 1.5 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-primary/30 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isPointer ? 1.8 : 1,
          left: -8,
          top: -8,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      />
    </>
  );
};

export default CustomCursor;
