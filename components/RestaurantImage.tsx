'use client';

import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface RestaurantImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  autoHeight?: boolean;
  objectFit?: 'cover' | 'contain';
  imgClassName?: string;
}

export const RestaurantImage: React.FC<RestaurantImageProps> = ({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-[16/10]',
  autoHeight = false,
  objectFit = 'cover',
  imgClassName = '',
}) => {
  const [loadError, setLoadError] = useState(false);

  const filename = src.split('/').pop() || src;

  if (autoHeight) {
    return (
      <div className={`relative w-full overflow-hidden bg-stone-100 ${className}`}>
        {!loadError ? (
          <img
            key={src}
            src={src}
            alt={alt}
            onError={() => setLoadError(true)}
            className={`w-full h-auto block -mb-[17.5%] ${imgClassName}`}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full aspect-[16/10] flex flex-col items-center justify-center p-6 text-center bg-[#FAF6F0] border-b border-stone-200/60">
            <div className="w-12 h-12 rounded-full bg-stone-200/70 flex items-center justify-center text-stone-500 mb-2">
              <Utensils size={20} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Reference Asset: {filename}
            </p>
            <p className="text-[11px] text-stone-500 max-w-[200px] leading-relaxed">
              Exact reference food photo will display when placed in <code className="text-stone-700 font-mono">/public/images/</code>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${
        objectFit === 'contain' ? 'bg-[#181615] flex items-center justify-center' : 'bg-stone-100'
      } ${aspectClassName} ${className}`}
    >
      {!loadError ? (
        <img
          key={src}
          src={src}
          alt={alt}
          onError={() => setLoadError(true)}
          className={`w-full h-full ${
            objectFit === 'contain'
              ? 'object-contain max-h-full'
              : 'object-cover object-top origin-top transition-transform duration-300 group-hover:scale-105'
          } ${imgClassName}`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#FAF6F0] border-b border-stone-200/60">
          <div className="w-12 h-12 rounded-full bg-stone-200/70 flex items-center justify-center text-stone-500 mb-2">
            <Utensils size={20} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
            Reference Asset: {filename}
          </p>
          <p className="text-[11px] text-stone-500 max-w-[200px] leading-relaxed">
            Exact reference food photo will display when placed in <code className="text-stone-700 font-mono">/public/images/</code>
          </p>
        </div>
      )}
    </div>
  );
};
