import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.4'],
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap justify-center gap-x-[0.25em]`}>
      {words.map((word, i) => {
        const characters = word.split('');
        return (
          <span key={i} className="inline-flex relative">
            {characters.map((char, j) => {
              // Calculate character's relative position in the whole text to stagger opacity
              const charIndex = text.indexOf(word) + j;
              const totalChars = text.length;
              
              const start = charIndex / totalChars;
              const end = start + (1 / totalChars);
              
              const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
              
              return (
                <span key={j} className="relative inline-block">
                  <span className="invisible">{char}</span>
                  <motion.span
                    className="absolute top-0 left-0 text-[#D7E2EA]"
                    style={{ opacity }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
}