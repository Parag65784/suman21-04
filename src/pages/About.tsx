import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext'; // adjust the path if needed
import { AboutHero } from '../components/about/AboutHero';
import { MissionVision } from '../components/about/MissionVision';
import { TeamSection } from '../components/about/TeamSection';
import { StatsCounter } from '../components/about/StatsCounter';

export const About: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="w-full bg-white dark:bg-[#0A1929] transition-colors duration-500">
        <AboutHero />
        <StatsCounter />
        <MissionVision />
        <TeamSection />
      </div>
    </ThemeProvider>
  );
};
