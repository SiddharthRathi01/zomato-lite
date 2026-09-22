import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-stone-200/80 bg-white py-8 mt-auto text-center text-xs text-stone-400">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Zomato Lite. Restaurant discovery & review prototype.</p>
        <p className="text-stone-400 font-medium">Curated dining insights</p>
      </div>
    </footer>
  );
};
