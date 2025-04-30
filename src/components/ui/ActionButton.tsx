
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function ActionButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  ...props 
}: ActionButtonProps) {
  const baseClass = "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variantClass = {
    primary: "bg-logistic-accent text-white hover:bg-pink-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    destructive: "bg-red-600 text-white hover:bg-red-700"
  };
  
  const sizeClass = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2.5 text-base"
  };
  
  return (
    <button
      className={cn(
        baseClass,
        variantClass[variant],
        sizeClass[size],
        "gap-2",
        className
      )}
      {...props}
    >
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </button>
  );
}
