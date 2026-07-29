import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../ui/fade-in';

const projects = [
  {
    num: "01",
    title: "ARIA – AI Voice Desktop Assistant",
    category: "AI Assistant",
    desc: "A local-first, voice-controlled desktop assistant with speech recognition and text-to-speech. Runs a hybrid command engine with 54+ regex-matched commands and an AI fallback powered by the Groq API.",
    tech: "Python • Flask • JavaScript • Web Speech API • Groq API",
    gradientClass: "from-[#4A00E0] to-[#8E2DE2]", // deep purple to cyan/blue
  },
  {
    num: "02",
    title: "Dialysis Management System",
    category: "Health-Tech",
    desc: "A Flask-based web application to manage dialysis patients, treatment records, and scheduling — with patient-record and session-tracking modules.",
    tech: "Python • Flask • HTML • CSS • SQLite • JavaScript",
    gradientClass: "from-[#00c6ff] to-[#0072ff]", // soft teal to blue
  },
  {
    num: "03",
    title: "Disaster Aggregation System",
    category: "Social Impact / Data",
    desc: "A web dashboard that aggregates and displays real-time disaster data from multiple sources for faster situational awareness during emergencies.",
    tech: "Python • Flask • HTML • CSS",
    gradientClass: "from-[#f12711] to-[#f5af19]", // amber to red
  }
];

const ProjectCard = ({ project, index, total }: { project: any, index: number, total: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  // when scrolling past, scale down slightly
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="h-[85vh] w-full flex items-start justify-center relative">
      <motion.div 
        className="sticky top-24 md:top-32 w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8 origin-top"
        style={{ 
          scale,
          marginTop: `${index * 28}px`
        }}
      >
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black text-[#D7E2EA]">{project.num}</span>
              <div className="flex flex-col">
                <span className="uppercase tracking-wider opacity-50 text-xs sm:text-sm text-[#D7E2EA]">
                  {project.category}
                </span>
                <h3 className="font-black uppercase text-2xl sm:text-3xl md:text-4xl text-[#D7E2EA] max-w-2xl">
                  {project.title}
                </h3>
              </div>
            </div>
            
            <div className="mt-4 max-w-3xl">
              <p className="text-[#D7E2EA]/80 font-light text-sm sm:text-base mb-2">
                {project.desc}
              </p>
              <p className="text-[#D7E2EA]/50 font-medium text-xs sm:text-sm uppercase tracking-wider">
                {project.tech}
              </p>
            </div>
          </div>

          <a 
            href="https://github.com/JeevanHaris" 
            target="_blank" 
            rel="noreferrer"
            className="shrink-0 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 hover:bg-[#D7E2EA]/10 transition-colors text-center font-medium text-sm sm:text-base self-start lg:self-end"
          >
            View on GitHub
          </a>
        </div>

        {/* Bottom Row - Images */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full mt-auto h-full min-h-0">
          {/* Left Column (40%) */}
          <div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-[40%]">
            <div className={`w-full rounded-[30px] sm:rounded-[40px] bg-gradient-to-br ${project.gradientClass} opacity-80 mix-blend-screen shadow-inner`} style={{ height: 'clamp(130px, 16vw, 230px)' }} />
            <div className={`w-full rounded-[30px] sm:rounded-[40px] bg-gradient-to-tl ${project.gradientClass} opacity-60 mix-blend-overlay shadow-inner`} style={{ height: 'clamp(160px, 22vw, 340px)' }} />
          </div>
          
          {/* Right Column (60%) */}
          <div className={`w-full sm:w-[60%] rounded-[30px] sm:rounded-[40px] bg-gradient-to-tr ${project.gradientClass} opacity-90 shadow-inner`} style={{ height: 'calc(clamp(130px, 16vw, 230px) + clamp(160px, 22vw, 340px) + 1.5rem)' }}>
            <div className="w-full h-full bg-[#0C0C0C]/20 rounded-[30px] sm:rounded-[40px] backdrop-blur-sm border border-white/10 flex items-center justify-center p-8">
               <div className="w-full h-full border border-white/20 rounded-2xl border-dashed opacity-50 flex items-center justify-center">
                 <span className="uppercase tracking-widest text-white/50 text-sm font-medium">System Preview</span>
               </div>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-30">
      
      <FadeIn delay={0} y={40} className="w-full flex justify-center mb-16 sm:mb-20 md:mb-28">
        <h2 className="hero-heading font-black uppercase tracking-tight text-center text-[clamp(3rem,12vw,160px)] leading-none">
          Projects
        </h2>
      </FadeIn>

      <div className="w-full flex flex-col items-center relative">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} total={projects.length} />
        ))}
      </div>
      
      {/* Spacer for bottom padding to allow last scroll */}
      <div className="h-[20vh] w-full" />
    </section>
  );
}