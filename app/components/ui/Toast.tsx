'use client';

import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      color: 'bg-green-500',
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    error: {
      color: 'bg-red-500',
      icon: <AlertCircle className="w-5 h-5" />,
    },
    info: {
      color: 'bg-blue-500',
      icon: <Info className="w-5 h-5" />,
    },
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 ${config[type].color} text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-up flex items-center justify-between min-w-[280px]`}
    >
      <div className="flex items-center gap-3">
        {config[type].icon}
        <span className="text-sm font-medium">{message}</span>
      </div>
      
      <button 
        onClick={onClose}
        className="ml-4 hover:bg-white/20 p-1 rounded-full transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}