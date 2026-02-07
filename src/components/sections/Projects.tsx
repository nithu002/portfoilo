import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Maximize2, X } from 'lucide-react';

const projects = [
  {
    title: "Basket.lk",
    category: "E-Commerce",
    image: "/basket.jpg",
    description: "A multi-vendor e-commerce platform designed for a seamless shopping experience, featuring advanced search, product categorization, and secure checkout.",
    tech: ["Laravel", "React", "Rest API", "My SQL", "Bootstrap","Python"],
    links: { github: "#", live: "https://basket.lk/" },
    size: "large"
  },
  {
    title: "Agri NorthEast",
    category: "Agri-Finance",
    image: "/agri north east.jpg",
    description: "A comprehensive agricultural finance management system helping farmers and distributors track supplies, manage loans, and optimize crop yields.",
    tech: ["React", "Node.js", "My SQL"],
    links: { github: "#", live: "https://agrinortheast.com/" },
    size: "small"
  },
  {
    title: "Ramiy Resort",
    category: "Tourism & Hotel Booking",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    description: "A luxury resort booking and management system featuring room availability tracking, online reservations, and guest services management.",
    tech: ["Laravel", "React", "Rest API", "My SQL", "Power-Sync"],
    links: { github: "#", live: "https://ramiyresort.com/" },
    size: "small"
  },
  {
    title: "Restaurant ERP & POS - (Hybrid)",
    category: "Web App, Desktop App",
    image: "/ramiy.jpg",
    description: "A powerful hybrid ERP and POS system for restaurants, offline-ready with Power-Sync, featuring inventory management, live kitchen tracking, and detailed sales analytics.",
    tech: ["Laravel", "React", "Rest API", "My SQL", "Power-Sync","Python"],
    links: { github: "#", live: "#" },
    size: "large"
  },
  {
    title: "Restaurant Management System",
    category: "Web App, Desktop App",
    image: "/pos.jpg",
    description: "Automated restaurant operations management with a centralized super-admin dashboard to manage multiple branches, menus, and staff performance.",
    tech: ["Laravel", "React", "Rest API", "My SQL"],
    links: { github: "#", live: "#" },
    size: "small"
  },
  {
    title: "Help Desk Management System",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    description: "An efficient ticketing and support system for managing customer inquiries, priority-based task allocation, and team collaboration.",
    tech: ["Laravel", "React", "Rest API", "My SQL"],
    links: { github: "#", live: "#" },
    size: "small"
  },
  {
    title: "AI Powered LMS",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    description: "An AI-enhanced learning management system featuring automated grading, personalized learning paths, and intelligent student performance analytics.",
    tech: ["Laravel", "React", "Rest API", "My SQL","Python","OpenAI API"],
    links: { github: "#", live: "#" },
    size: "large"
  },
  {
    title: "POS System",
    category: "Desktop App",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    description: "A robust desktop-based point of sale application designed for high-speed transactions, inventory control, and offline retail operations.",
    tech: ["Java","Swing"],
    links: { github: "#", live: "#" },
    size: "small"
  },
  {
    title: "Online POS System",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    description: "A scalable cloud-based point of sale solution for retail businesses, supporting real-time inventory updates and multi-device accessibility.",
    tech: ["Laravel", "React", "Rest API", "My SQL"],
    links: { github: "#", live: "#" },
    size: "small"
  },
  {
    title: "Studio Management System",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    description: "A dedicated management tool for studios to handle bookings, equipment inventory, client projects, and financial records in one place.",
    tech: ["Laravel", "React", "Rest API", "My SQL","Power-Sync"],
    links: { github: "#", live: "#" },
    size: "large"
  },
  {
    title: "Pharmacy Distribution System",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    description: "A specialized distribution management app for pharmacies to track medical stock, expiry dates, and supply chain logistics with mobile accessibility.",
    tech: ["Laravel", "Flutter", "Rest API", "Firebase"],
    links: { github: "#", live: "#" },
    size: "small"
  },
  {
    title: "AI Powered Social Media Marketing Tool",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    description: "An intelligent marketing suite that automates content creation, post scheduling, and audience sentiment analysis using advanced AI models.",
    tech: ["Laravel", "React", "Rest API", "My SQL","OpenAI API"],
    links: { github: "#", live: "#" },
    size: "small"
  },
];

const ProjectCard: React.FC<{ project: any; onImageClick: (img: string) => void }> = ({ project, onImageClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 ${
      project.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
      project.size === 'medium' ? 'md:col-span-2' : ''
    }`}
  >
    {/* Project Image */}
    <div className="absolute inset-0 z-0">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover opacity-50 contrast-[1.1] saturate-[0.8] group-hover:scale-110 group-hover:opacity-30 transition-all duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      
      {/* Search/Maximize Icon on Hover */}
      <div 
        onClick={() => onImageClick(project.image)}
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
      >
        <div className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transform scale-50 group-hover:scale-100 transition-transform duration-500">
          <Maximize2 className="text-white" size={24} />
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="relative z-10 h-full flex flex-col justify-end p-8 pointer-events-none">
      <div className="mb-4">
        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-3 inline-block pointer-events-auto">
          {project.category}
        </span>
        <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors pointer-events-auto">
          {project.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3 md:line-clamp-none pointer-events-auto">
          {project.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pointer-events-auto">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t: string, i: number) => (
            <span key={i} className="text-[10px] text-white/40 font-mono">#{t}</span>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <a href={project.links.github} className="text-white/50 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href={project.links.live} className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center hover:scale-110 transition-transform">
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
            <p className="text-white/60">
              A curated selection of my recent work across AI, E-Commerce, Cloud Infrastructure, ERP | POS, Custome Websites and Interactive Web Applications.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors">
              All Work
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] gap-6">
          {projects.map((project, idx) => (
            <ProjectCard 
              key={idx} 
              project={project} 
              onImageClick={(img) => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Project Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
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
                src={selectedImage} 
                alt="Project Full View" 
                className="max-w-full max-h-[85vh] rounded-xl shadow-2xl border border-white/10 object-contain"
              />
              
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
