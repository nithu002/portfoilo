import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, ExternalLink, BookOpen } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const education = [
  {
    institution: "European International University, Paris",
    degree: "BSc in IT & Data Science",
    duration: "2024 - 2027",
    honors: "Specialization in Artificial Intelligence & Data Science",
    achievements: ["Expected Graduation: 2027"],
    logo: "🎓"
  },
  {
    institution: "St. Michael's College National School",
    degree: "G.C.E Advanced Level (A/L)",
    duration: "2020 - 2022",
    honors: "",
    achievements: [""],
    logo: "🎓"
  }
];

const certifications = [
  {
    title: "Certified Generative AI Professional Certificate",
    issuer: "Microsoft",
    date: "2024",
    link: "#",
    id: "MS-GENAI-2024",
    color: "from-orange-500 to-rose-500"
  },
  {
    title: "Web Design",
    issuer: "University of Moratuwa",
    date: "2020",
    link: "#",
    id: "UOM-WD-2020",
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "AI/ML Engineer Professional Certificate",
    issuer: "SLIIT University",
    date: "2024",
    link: "#",
    id: "SLIIT-AI-2024",
    color: "from-purple-500 to-indigo-500"
  },
  {
    title: "Amazon Q Developer",
    issuer: "Amazon",
    date: "2025",
    link: "#",
    id: "AWS-Q-2025",
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "Internship on AI & Data Analytics",
    issuer: "Panteach Pvt Ltd",
    date: "2024",
    link: "#",
    id: "PAN-AI-2024",
    color: "from-emerald-400 to-teal-500"
  },
  {
    title: "Data Analysis with Python",
    issuer: "IBM",
    date: "2024",
    link: "#",
    id: "IBM-DA-2024",
    color: "from-blue-600 to-blue-400"
  },
  {
    title: "Application of Machine Learning in Finance",
    issuer: "Great Learning",
    date: "2024",
    link: "#",
    id: "GL-FIN-2024",
    color: "from-rose-400 to-pink-600"
  },
  {
    title: "Data Visualization in Tableau",
    issuer: "Great Learning",
    date: "2024",
    link: "#",
    id: "GL-TAB-2024",
    color: "from-yellow-400 to-orange-500"
  },
  {
    title: "Cloud Computing & Architecture",
    issuer: "Digital Adda",
    date: "2020",
    link: "#",
    id: "DA-CC-2020",
    color: "from-indigo-500 to-purple-600"
  },
  {
    title: "Ethical Hacking",
    issuer: "DJ Community",
    date: "2021",
    link: "#",
    id: "DJ-EH-2021",
    color: "from-slate-700 to-slate-900"
  },
  {
    title: "Foundations of Cloud Architecture",
    issuer: "Google Cloud",
    date: "2023",
    link: "#",
    id: "GCP-FND-2023",
    color: "from-cyan-500 to-blue-500"
  },
];

const EducationCertifications: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Education & <span className="text-gradient">Certifications</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Academic background and professional certifications acquired to master the craft of software engineering.
          </p>
        </motion.div>

        <div className="flex flex-col gap-24">
          {/* Education side */}
          <div className="space-y-10">
            <h3 className="text-2xl font-bold flex items-center gap-3 mb-8 text-white/90">
              <GraduationCap className="text-primary" size={28} />
              Academic Journey
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <GlassCard className="relative overflow-hidden h-full group hover:border-primary/30">
                    <div className="absolute top-0 right-0 p-8 text-6xl opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
                      {edu.logo}
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{edu.degree}</h4>
                        <p className="text-primary/70 font-semibold mt-1">{edu.institution}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest">
                        {edu.duration}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-white/60 italic font-serif">
                        <BookOpen size={16} className="text-primary/50" />
                        {edu.honors}
                      </div>
                      <ul className="space-y-2">
                        {education[idx].achievements.map((ach, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-white/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications side */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold flex items-center gap-3 mb-8 text-white/90">
              <Award className="text-accent-purple" size={28} />
              Professional Credentials
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <GlassCard className="h-full flex flex-col p-6 hover:bg-white/10 transition-all border-white/5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-5 text-white shadow-lg`}>
                      <Award size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-white/90 leading-tight mb-2 uppercase tracking-tight">
                      {cert.title}
                    </h4>
                    <p className="text-white/40 text-sm mb-4 font-medium">{cert.issuer}</p>
                    
                    <div className="mt-auto pt-4 border-t border-white/[0.03] flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Issued</span>
                        <span className="text-xs text-white/60 font-medium">{cert.date}</span>
                      </div>
                      <a 
                        href={cert.link} 
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-primary hover:bg-primary/10 transition-all"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
            
            {/* View All Button */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <button className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest group">
                View All Certifications 
                <div className="w-8 h-px bg-white/10 group-hover:bg-primary/50 transition-all group-hover:w-12" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationCertifications;
