import { HinglishResponse, SubtitleResponse, User } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

class API {
  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async uploadVideo(file: File): Promise<any> {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('video', file);

      try {
        const response = await fetch(`${API_BASE_URL}/audio/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
    
        if (!response.ok) {
          throw new Error('Upload failed');
        }
    
        return response.json();
      } catch (error) {
        console.error(error)
        return {
          "transcript": "",
          "videoPath": ""
        }
      }
  }

  generateHinglish(
  sentences: { text: string; start: number; end: number }[],
  videoPath: string
): Promise<HinglishResponse> {
  
    return this.fetchWithAuth('/audio/generate', {
      method: 'POST',
      body: JSON.stringify({ sentences, videoPath }),
    });
  }

  async generateSubtitles(sentences: Array<{"text": string, "start": number, "end": number}>, videoPath: string): Promise<SubtitleResponse> {
    return this.fetchWithAuth('/subtitle/generate', {
      method: 'POST',
      body: JSON.stringify({ sentences, videoPath }),
    });
  }

  async burnSubtitles(srt: string, videoPath: string): Promise<Blob> {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/subtitle/burn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ srt, videoPath }),
    });

    if (!response.ok) {
      throw new Error('Failed to burn subtitles');
    }

    return response.blob();
  }

  async logout(): Promise<void> {
    await this.fetchWithAuth('/auth/logout', { method: 'POST' });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
}

export const api = new API();