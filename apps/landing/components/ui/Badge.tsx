import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'muted';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary',
  className = '' 
}) => {
  const variantClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary-cream text-secondary-tan border-secondary-tan/20',
    muted: 'bg-muted-light text-muted border-border',
  };

  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
