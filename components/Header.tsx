import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header id="site-header" className="bg-white border-b border-stone-200/80 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          id="brand-logo-btn"
          href="/"
          className="flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E23744] rounded-md py-1 px-1.5 transition-opacity hover:opacity-90"
          aria-label="Zomato Lite - Return to Home"
        >
          <div className="flex items-baseline tracking-tight">
            <span className="text-[#E23744] font-black text-2xl tracking-tighter">zomato</span>
            <span className="text-[#1C1C1C] font-light text-2xl ml-1 tracking-normal">lite</span>
          </div>
          <span
            id="beta-badge"
            className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200/90 ml-1.5"
          >
            BETA
          </span>
        </Link>
      </div>
    </header>
  );
};
