'use client';

import React from 'react';
import { Sparkles, Film, Zap, Heart } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

export const About: React.FC = () => {
  const tiktokUsername = 'karina._verse';
  const tiktokUrl = `https://www.tiktok.com/@${tiktokUsername}`;

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full"></div>
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-widest">Get to Know Me</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
          About <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* About Text */}
        <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Video Editor & Content Creator</h3>

          <p className="text-gray-400 mb-4 leading-relaxed">
           Hi, Im Rafhael Luis, a Video Editor and Content Creator specializing in short-form social media videos. I create engaging TikTok-style edits using Adobe After Effects and Photoshop, focusing on smooth transitions, strong pacing, and attention-grabbing visuals.
          </p>

          <p className="text-gray-400 leading-relaxed mb-6">
            Video editing is my hobby and stress reliever, while web development is my craft. Both help me tell stories—one through code, and the other through visuals
          </p>

          {/* ✅ TikTok CTA */}
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-white hover:from-violet-500/30 hover:to-fuchsia-500/30 transition-all duration-300"
          >
            <FaTiktok className="w-5 h-5" />
            <span className="font-semibold">View my Editing Account</span>
            <span className="text-white/60 text-sm">@{tiktokUsername}</span>
          </a>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-violet-500/20 to-violet-500/0 backdrop-blur-sm border border-violet-500/30 rounded-2xl p-6">
            <Sparkles className="w-8 h-8 text-violet-400 mb-3" />
            <h4 className="text-white font-bold mb-2">Transitions</h4>
            <p className="text-sm text-gray-400">Smooth velocity & hard cuts</p>
          </div>

          <div className="bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-500/0 backdrop-blur-sm border border-fuchsia-500/30 rounded-2xl p-6">
            <Film className="w-8 h-8 text-fuchsia-400 mb-3" />
            <h4 className="text-white font-bold mb-2">Effects</h4>
            <p className="text-sm text-gray-400">Color grading & filters</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/0 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
            <Zap className="w-8 h-8 text-cyan-400 mb-3" />
            <h4 className="text-white font-bold mb-2">Timing</h4>
            <p className="text-sm text-gray-400">Beat sync perfection</p>
          </div>

          <div className="bg-gradient-to-br from-pink-500/20 to-pink-500/0 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-6">
            <Heart className="w-8 h-8 text-pink-400 mb-3" />
            <h4 className="text-white font-bold mb-2">Passion</h4>
            <p className="text-sm text-gray-400">Love for fan content</p>
          </div>
        </div>
      </div>
    </section>
  );
};
