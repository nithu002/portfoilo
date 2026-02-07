import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import HeroBackground from './HeroBackground';

const Hero: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <HeroBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-6 inline-block">
            <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-primary text-sm font-medium tracking-wider">
              OPEN FOR COLLABORATION
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter"
          >
            Senior <span className="text-gradient">Software Engineer</span>
            <br />
            Architecting Digital Excellence
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            Specializing in building high-performance, scalable web applications 
            with a focus on premium user experiences and robust architecture.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mb-16">
            <button className="px-8 py-4 rounded-full bg-primary text-black font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              View My Work
            </button>
            <a 
              href="/resume.pdf" 
              download 
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 transition-all text-center flex items-center justify-center"
            >
              Download CV
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex justify-center gap-8">
            {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary transition-colors bg-white/5 backdrop-blur-sm"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-white/20 flex justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
