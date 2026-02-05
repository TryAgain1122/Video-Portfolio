'use client';

import React from 'react';
import { Award, Eye, Zap } from 'lucide-react';
import { StatCard } from './StatCard';
export const HeroSection: React.FC = () => {
  return (
    <header className="pt-32 pb-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6 animate-slide-up">
          <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full"></div>
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-widest">TikTok Fan Edit Creator</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 animate-slide-up animation-delay-200">
          <span className="block text-white">SHORT-FORM</span>
          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            VIDEO PORTFOLIO
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 animate-slide-up animation-delay-400">
          Short-form social media video edits using Adobe After Effects and Photoshop. Focused on transitions, pacing, and engaging content for TikTok-style platforms.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-8">
          <StatCard 
            icon={Award} 
            value="50+" 
            label="Edits" 
            color="bg-violet-500/20 border border-violet-500/30 text-violet-400"
            delay="0.6s"
          />
          <StatCard 
            icon={Eye} 
            value="36k+" 
            label="Views" 
            color="bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-400"
            delay="0.7s"
          />
          <StatCard 
            icon={Zap} 
            value="100%" 
            label="Passion" 
            color="bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
            delay="0.8s"
          />
        </div>
      </div>
    </header>
  );
};