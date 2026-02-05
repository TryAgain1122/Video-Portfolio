'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { VideoCard } from '@/components/VideoCard';
import { About } from '@/components/About';
import { Footer } from '@/components/Footer';
import { MousePosition, PlayingState, MutedState, ProgressState, VideoRefs } from '@/types';
import { videos } from '@/types/video';
import { Contact } from 'lucide-react';

export default function Home() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<PlayingState>({});
  const [isMuted, setIsMuted] = useState<MutedState>({});
  const [progress, setProgress] = useState<ProgressState>({});
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState<Record<number, number>>({});
  const videoRefs = useRef<VideoRefs>({});

const togglePlay = (id: number, e: React.MouseEvent): void => {
  e.stopPropagation();
  const video = videoRefs.current[id];
  if (!video) return;

  if (isPlaying[id]) {
    video.pause();
    setIsPlaying(prev => ({ ...prev, [id]: false }));
  } else {
    // Pause others
    Object.keys(videoRefs.current).forEach(key => {
      const numKey = Number(key);
      const v = videoRefs.current[numKey];
      if (v && numKey !== id) {
        v.pause();
        setIsPlaying(prev => ({ ...prev, [numKey]: false }));
      }
    });

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        setIsMuted(prev => ({ ...prev, [id]: true }));
        video.play();
      });
    }

    setIsPlaying(prev => ({ ...prev, [id]: true }));
  }
};

const handleExpand = (id: number) => {
  const video = videoRefs.current[id];
  if (!video) return;

  const anyVideo = video as any;

  // ✅ iPhone Safari: this is the reliable one
  if (typeof anyVideo.webkitEnterFullscreen === 'function') {
    anyVideo.webkitEnterFullscreen();
    return;
  }

  // ✅ Most modern browsers (Android Chrome, desktop)
  if (video.requestFullscreen) {
    video.requestFullscreen();
    return;
  }

  // ✅ Older Safari iPad
  if (typeof anyVideo.webkitRequestFullscreen === 'function') {
    anyVideo.webkitRequestFullscreen();
  }
};




  const toggleMute = (id: number, e: React.MouseEvent): void => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (video) {
      video.muted = !video.muted;
      setIsMuted(prev => ({ ...prev, [id]: video.muted }));
    }
  };

const handleTimeUpdate = (id: number): void => {
  const video = videoRefs.current[id];
  if (video && video.duration) {
    const percent = (video.currentTime / video.duration) * 100;

    setProgress(prev => ({ ...prev, [id]: percent }));
    setCurrentTime(prev => ({ ...prev, [id]: video.currentTime }));
  }
};

  const handleMouseMove = (e: MouseEvent): void => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      Object.values(videoRefs.current).forEach(video => {
        if (video) video.pause();
      });
    };
  }, []);

  useEffect(() => {
  if (activeVideo !== null) {
    const video = videoRefs.current[activeVideo];
    if (video) {
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If blocked ang autoplay with sound, fallback to muted
          video.muted = true;
          setIsMuted(prev => ({ ...prev, [activeVideo]: true }));
          video.play();
        });
      }

      setIsPlaying(prev => ({ ...prev, [activeVideo]: true }));
    }
  }
}, [activeVideo]);


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
                isActive={activeVideo === video.id}
                isHovered={hoveredCard === video.id}
                isPlaying={isPlaying[video.id] || false}
                isMuted={isMuted[video.id] || false}
                progress={progress[video.id] || 0}
                videoRef={(el) => { videoRefs.current[video.id] = el; }}
                onHover={() => setHoveredCard(video.id)}
                onLeave={() => setHoveredCard(null)}
                onPlayToggle={(e) => togglePlay(video.id, e)}
                onMuteToggle={(e) => toggleMute(video.id, e)}
                onExpand={() => setActiveVideo(activeVideo === video.id ? null : video.id)}
                onTimeUpdate={() => handleTimeUpdate(video.id)}
              />
            ))}
          </div>
        </section>

        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}