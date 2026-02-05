export interface Video {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: string;
  featured: boolean;
  description: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface PlayingState {
  [key: number]: boolean;
}

export interface MutedState {
  [key: number]: boolean;
}

export interface ProgressState {
  [key: number]: number;
}

export interface VideoRefs {
  [key: number]: HTMLVideoElement | null;
}

