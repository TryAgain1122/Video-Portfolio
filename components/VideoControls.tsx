'use client';

import React, { useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Clock, Eye } from 'lucide-react';
import { Video } from '@/types';

interface VideoControlsProps {
  video: Video;
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  onPlayToggle: (e: React.MouseEvent) => void;
  onMuteToggle: (e: React.MouseEvent) => void;
  onExpand: () => void;
  onSeek: (percent: number) => void;
  showControls: boolean;
  isHovered: boolean;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  video,
  isPlaying,
  isMuted,
  progress,
  onPlayToggle,
  onMuteToggle,
  onExpand,
  onSeek,
  showControls,
  isHovered
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const calcPercent = useCallback((clientX: number) => {
    if (!progressRef.current) return 0;
    const rect = progressRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  }, []);

  const handleProgressClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSeek(calcPercent(e.clientX));
  };

  const handleDragStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSeek(calcPercent(e.clientX));

    const onMove = (ev: MouseEvent) => onSeek(calcPercent(ev.clientX));
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  // Bottom controls only show when playing + hovered/tapped
  const showBottom = isPlaying && (isHovered || showControls);

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4">
      {/* Top Controls - always visible */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
          <Eye className="w-3 h-3" />
          {video.views}
        </div>
      </div>

      {/* Center Play Button - only visible when NOT playing */}
      <div className={`flex items-center justify-center transition-opacity duration-300 ${
        !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <button
          onClick={onPlayToggle}
          aria-label="Play video"
          className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-4 border-white/30 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-violet-500/50 group-hover:border-white/50"
        >
          <Play className="w-8 h-8 text-white ml-1" fill="white" />
        </button>
      </div>

      {/* Bottom Controls - only visible when playing + hovered/tapped */}
      <div className={`transition-all duration-300 ${
        showBottom ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}>
        {/* Title */}
        <h3 className="text-base font-bold text-white mb-2 truncate">
          {video.title}
        </h3>

        {/* Seekable Progress Bar */}
        <div
          ref={progressRef}
          className="relative w-full h-2 bg-white/20 rounded-full cursor-pointer group/bar"
          onClick={handleProgressClick}
          onMouseDown={handleDragStart}
          role="slider"
          aria-label="Video progress"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-[width] duration-100"
            style={{ width: `${progress || 0}%` }}
          />
          {/* Drag handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover/bar:opacity-100 transition-opacity"
            style={{ left: `calc(${progress || 0}% - 8px)` }}
          />
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={onPlayToggle}
              aria-label="Pause video"
              className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            >
              <Pause className="w-3.5 h-3.5 text-white" fill="white" />
            </button>

            <button
              onClick={onMuteToggle}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-white" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-white" />
              )}
            </button>

            <button
              onClick={onExpand}
              aria-label="View fullscreen"
              className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            >
              <Maximize2 className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold uppercase tracking-wider">
            {video.category}
          </div>
        </div>
      </div>
    </div>
  );
};
