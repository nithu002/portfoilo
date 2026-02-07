import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { Briefcase, MapPin } from 'lucide-react';

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "ZB Solutions (PVT) LTD",
    duration: "2025 - Present",
    location: "Kattankudy, Batticaloa, Sri Lanka",
    description: "Engineered Restaurant POS microservices (Laravel, React.js, MySQL, Python) processing 1,000+ daily orders with 99.99% uptime, reducing latency by 60% and serving 200+ API endpoints. Optimized database queries resulting in a 40% performance boost.",
    tech: ["Laravel", "React.js", "MySQL", "Python","Vanila JS","PHP"],
  },
  {
    role: "Software Engineer",
    company: "Scopelayer Private Limited",
    duration: "2024 - 2025",
    location: "Colombo, Sri Lanka",
    description: "Designed and implemented scalable cloud infrastructure using AWS. Led a team of 4 developers to deliver a mission-critical financial application.",
    tech: ["React", "Laravel", "AWS", "Tailwind CSS"],
  },
  {
    role: "Associate Software Engineer",
    company: "GoSetup Private Limited",
    duration: "2023 - 2024",
    location: "Batticaloa, Sri Lanka",
    description: "Built high-performance e-commerce applications with a focus on interactive UI/UX. Collaborative development of internal tools and client projects.",
    tech: ["Laravel", "React.js", "MySQL", "Tailwind CSS","Wordpress"],
  },
   {
    role: "Intern Software Engineer",
    company: "GoSetup Private Limited",
    duration: "2022 - 2023",
    location: "Batticaloa, Sri Lanka",
    description: "Self-learned full-stack web development and applied it in real-world projects. Contributed to the development of various web applications using Laravel, React.js, MySQL, and Tailwind CSS.",
    tech: ["Laravel", "React.js", "MySQL", "Tailwind CSS","Wordpress"],
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional <span className="text-gradient">Journey</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A timeline of my professional growth, technical leadership, and the impact I've made throughout my career.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent-purple/50 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-4px] md:left-1/2 md:-translate-x-1/2 top-4 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,240,255,0.8)] z-10" />

                <div className="w-full md:w-1/2 pl-8 md:pl-0">
                  <GlassCard className="hover:border-primary/30 transition-all group">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {exp.duration}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-white/50 mb-6 font-medium">
                      <span className="flex items-center gap-1.5"><Briefcase size={14} /> {exp.company}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {exp.location}</span>
                    </div>
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
