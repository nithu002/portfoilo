import React from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <a href="#" className="text-2xl font-bold tracking-tighter">
              <span className="text-white">DEV</span>
              <span className="text-primary">.PRO</span>
            </a>
            <p className="text-white/40 text-sm mt-3 font-medium">
              Architecting Digital Excellence Since 2015.
            </p>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex gap-6">
              {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                <a key={i} href="#" className="text-white/40 hover:text-primary transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
            
            <button 
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-all group"
            >
              <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} Nithurshan. All rights reserved.
          </p>
          <div className="flex gap-8 text-white/20 text-xs tracking-widest uppercase">
            <a href="#" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/10">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/10">Terms of Service</a>
          </div>
          <p className="text-white/30 text-[10px] tracking-widest uppercase">
            Made with <span className="text-primary">❤️</span> and React
          </p>
        </div>
      </div>
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-primary/2 blur-[100px] pointer-events-none rounded-full" />
    </footer>
  );
};

export default Footer;
