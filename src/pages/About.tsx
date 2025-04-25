import React from 'react';
import { AboutHero } from '../components/about/AboutHero';
import { MissionVision } from '../components/about/MissionVision';
import { TeamSection } from '../components/about/TeamSection';
import { StatsCounter } from '../components/about/StatsCounter';

export const About: React.FC = () => {
  return (
    <div className="w-full">
      <AboutHero />
      <StatsCounter />
      <MissionVision />
      <TeamSection />
    </div>
  );
};