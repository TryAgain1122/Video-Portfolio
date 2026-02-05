'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { VideoCard } from '@/components/VideoCard';
import { FullscreenModal } from '@/components/FullscreenModal';
import { About } from '@/components/About';

import { Footer } from '@/components/Footer';

import { MousePosition, PlayingState, MutedState, ProgressState, VideoRefs } from '@/types';
import { videos } from '@/types/video';
import { Contact } from 'lucide-react';

export default function Home() {
  const [fullscreenVideo, setFullscreenVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<PlayingState>({});
  const [isMuted, setIsMuted] = useState<MutedState>({});
  const [progress, setProgress] = useState<ProgressState>({});
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const videoRefs = useRef<VideoRefs>({});
  const fullscreenVideoRefs = useRef<VideoRefs>({});
  const [activeVideo, setActiveVideo] = useState<number | null>(null);


  const togglePlay = (id: number, e: React.MouseEvent): void => {
    e.stopPropagation();
    const video = fullscreenVideo === id ? fullscreenVideoRefs.current[id] : videoRefs.current[id];
    
    if (video) {
      if (isPlaying[id]) {
        video.pause();
        setIsPlaying(prev => ({ ...prev, [id]: false }));
      } else {
        Object.keys(videoRefs.current).forEach(key => {
          const numKey = Number(key);
          if (videoRefs.current[numKey] && numKey !== id) {
            videoRefs.current[numKey]?.pause();
            setIsPlaying(prev => ({ ...prev, [numKey]: false }));
          }
        });
        Object.keys(fullscreenVideoRefs.current).forEach(key => {
          const numKey = Number(key);
          if (fullscreenVideoRefs.current[numKey] && numKey !== id) {
            fullscreenVideoRefs.current[numKey]?.pause();
            setIsPlaying(prev => ({ ...prev, [numKey]: false }));
          }
        });
        
        video.play();
        setIsPlaying(prev => ({ ...prev, [id]: true }));
      }
    }
  };

  const toggleMute = (id: number, e: React.MouseEvent): void => {
    e.stopPropagation();
    const video = fullscreenVideo === id ? fullscreenVideoRefs.current[id] : videoRefs.current[id];
    if (video) {
      video.muted = !video.muted;
      setIsMuted(prev => ({ ...prev, [id]: video.muted }));
    }
  };

  const handleTimeUpdate = (id: number): void => {
    const video = fullscreenVideo === id ? fullscreenVideoRefs.current[id] : videoRefs.current[id];
    if (video) {
      const progressPercent = (video.currentTime / video.duration) * 100;
      setProgress(prev => ({ ...prev, [id]: progressPercent }));
    }
  };

  const handleExpand = (id: number): void => {
    setFullscreenVideo(id);
    // Transfer playback state to fullscreen video
    if (videoRefs.current[id]) {
      const currentTime = videoRefs.current[id]?.currentTime || 0;
      setTimeout(() => {
        if (fullscreenVideoRefs.current[id]) {
          fullscreenVideoRefs.current[id]!.currentTime = currentTime;
          if (isPlaying[id]) {
            fullscreenVideoRefs.current[id]?.play();
          }
        }
      }, 100);
    }
  };

  const handleCloseFullscreen = (): void => {
    if (fullscreenVideo !== null) {
      // Transfer playback state back to card video
      const currentTime = fullscreenVideoRefs.current[fullscreenVideo]?.currentTime || 0;
      if (videoRefs.current[fullscreenVideo]) {
        videoRefs.current[fullscreenVideo]!.currentTime = currentTime;
      }
      setFullscreenVideo(null);
    }
  };

  const handleMouseMove = (e: MouseEvent): void => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    // Close fullscreen on ESC key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenVideo !== null) {
        handleCloseFullscreen();
      }
    };
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleEscape);
      Object.values(videoRefs.current).forEach(video => {
        if (video) video.pause();
      });
      Object.values(fullscreenVideoRefs.current).forEach(video => {
        if (video) video.pause();
      });
    };
  }, [fullscreenVideo]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground mousePosition={mousePosition} />

      <div className="relative z-10">
        <Navigation />
        <HeroSection />

        {/* All Edits Section */}
        <section id="portfolio" className="max-w-7xl mx-auto px-6 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              All <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Edits</span>
            </h2>
            <p className="text-gray-400">Collection of all my fan edits and transitions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                isHovered={hoveredCard === video.id}
                isPlaying={isPlaying[video.id] || false}
                isMuted={isMuted[video.id] || false}
                progress={progress[video.id] || 0}
                videoRef={(el) => { videoRefs.current[video.id] = el; }}
                onHover={() => setHoveredCard(video.id)}
                onLeave={() => setHoveredCard(null)}
                onPlayToggle={(e) => togglePlay(video.id, e)}
                onMuteToggle={(e) => toggleMute(video.id, e)}
                onExpand={() => handleExpand(video.id)}
                onTimeUpdate={() => handleTimeUpdate(video.id)}
                isActive={activeVideo === video.id}
              />
            ))}
          </div>
        </section>

        <About />
        <Contact />
        <Footer />
      </div>

      {/* Fullscreen Modal */}
      {fullscreenVideo !== null && (
        <FullscreenModal
          video={videos.find(v => v.id === fullscreenVideo)!}
          isOpen={fullscreenVideo !== null}
          isPlaying={isPlaying[fullscreenVideo] || false}
          isMuted={isMuted[fullscreenVideo] || false}
          progress={progress[fullscreenVideo] || 0}
          videoRef={(el) => { fullscreenVideoRefs.current[fullscreenVideo] = el; }}
          onClose={handleCloseFullscreen}
          onPlayToggle={(e) => togglePlay(fullscreenVideo, e)}
          onMuteToggle={(e) => toggleMute(fullscreenVideo, e)}
          onTimeUpdate={() => handleTimeUpdate(fullscreenVideo)}
        />
      )}
    </div>
  );
}