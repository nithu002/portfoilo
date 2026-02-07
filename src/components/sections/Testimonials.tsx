import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "VP of Engineering at TechNova",
    content: "One of the most talented engineers I've ever worked with. Their ability to simplify complex problems and deliver high-quality solutions is truly remarkable.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Product Manager at CloudScale",
    content: "The attention to detail and dedication to user experience is evident in every piece of code. A true asset to any development team.",
    avatar: "https://i.pravatar.cc/150?u=michael",
    rating: 5
  },
  {
    name: "Emma Williams",
    role: "CEO at StartUp Logic",
    content: "Exceptional architectural vision and leadership skills. They helped us scale our platform from 10k to 500k users in less than 6 months.",
    avatar: "https://i.pravatar.cc/150?u=emma",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, [next, isPaused]);

  // Logic to get the two items to display
  const firstIndex = current;
  const secondIndex = (current + 1) % testimonials.length;

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Client <span className="text-gradient">Testimonials</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Kind words from colleagues and clients I've had the pleasure of working with.
          </p>
        </motion.div>

        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {[firstIndex, secondIndex].map((idx, i) => (
                <motion.div
                  key={`${idx}-${i}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <GlassCard className="p-10 text-center border-primary/20 bg-primary/5 h-full flex flex-col justify-between">
                    <div>
                      <Quote size={40} className="text-primary/20 mb-6 mx-auto" />
                      
                      <div className="flex justify-center gap-1 mb-6">
                        {[...Array(testimonials[idx].rating)].map((_, i) => (
                          <Star key={i} size={14} className="fill-primary text-primary" />
                        ))}
                      </div>

                      <p className="text-lg md:text-xl text-white/90 font-serif leading-relaxed mb-8 italic">
                        "{testimonials[idx].content}"
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <img 
                        src={testimonials[idx].avatar} 
                        alt={testimonials[idx].name}
                        className="w-16 h-16 rounded-full border-2 border-primary mb-3 p-1"
                      />
                      <h4 className="text-lg font-bold">{testimonials[idx].name}</h4>
                      <p className="text-white/50 text-xs uppercase tracking-widest mt-1">{testimonials[idx].role}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prev}
              className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

