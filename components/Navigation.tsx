'use client';

import React from 'react';
import { Zap } from 'lucide-react';

export const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" fill="white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            RAFHAEL VIDEO EDITS
          </span>
        </div>
        <div className="hidden md:flex gap-6 text-sm">
          <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</a>
          <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
          <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
};