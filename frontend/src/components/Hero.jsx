import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const HeroScene = lazy(() => import('../three/HeroScene.jsx'));

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: 'easeOut' },
  }),
};

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 -z-10 bg-grid-faint bg-grid opacity-40" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-2/3 bg-[radial-gradient(ellipse_at_top,_rgba(212,255,0,0.12),_transparent_60%)]" />

      <div className="absolute inset-0 -z-10" aria-hidden>
        {!reducedMotion ? (
          <Suspense fallback={<div className="h-full w-full bg-ink-950" />}>
            <HeroScene />
          </Suspense>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_40%,_rgba(212,255,0,0.18),_transparent_55%)]" />
        )}
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-24">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="label-mono mb-6 inline-flex items-center gap-2"
          data-testid="hero-tagline"
        >
          <Terminal className="h-3.5 w-3.5 text-acid" aria-hidden />
          /// offensive security, defensive outcomes
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
          data-testid="hero-heading"
        >
          We break things <br />
          so attackers <span className="text-acid text-glow-acid">can&rsquo;t.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 max-w-2xl font-mono text-base leading-relaxed text-white/70 sm:text-lg"
        >
          zedxsec is a boutique cybersecurity collective for teams shipping fast and refusing
          to ship insecure. Red team operations, application security, and detection
          engineering, run by practitioners.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href="#contact" className="btn-acid" data-testid="hero-primary-cta">
            Start an engagement <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#services" className="btn-ghost" data-testid="hero-secondary-cta">
            See capabilities
          </a>
        </motion.div>

        <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {[
            ['200+', 'engagements'],
            ['40+', 'CVEs disclosed'],
            ['12', 'industries'],
            ['0', 'leaked clients'],
          ].map(([value, label]) => (
            <div key={label} className="border-l border-acid/40 pl-4">
              <dt className="font-display text-2xl text-white">{value}</dt>
              <dd className="label-mono mt-1">{label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink-950" />
    </section>
  );
}
