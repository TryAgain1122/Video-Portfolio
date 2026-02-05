'use client';

import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { Video } from '@/types';
import { VideoControls } from './VideoControls';

interface VideoCardProps {
  video: Video;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  videoRef: (el: HTMLVideoElement | null) => void;
  onHover: () => void;
  onLeave: () => void;
  onPlayToggle: (e: React.MouseEvent) => void;
  onMuteToggle: (e: React.MouseEvent) => void;
  onExpand: () => void;
  onTimeUpdate: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  index,
  isActive,
  isHovered,
  isPlaying,
  isMuted,
  progress,
  videoRef,
  onHover,
  onLeave,
  onPlayToggle,
  onMuteToggle,
  onExpand,
  onTimeUpdate
}) => {
  const [showControls, setShowControls] = useState(true);

  // If playing, auto-hide after 2s when controls are shown
  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      return;
    }

    if (!showControls) return;

    const t = window.setTimeout(() => setShowControls(false), 2000);
    return () => window.clearTimeout(t);
  }, [isPlaying, showControls]);

  const handleVideoTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Toggle controls while playing
    setShowControls(prev => !prev);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-all duration-700 animate-slide-up ${
        isActive ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Card Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-500 group-hover:border-violet-500/50 group-hover:shadow-2xl group-hover:shadow-violet-500/20" />

      {/* Featured Badge */}
      {video.featured && (
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold flex items-center gap-1">
          <Award className="w-3 h-3" />
          FEATURED
        </div>
      )}

      {/* Video Container */}
      <div className="relative overflow-hidden aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          poster={video.thumbnail}
          loop
          playsInline
          muted={isMuted}
          autoPlay
          onTimeUpdate={onTimeUpdate}
          onClick={handleVideoTap}   // ✅ click/tap toggles controls
        >
          <source src={video.videoUrl} type="video/mp4" />
        </video>

        {/* Gradient Overlay (optional: show more when controls visible) */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-300 ${
            showControls ? 'opacity-80' : 'opacity-30'
          }`}
        />

        {/* Hover Glow Effect */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 via-transparent to-fuchsia-500/20 animate-pulse" />
        )}

        {/* Controls Overlay (shows on pause, or when toggled) */}
        <VideoControls
          video={video}
          isPlaying={isPlaying}
          isMuted={isMuted}
          progress={progress}
          onPlayToggle={onPlayToggle}
          onMuteToggle={onMuteToggle}
          onExpand={onExpand}
          showControls={showControls} // ✅ new prop
          isHovered={isHovered}
        />
      </div>
    </div>
  );
};
