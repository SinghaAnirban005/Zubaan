'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { VideoUploader } from '../components/VideoUploader';
import { LoadingSpinner } from '@/app/components/ui/LoadingSpinner';
import { Toast } from '@/app/components/ui/Toast';
import { api } from '@/lib/api';
import { extractSentences } from '../utils/extractSentences';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  if (!authLoading && !isAuthenticated) {
    router.push('/');
    return null;
  }

  const handleVideoUpload = async (file: File) => {
    setIsProcessing(true);
    
    try {
      setProcessingStep('Uploading and transcribing video...');
      const uploadResponse = await api.uploadVideo(file);
      const { transcript, videoPath } = uploadResponse;
      
      setProcessingStep('Processing transcript...');
      const sentences = extractSentences(transcript);

      setProcessingStep('Converting to Hinglish...');
      const hinglishResponse = await api.generateHinglish(sentences, videoPath);
      const hinglishSentences = hinglishResponse.cues;

      setProcessingStep('Generating subtitles...');
      const subtitleResponse = await api.generateSubtitles(hinglishSentences, videoPath);
      const srtContent = subtitleResponse.data;
      
      setProcessingStep('Burning subtitles to video...');
      const videoBlob = await api.burnSubtitles(srtContent, videoPath);
      
      const url = window.URL.createObjectURL(videoBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `subtitled_video_${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setToast({ 
        message: 'Video processed successfully! Download started.', 
        type: 'success' 
      });
      
    } catch (error) {
      console.error('Processing error:', error);
      setToast({ 
        message: error instanceof Error ? error.message : 'Failed to process video', 
        type: 'error' 
      });
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Subtitle Generator</h1>
          <p className="text-gray-400 text-lg">
            Upload your video and get it back with Hinglish subtitles automatically
          </p>
        </div>

        <VideoUploader 
          onUpload={handleVideoUpload}
          isProcessing={isProcessing}
          processingStep={processingStep}
        />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}