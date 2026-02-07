import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { Code2, Terminal, Cpu, Cloud, Database, Globe, Maximize2, X } from 'lucide-react';

const About: React.FC = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const stats = [
    { label: 'Years Experience', value: '4+' },
    { label: 'Projects Completed', value: '30+' },
    { label: 'Happy Clients', value: '25+' },
    { label: 'Awards Won', value: '1' },
  ];

  const coreSkills = [
    { icon: Code2, label: 'Frontend', tech: 'React, Next.js, TS' },
    { icon: Terminal, label: 'Backend', tech: 'Node, Python, Laravel' },
    { icon: Database, label: 'Database', tech: 'PostgreSQL, MySQL' },
    { icon: Cloud, label: 'Cloud', tech: 'AWS, Azure, GCP' },
    { icon: Cpu, label: 'Architecture', tech: 'Microservices, DDD' },
    { icon: Globe, label: 'Web3', tech: 'Solidity, Ethers' },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Photo Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative group perspective-1000">
              <motion.div
                whileHover={{ rotateY: 10, rotateX: -5, scale: 1.02 }}
                onClick={() => setIsLightboxOpen(true)}
                className="relative z-10 w-full aspect-square rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
              >
                {/* Image with object-cover to fill the card */}
                <img 
                  src="/my image.png" 
                  alt="Professional Photo" 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Hover Overlay with Icon */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="bg-black/60 backdrop-blur-md p-4 rounded-full border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Maximize2 className="text-white" size={24} />
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full" />
            </div>
          </motion.div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {isLightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsLightboxOpen(false)}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-7xl max-h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img 
                    src="/my image.png" 
                    alt="Full View" 
                    className="max-w-full max-h-[85vh] rounded-xl shadow-2xl border border-white/10 object-contain"
                  />
                  
                  <div className="absolute -top-12 right-0 flex items-center gap-4">
                    <button 
                      onClick={() => setIsLightboxOpen(false)}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-white/60 text-sm font-medium tracking-widest uppercase">Full Professional Profile View</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Passion for <span className="text-gradient">Innovation</span> & <span className="text-gradient">Excellence</span>
            </h2>
            <p className="text-lg text-white/70 mb-12 leading-relaxed">
              I am a results-driven Senior Software Engineer with a decade of experience 
              architecting complex systems and leading cross-functional teams. My philosophy 
              centers on the intersection of clean, scalable code and exceptional user 
              experience. I thrive on solving difficult problems and turning ambitious 
              ideas into reality.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <h3 className="text-3xl font-bold text-primary mb-1">{stat.value}</h3>
                  <p className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Core Skills Tags */}
            <div className="flex flex-wrap gap-4">
              {coreSkills.map((skill, i) => (
                <GlassCard 
                  key={i} 
                  className="px-4 py-3 flex items-center gap-3 border-white/5 hover:border-primary/30"
                >
                  <skill.icon size={18} className="text-primary" />
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-tighter mb-0.5">{skill.label}</p>
                    <p className="text-sm font-semibold whitespace-nowrap">{skill.tech}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
