import React from 'react';
import FadeIn from '../ui/fade-in';
import AnimatedText from '../ui/animated-text';
import ContactButton from '../ui/contact-button';

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen px-5 sm:px-8 md:px-10 py-20 flex flex-col items-center justify-center bg-[#0C0C0C] overflow-hidden">
      
      {/* Decorative 3D Corner Elements */}
      <div className="absolute top-8 left-4 w-[120px] sm:w-[160px] md:w-[200px] aspect-square rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 blur-[60px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-8 left-4 w-[120px] sm:w-[160px] md:w-[200px] aspect-square rotate-45 bg-gradient-to-br from-teal-400 to-emerald-600 blur-[50px] opacity-20 pointer-events-none" />
      <div className="absolute top-8 right-4 w-[120px] sm:w-[160px] md:w-[200px] aspect-square rounded-full bg-gradient-to-bl from-amber-500 to-orange-600 blur-[70px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-8 right-4 w-[120px] sm:w-[160px] md:w-[200px] aspect-square rounded-full bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-500 blur-[80px] opacity-20 pointer-events-none" />

      {/* Heading */}
      <FadeIn delay={0} y={40} className="w-full flex justify-center mb-12 sm:mb-16 md:mb-20 relative z-10">
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
          About me
        </h2>
      </FadeIn>

      {/* Animated Text Paragraph */}
      <div className="w-full max-w-[560px] mb-16 sm:mb-20 md:mb-24 relative z-10">
        <AnimatedText 
          text="Third-year Computer Science Engineering student with hands-on experience across Flask, FastAPI, and full-stack web development. i enjoy building AI-integrated tools, health-tech systems, and data dashboards — and i'm always looking for the next problem worth solving. Let's build something incredible together!"
          className="font-medium text-center leading-relaxed text-[clamp(1rem,2vw,1.35rem)]"
        />
      </div>

      {/* Stats Row */}
      <FadeIn delay={0.15} className="w-full max-w-5xl flex flex-wrap justify-center items-center gap-y-4 relative z-10 mb-16">
        <div className="flex flex-wrap justify-center items-center divide-x divide-[#D7E2EA]/30">
          {[
            "2nd Prize – Code Hunt, NIT",
            "Top 5 – CKD Care Planner Hackathon",
            "CCNA Certified",
            "IBM AI Foundations"
          ].map((stat, i) => (
            <span 
              key={i} 
              className="px-4 sm:px-6 py-2 text-[#D7E2EA]/70 text-xs sm:text-sm md:text-base uppercase tracking-wide text-center"
            >
              {stat}
            </span>
          ))}
        </div>
      </FadeIn>

      {/* Contact Button */}
      <FadeIn delay={0.3} className="relative z-10">
        <ContactButton className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-sm md:text-base" />
      </FadeIn>

    </section>
  );
}