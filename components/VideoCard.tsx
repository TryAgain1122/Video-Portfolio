'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Award, AlertCircle } from 'lucide-react';
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
  onSeek: (percent: number) => void;
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
  onTimeUpdate,
  onSeek
}) => {
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
    setShowControls(prev => !prev);
  };

  // Combined ref: forwards to parent ref + checks if video is already loaded
  const combinedRef = useCallback((el: HTMLVideoElement | null) => {
    videoRef(el);
    if (el && el.readyState >= 3) {
      setIsLoading(false);
    }
  }, [videoRef]);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-all duration-700 animate-slide-up ${
        isActive ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      role="article"
      aria-label={`Video: ${video.title}`}
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
        {/* Loading Skeleton */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 z-10 bg-gray-900 flex items-center justify-center">
            <div className="w-10 h-10 border-3 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 z-10 bg-gray-900 flex flex-col items-center justify-center gap-2">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <p className="text-sm text-gray-400">Failed to load video</p>
          </div>
        )}

        <video
          ref={combinedRef}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          poster={video.thumbnail}
          loop
          playsInline
          muted={isMuted}
          autoPlay
          onTimeUpdate={onTimeUpdate}
          onClick={handleVideoTap}
          onLoadedData={() => setIsLoading(false)}
          onPlaying={() => setIsLoading(false)}
          onError={() => { setHasError(true); setIsLoading(false); }}
          aria-label={video.title}
        >
          <source src={video.videoUrl} type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-300 ${
            showControls ? 'opacity-80' : 'opacity-30'
          }`}
        />

        {/* Hover Glow Effect */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 via-transparent to-fuchsia-500/20 animate-pulse" />
        )}

        {/* Controls Overlay */}
        {!hasError && (
          <VideoControls
            video={video}
            isPlaying={isPlaying}
            isMuted={isMuted}
            progress={progress}
            onPlayToggle={onPlayToggle}
            onMuteToggle={onMuteToggle}
            onExpand={onExpand}
            onSeek={onSeek}
            showControls={showControls}
            isHovered={isHovered}
          />
        )}
      </div>
    </div>
  );
};
