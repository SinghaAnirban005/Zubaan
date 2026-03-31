import { Button as MUIButton } from '@mui/material'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  icon?: React.ReactNode
}

export function Button({ children, variant = 'primary', size = 'md', className = '', onClick, icon }: ButtonProps) {
  const baseStyles = 'rounded-full font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2'
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40',
    outline: 'border border-zinc-700 text-white hover:border-orange-500 hover:bg-orange-500/10',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/5'
  }
  
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <button
        className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
        onClick={onClick}
      >
        {icon && <span className="material-icons text-current">{icon}</span>}
        {children}
      </button>
    </motion.div>
  )
}