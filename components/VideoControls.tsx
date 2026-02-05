'use client';

import React from 'react';
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
  showControls: boolean; // ✅ new
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
  showControls,
  isHovered
}) => {
  return (
<div
  className={`absolute inset-0 flex flex-col justify-between p-6 transition-opacity duration-300 ${
    (!isPlaying || isHovered) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
  }`}
>

      {/* Top Controls */}
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

      {/* Center Play Button */}
      <div className="flex items-center justify-center">
        <button
          onClick={onPlayToggle}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-4 border-white/30 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-violet-500/50 group-hover:border-white/50"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white" fill="white" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          )}
        </button>
      </div>

      {/* Bottom Info */}
      <div>
        <div className="mb-3">
          <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-violet-400 transition-colors duration-300">
            {video.title}
          </h3>
          <p className="text-sm text-gray-400">{video.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300"
            style={{ width: `${progress || 0}%` }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onMuteToggle}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>

            <button
              onClick={onExpand}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            >
              <Maximize2 className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold uppercase tracking-wider">
            {video.category}
          </div>
        </div>
      </div>
    </div>
  );
};
