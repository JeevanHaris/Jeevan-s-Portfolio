import React from 'react';
import FadeIn from '../ui/fade-in';
import Magnet from '../ui/magnet';
import ContactButton from '../ui/contact-button';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 w-full z-20 relative">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {item}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading Container */}
      <div className="flex-1 flex flex-col justify-center w-full z-20 relative px-6 md:px-10 overflow-hidden">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
            Hi, i&apos;m Jeevan Haris
          </h1>
        </FadeIn>
      </div>

      {/* Hero Portrait - Generated abstract glowing silhouette */}
      <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
        <Magnet padding={150} strength={3}>
          <div className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-square flex items-end justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent z-10 pointer-events-none" />
            
            {/* Glowing abstract shape / silhouette */}
            <div className="relative w-full h-[80%] rounded-t-[1000px] bg-gradient-to-br from-[#1A1F2B] to-[#0A0D14] border-t border-white/5 overflow-hidden flex items-center justify-center shadow-[0_0_120px_rgba(100,105,115,0.15)]">
               <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #B600A8 0%, transparent 60%)' }} />
               <div className="absolute w-[150%] h-[150%] animate-pulse opacity-20" style={{ background: 'conic-gradient(from 180deg at 50% 50%, #7621B0 0deg, #18011F 180deg, #BE4C00 360deg)' }} />
               {/* Abstract inner geometry */}
               <div className="w-[40%] h-[60%] rounded-full border-[1px] border-[#D7E2EA]/20 blur-[2px] absolute top-[10%]" />
               <div className="w-[60%] h-[40%] rounded-full border-[1px] border-[#D7E2EA]/10 blur-[4px] absolute bottom-[-10%]" />
            </div>
          </div>
        </Magnet>
      </FadeIn>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20 relative w-full">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
            A Computer Science Engineering student passionate about Artificial Intelligence, Full-Stack Development, and building impactful software.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.5} y={20}>
          <ContactButton className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base" />
        </FadeIn>
      </div>
    </section>
  );
}