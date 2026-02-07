import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/layout/CustomCursor';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
// import Testimonials from './components/sections/Testimonials';
import EducationCertifications from './components/sections/EducationCertifications';
import Contact from './components/sections/Contact';

import ChatAssistant from './components/ChatAssistant/ChatAssistant';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Senior Software Engineer | Premium Portfolio</title>
        <meta name="description" content="Portfolio of a Senior Software Engineer specializing in scalable web applications and premium UI/UX design." />
      </Helmet>
      
      <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary overflow-x-hidden">
        <CustomCursor />
        <Navbar />
        
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <EducationCertifications />
          {/* <Testimonials /> */}
          <Contact />
        </main>

        <Footer />
        <ChatAssistant />

        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-purple/5 blur-[120px] rounded-full animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/2 opacity-20 blur-[150px] rounded-full pointer-events-none" />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
