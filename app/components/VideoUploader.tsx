'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { CloudUpload, X, Video, Play, CheckCircle2, Loader2, Circle } from 'lucide-react';

interface VideoUploaderProps {
  onUpload: (file: File) => Promise<void>;
  isProcessing: boolean;
  processingStep: string;
}

export function VideoUploader({ onUpload, isProcessing, processingStep }: VideoUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile && !isProcessing) {
      await onUpload(selectedFile);
    }
  };

  const processingSteps = [
    'Uploading and transcribing video...',
    'Processing transcript...',
    'Converting to Hinglish...',
    'Generating subtitles...',
    'Burning subtitles to video...'
  ];

  const currentStepIndex = processingSteps.findIndex(step => step === processingStep);
  const progress = currentStepIndex >= 0 ? ((currentStepIndex + 1) / processingSteps.length) * 100 : 0;

  return (
    <Card className="p-8">
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
          dragActive
            ? 'border-orange-500 bg-orange-500/10'
            : 'border-zinc-700 hover:border-orange-500/50'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {!selectedFile ? (
  <div className="flex flex-col items-center justify-center text-center p-8">
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: dragActive ? 1.05 : 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center"
    >
      <CloudUpload size={60} className="text-gray-600 mb-4" />
      <p className="text-gray-400 mb-4 text-lg">
        Drag & drop your video here, or{' '}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-orange-500 hover:text-orange-400 font-medium"
        >
          browse
        </button>
      </p>
      <p className="text-gray-500 text-sm">
        Supports MP4, MOV, AVI (Max 500MB)
      </p>
    </motion.div>
  </div>
) : (
  <div className="space-y-6">
    <div className="flex items-center justify-center gap-3">
      {/* Updated to Video icon */}
      <Video className="text-orange-500" size={32} /> 
      <div className="text-left">
        <p className="text-white font-medium">{selectedFile.name}</p>
        <p className="text-gray-400 text-sm">
          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
        </p>
      </div>
      {!isProcessing && (
        <button
          onClick={() => setSelectedFile(null)}
          className="text-red-500 hover:text-red-400 ml-4"
        >
          {/* Updated to X icon */}
          <X size={20} />
        </button>
      )}
    </div>

    {isProcessing ? (
      <div className="space-y-4">
        <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-orange-500 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="space-y-2">
          <p className="text-orange-500 font-medium">{processingStep}</p>
          <div className="space-y-1">
            {processingSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                {idx <= currentStepIndex ? (
                  <CheckCircle2 className="text-green-500" size={16} />
                ) : idx === currentStepIndex + 1 ? (
                  <Loader2 className="text-orange-500 animate-spin" size={16} />
                ) : (
                  <Circle className="text-gray-600" size={16} />
                )}
                <span className={idx <= currentStepIndex ? 'text-gray-300' : 'text-gray-500'}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className="flex gap-3 justify-center">
        <Button variant="primary" onClick={handleUpload} size="lg">
          <Play size={18} className="mr-2" />
          Process Video
        </Button>
        <Button variant="outline" onClick={() => setSelectedFile(null)} size="lg">
          <X size={18} className="mr-2" />
          Cancel
        </Button>
      </div>
    )}
  </div>
)}
      </div>

      {!selectedFile && !isProcessing && (
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>No file selected. Click browse or drag & drop to get started.</p>
        </div>
      )}
    </Card>
  );
}