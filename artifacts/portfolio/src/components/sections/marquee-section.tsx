import React, { useRef, useEffect, useState } from 'react';

const techRow1 = [
  { name: 'Python', abbr: 'PY', bg: '#3776AB', color: '#FFF' },
  { name: 'Java', abbr: 'JA', bg: '#ED8B00', color: '#FFF' },
  { name: 'Flask', abbr: 'FL', bg: '#000000', color: '#FFF' },
  { name: 'FastAPI', abbr: 'FA', bg: '#009688', color: '#FFF' },
  { name: 'React', abbr: 'RE', bg: '#61DAFB', color: '#000' },
  { name: 'TypeScript', abbr: 'TS', bg: '#3178C6', color: '#FFF' },
  { name: 'Tailwind CSS', abbr: 'TW', bg: '#06B6D4', color: '#FFF' },
  { name: 'Git', abbr: 'GI', bg: '#F05032', color: '#FFF' },
  { name: 'SQLite', abbr: 'SQ', bg: '#003B57', color: '#FFF' },
  { name: 'Postman', abbr: 'PM', bg: '#FF6C37', color: '#FFF' },
  { name: 'VS Code', abbr: 'VS', bg: '#007ACC', color: '#FFF' },
];

const techRow2 = [
  { name: 'Linux', abbr: 'LX', bg: '#FCC624', color: '#000' },
  { name: 'Groq API', abbr: 'GQ', bg: '#F55036', color: '#FFF' },
  { name: 'Chart.js', abbr: 'CJ', bg: '#FF6384', color: '#FFF' },
  { name: 'NumPy', abbr: 'NU', bg: '#013243', color: '#FFF' },
  { name: 'Tkinter', abbr: 'TK', bg: '#FFD43B', color: '#000' },
  { name: 'JavaScript', abbr: 'JS', bg: '#F7DF1E', color: '#000' },
  { name: 'HTML5', abbr: 'HT', bg: '#E34F26', color: '#FFF' },
  { name: 'CSS3', abbr: 'CS', bg: '#1572B6', color: '#FFF' },
  { name: 'REST APIs', abbr: 'API', bg: '#4CAF50', color: '#FFF' },
  { name: 'Speech Rec', abbr: 'SR', bg: '#9C27B0', color: '#FFF' },
];

const TechCard = ({ name, abbr, bg, color }: { name: string, abbr: string, bg: string, color: string }) => (
  <div className="w-[420px] h-[270px] rounded-2xl bg-[#1a1a1a] flex flex-col items-center justify-center gap-6 shrink-0 border border-white/5">
    <div 
      className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-black shadow-lg"
      style={{ backgroundColor: bg, color: color }}
    >
      {abbr}
    </div>
    <span className="text-[#D7E2EA] font-medium uppercase tracking-wide text-xl">
      {name}
    </span>
  </div>
);

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const scrollPos = window.scrollY;
      const winHeight = window.innerHeight;
      
      // offset calculation based on spec
      const newOffset = (scrollPos - sectionTop + winHeight) * 0.3;
      setOffset(newOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Triple the arrays to create seamless marquee loop
  const row1Triple = [...techRow1, ...techRow1, ...techRow1];
  const row2Triple = [...techRow2, ...techRow2, ...techRow2];

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full flex flex-col gap-3"
    >
      <div 
        className="flex gap-3 w-max"
        style={{ 
          transform: `translate3d(${offset - 200}px, 0, 0)`,
          willChange: 'transform'
        }}
      >
        {row1Triple.map((tech, i) => (
          <TechCard key={`r1-${i}`} {...tech} />
        ))}
      </div>
      
      <div 
        className="flex gap-3 w-max"
        style={{ 
          transform: `translate3d(${-(offset - 200)}px, 0, 0)`,
          willChange: 'transform'
        }}
      >
        {row2Triple.map((tech, i) => (
          <TechCard key={`r2-${i}`} {...tech} />
        ))}
      </div>
    </section>
  );
}