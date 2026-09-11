import React from 'react';
import logoImg from '../assets/images/direct_white_logo_only.png';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'header';
}

/**
 * White Brain Logo Image Component
 * Uses the uploaded direct logo image (direct_white_logo_only.png).
 * Retains natural aspect ratio (w-auto object-contain), vertically middle-aligned.
 */
export const WhiteBrainLogo: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'header';
}> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
    header: 'h-10 sm:h-11 md:h-12',
  };

  return (
    <img
      src={logoImg}
      alt="Build Minds Logo"
      className={`w-auto object-contain shrink-0 select-none ${sizeClasses[size]} ${className}`}
      style={{ aspectRatio: '583 / 461' }}
      loading="eager"
      decoding="async"
    />
  );
};

// Backward-compatible alias
export const RoundLogoEmblem = WhiteBrainLogo;

export const BuildMindsLogo: React.FC<LogoProps> = ({
  className = '',
  showTagline = false,
  size = 'md',
  variant = 'light',
}) => {
  const textColor = variant === 'dark' ? 'text-[#213345]' : 'text-white';

  // Variant for Header:
  // Requirement 1: Use the exact provided image, retain aspect ratio without stretching, vertically centered.
  // Requirement 2: Make the Brand name in TWO LINES in the Top Header only.
  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 p-0 select-none ${className}`}>
        {/* Exact Logo Image - Vertically middle aligned with text */}
        <WhiteBrainLogo size="header" />

        {/* Brand Name in Two Lines (Top Header Only) */}
        <div className="flex flex-col justify-center select-none py-0.5">
          <span className="font-black tracking-wider text-base sm:text-lg text-white uppercase leading-none">
            BUILD
          </span>
          <span className="font-black tracking-wider text-base sm:text-lg text-[#D98A1E] uppercase leading-none mt-1">
            MINDS
          </span>
        </div>
      </div>
    );
  }

  // Footer or default representation:
  // Brand name in ONE line (horizontal), retaining its tagline
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 p-0 select-none ${className}`}>
      {/* Exact Logo Image - Vertically middle aligned */}
      <WhiteBrainLogo size={size} />

      {/* Brand Typography (Horizontal in Footer) */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline space-x-1.5">
          <span className={`font-black tracking-tight ${textSizes[size]} ${textColor} uppercase`}>
            BUILD
          </span>
          <span className={`font-black tracking-tight ${textSizes[size]} text-[#D98A1E] uppercase`}>
            MINDS
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-amber-500/90 mt-1 uppercase">
            Train Minds Build Products
          </span>
        )}
      </div>
    </div>
  );
};

