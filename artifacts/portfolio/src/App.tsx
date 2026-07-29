import React from 'react';
import HeroSection from './components/sections/hero-section';
import MarqueeSection from './components/sections/marquee-section';
import AboutSection from './components/sections/about-section';
import SkillsSection from './components/sections/skills-section';
import ProjectsSection from './components/sections/projects-section';

function App() {
  return (
    <main className="w-full min-h-screen overflow-x-clip bg-[#0C0C0C]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
    </main>
  );
}

export default App;