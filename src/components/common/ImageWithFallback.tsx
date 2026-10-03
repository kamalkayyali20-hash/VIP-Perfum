import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackText = 'VIP PERFUM',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-b from-[#1c1c1c] to-[#121212] border border-[#D4AF37]/20 text-[#B6B0A4] p-4 text-center ${className}`}
        role="img"
        aria-label={alt || fallbackText}
      >
        <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mb-2 bg-[#080808]">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        </div>
        <span className="font-brand text-xs text-[#D4AF37] tracking-widest">{fallbackText}</span>
        <span className="text-[11px] text-[#B6B0A4] mt-1 line-clamp-1">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
      {...props}
    />
  );
};
