import { ShieldHalf } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 bg-ink-950" data-testid="site-footer">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 font-display text-base">
          <ShieldHalf className="h-4 w-4 text-acid" aria-hidden />
          zedx<span className="text-acid">sec</span>
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-white/40">
          (c) {year} zedxsec collective. all rights reserved.
        </p>
        <p className="font-mono text-[10px] text-white/30">
          PGP fingerprint available on request.
        </p>
      </div>
    </footer>
  );
}
