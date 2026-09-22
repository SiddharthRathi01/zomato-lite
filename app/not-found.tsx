import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div id="not-found-page" className="max-w-md mx-auto py-16 px-4 text-center">
      <div className="bg-white rounded-2xl border border-stone-200/90 p-8 shadow-sm">
        <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">404</h1>
        <h2 className="text-base font-semibold text-stone-700 mb-2">Page Not Found</h2>
        <p className="text-sm text-stone-500 mb-6">
          The page or restaurant you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#E23744] hover:bg-[#CB202D] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to restaurants</span>
        </Link>
      </div>
    </div>
  );
}
