'use client';

import React from 'react';
import { Mail, MessageCircle, Instagram, Youtube } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full"></div>
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-widest">Let's Connect</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
          Get in <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Want to collaborate or commission an edit? Feel free to reach out!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Email */}
        <a 
          href="mailto:your.email@example.com"
          className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-violet-500/50 transition-all duration-300 hover:scale-105"
        >
          <div className="w-14 h-14 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mb-4 group-hover:bg-violet-500/30 transition-all">
            <Mail className="w-7 h-7 text-violet-400" />
          </div>
          <h3 className="text-white font-bold mb-2">Email</h3>
          <p className="text-sm text-gray-400">your.email@example.com</p>
        </a>

        {/* TikTok */}
        <a 
          href="https://tiktok.com/@yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-fuchsia-500/50 transition-all duration-300 hover:scale-105"
        >
          <div className="w-14 h-14 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center mb-4 group-hover:bg-fuchsia-500/30 transition-all">
            <MessageCircle className="w-7 h-7 text-fuchsia-400" />
          </div>
          <h3 className="text-white font-bold mb-2">TikTok</h3>
          <p className="text-sm text-gray-400">@yourusername</p>
        </a>

        {/* Instagram */}
        <a 
          href="https://instagram.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 hover:scale-105"
        >
          <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mb-4 group-hover:bg-pink-500/30 transition-all">
            <Instagram className="w-7 h-7 text-pink-400" />
          </div>
          <h3 className="text-white font-bold mb-2">Instagram</h3>
          <p className="text-sm text-gray-400">@yourusername</p>
        </a>

        {/* YouTube */}
        <a 
          href="https://youtube.com/@yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300 hover:scale-105"
        >
          <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition-all">
            <Youtube className="w-7 h-7 text-red-400" />
          </div>
          <h3 className="text-white font-bold mb-2">YouTube</h3>
          <p className="text-sm text-gray-400">@yourusername</p>
        </a>
      </div>

      {/* Commission Info */}
      <div className="mt-12 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 backdrop-blur-sm border border-violet-500/30 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">Open for Commissions</h3>
        <p className="text-gray-400 mb-6">
          I'm currently accepting commission work for custom fan edits. Let's create something amazing together!
        </p>
        <a 
          href="mailto:your.email@example.com"
          className="inline-block px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105"
        >
          Commission an Edit
        </a>
      </div>
    </section>
  );
};