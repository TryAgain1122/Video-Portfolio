'use client';

import React from 'react';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 backdrop-blur-xl bg-black/40">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-white">RAFHAEL VIDEO EDITS</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2026 Fan Edit Portfolio. Crafted with passion and precision.
          </p>
        </div>
      </div>
    </footer>
  );
};