'use client';

import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  icon,
  loading = false,
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'rounded-full font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2';
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed',
    outline: 'border border-zinc-700 text-white hover:border-orange-500 hover:bg-orange-500/10 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed'
  };
  
  const isDisabled = disabled || loading;
  
  return (
    <motion.div 
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
    >
      <button
        type={type}
        className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!loading && icon && <span className="material-icons text-current">{icon}</span>}
        {children}
      </button>
    </motion.div>
  );
}