'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Video } from '@/types';

interface FullscreenModalProps {
  video: Video;
  isOpen: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  videoRef: (el: HTMLVideoElement | null) => void;
  onClose: () => void;
  onPlayToggle: (e: React.MouseEvent) => void;
  onMuteToggle: (e: React.MouseEvent) => void;
  onTimeUpdate: () => void;
  onSeek: (percent: number) => void;
}

export const FullscreenModal: React.FC<FullscreenModalProps> = ({
  video,
  isOpen,
  isPlaying,
  isMuted,
  progress,
  videoRef,
  onClose,
  onPlayToggle,
  onMuteToggle,
  onTimeUpdate,
  onSeek,
}) => {
  const [showControls, setShowControls] = useState(true);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowControls(true);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [isOpen]);

  const handleMouseMove = () => {
    setShowControls(true);
    
    // Clear existing timeout
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    
    // Set new timeout to hide controls after 3 seconds of no movement
    const timeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
    
    setHideTimeout(timeout);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in"
      onMouseMove={handleMouseMove}
      role="dialog"
      aria-modal="true"
      aria-label={`Fullscreen video: ${video.title}`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close fullscreen"
        className={`absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{ transition: 'opacity 0.3s, transform 0.3s' }}
      >
        <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Video Container */}
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center p-4 md:p-8">
        <div className="relative w-full h-full flex flex-col">
          {/* Video */}
          <div className="relative flex-1 bg-black rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              poster={video.thumbnail}
              loop
              playsInline
              onTimeUpdate={onTimeUpdate}
            >
              <source src={video.videoUrl} type="video/mp4" />
            </video>

            {/* Gradient Overlay */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}
            ></div>

            {/* Center Play/Pause */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                onClick={onPlayToggle}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                className={`w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-4 border-white/30 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-violet-500/50 pointer-events-auto ${
                  showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-white" fill="white" />
                ) : (
                  <Play className="w-10 h-10 text-white ml-1" fill="white" />
                )}
              </button>
            </div>

            {/* Bottom Controls */}
            <div 
              className={`absolute bottom-0 left-0 right-0 p-6 space-y-4 transition-all duration-300 ${
                showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Seekable Progress Bar */}
              <div
                ref={progressRef}
                className="relative w-full h-3 bg-white/20 rounded-full cursor-pointer group/bar"
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
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg opacity-0 group-hover/bar:opacity-100 transition-opacity"
                  style={{ left: `calc(${progress || 0}% - 10px)` }}
                />
              </div>

              {/* Info & Controls */}
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-300">{video.description}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onMuteToggle}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};