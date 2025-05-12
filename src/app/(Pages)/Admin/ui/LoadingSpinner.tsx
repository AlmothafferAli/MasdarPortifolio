import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = '#31a4dc' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div 
        className={`animate-spin rounded-full border-t-2 border-b-2 ${sizeClasses[size]}`}
        style={{ borderColor: color }}
      />
    </div>
  );
};

export default LoadingSpinner; 