import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string | undefined;
  rightElement?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const Header = ({
  title,
  subtitle,
  rightElement,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}: HeaderProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 ${className}`}
    >
      <div className='space-y-1.5'>
        <h1 className={`text-3xl font-bold text-primary-900 ${titleClassName}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`text-base text-muted-foreground ${subtitleClassName}`}>
            {subtitle}
          </p>
        )}
      </div>

      {rightElement && (
        <div className='flex items-center gap-4'>{rightElement}</div>
      )}
    </div>
  );
};

export default Header;
