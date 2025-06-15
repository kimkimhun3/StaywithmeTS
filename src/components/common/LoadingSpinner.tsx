import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div 
        className={`animate-spin rounded-full border-2 border-blue-500 border-t-transparent ${sizeClasses[size]} mb-4`} 
      />
      {message && (
        <p className="text-slate-600 text-sm">{message}</p>
      )}
    </div>
  );
};