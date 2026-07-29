import React from 'react';
import FadeIn from '../ui/fade-in';

const skills = [
  {
    num: "01",
    name: "AI & LLM Integration",
    desc: "Building AI-powered tools with the Groq API, hybrid command engines, and intelligent fallback systems."
  },
  {
    num: "02",
    name: "Full-Stack Web Development",
    desc: "Responsive, end-to-end applications using Flask, FastAPI, HTML5, CSS3, and JavaScript."
  },
  {
    num: "03",
    name: "Backend & API Development",
    desc: "REST APIs, SQLite-backed data models, and Postman-tested backend systems."
  },
  {
    num: "04",
    name: "Cross-Stack Problem Solving",
    desc: "Parallel builds across Python and Java (e.g. Flask vs. Spring Boot), reinforcing adaptable engineering fundamentals."
  },
  {
    num: "05",
    name: "Data Structures & Core CS",
    desc: "Strong grounding in Data Structures, Algorithms, and Database Management from coursework and competitive coding."
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-20">
      
      {/* Heading */}
      <FadeIn delay={0} y={40} className="w-full flex justify-center mb-16 sm:mb-20 md:mb-28">
        <h2 className="font-black uppercase tracking-tight text-center text-[clamp(3rem,12vw,160px)] leading-none">
          Skills
        </h2>
      </FadeIn>

      {/* Skills List */}
      <div className="w-full max-w-5xl mx-auto flex flex-col">
        {skills.map((skill, i) => (
          <FadeIn 
            key={i} 
            delay={i * 0.1} 
            y={20}
            className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 py-8 sm:py-10 md:py-12 ${i !== skills.length - 1 ? 'border-b border-[#0C0C0C]/15' : ''}`}
          >
            <div className="text-[clamp(3rem,10vw,140px)] font-black leading-none shrink-0 w-24 sm:w-32 md:w-48 text-[#0C0C0C]">
              {skill.num}
            </div>
            
            <div className="flex flex-col gap-2 sm:gap-3">
              <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] leading-tight text-[#0C0C0C]">
                {skill.name}
              </h3>
              <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] opacity-60 text-[#0C0C0C]">
                {skill.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
      
    </section>
  );
}