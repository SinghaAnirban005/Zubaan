export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface TranscriptResponse {
  message: string;
  transcript: string;
  videoPath: string;
}

export interface HinglishResponse {
  message: string;
  videoPath: string;
  data: string[];
  cues: Array<{
    text: string;
    start: number;
    end: number;
  }>;
}

export interface SubtitleResponse {
  message: string;
  data: string;
  videoPath: string;
}

export interface BurnSubtitleResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface SubtitleJob {
  id: string;
  status: 'PENDING' | 'DONE' | 'FAILED';
  srtData: string;
  userId: string;
}

export interface UploadProgress {
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  message?: string;
}