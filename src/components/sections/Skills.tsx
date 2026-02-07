import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

interface SkillBarProps {
  label: string;
  proficiency: number;
  icon?: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ label, proficiency }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-white/80">{label}</span>
      <span className="text-sm font-medium text-primary">{proficiency}%</span>
    </div>
    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${proficiency}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-primary to-accent-purple rounded-full"
      />
    </div>
  </div>
);

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { label: "Php (Laravel)", level: 95 },
        { label: "TypeScript", level: 85 },
        { label: "Python", level: 80 },
        { label: "Go", level: 65 },
      ]
    },
    {
      title: "Frontend",
      skills: [
        { label: "React / Next.js", level: 98 },
        { label: "Vue.js", level: 75 },
        { label: "Tailwind CSS", level: 95 },
        { label: "Bootstrap", level: 90 },
      ]
    },
    {
      title: "Cloud & Devops",
      skills: [
        { label: "AWS / Google Cloud", level: 85 },
        { label: "Docker / Kubernetes", level: 80 },
        { label: "CI/CD Pipelines", level: 90 },
        { label: "Terraform", level: 75 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical <span className="text-gradient">Proficiency</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the tools I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <GlassCard key={idx} className="p-8">
              <h3 className="text-xl font-bold mb-8 text-white/90 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {idx + 1}
                </span>
                {category.title}
              </h3>
              {category.skills.map((skill, sIdx) => (
                <SkillBar key={sIdx} label={skill.label} proficiency={skill.level} />
              ))}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
