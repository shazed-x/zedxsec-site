import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const cases = [
  {
    sector: 'Fintech',
    headline: 'Pre-IPO red team uncovered cross-tenant data exposure in core ledger.',
    metrics: [
      ['7d', 'to full domain compromise'],
      ['12', 'critical findings'],
      ['100%', 'remediated pre-launch'],
    ],
    tag: 'red team',
  },
  {
    sector: 'HealthTech',
    headline: 'HIPAA-aligned threat model and SDLC overhaul shipped alongside Series B.',
    metrics: [
      ['3', 'product lines hardened'],
      ['62%', 'fewer security regressions'],
      ['SOC 2', 'audit cleared'],
    ],
    tag: 'secure sdlc',
  },
  {
    sector: 'SaaS',
    headline: 'Detection engineering rebuild cut SOC alert volume while raising true-positive rate.',
    metrics: [
      ['-78%', 'noise'],
      ['+3.4x', 'TP rate'],
      ['90', 'sigma rules shipped'],
    ],
    tag: 'detection',
  },
];

export default function Work() {
  return (
    <section
      id="work"
      className="relative border-t border-white/5 py-28 sm:py-36"
      data-testid="work-section"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="label-mono mb-4">/// 02 selected work</p>
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              Receipts, not <span className="text-acid">case studies.</span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-sm text-white/60">
            Names anonymized. Numbers real. Every engagement ends with an executive readout and
            an artifact your engineers can ship against.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {cases.map((c, i) => (
            <motion.article
              key={c.headline}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="grid-card group corner-brackets relative flex h-full flex-col p-8"
              data-testid={`work-card-${i}`}
            >
              <header className="flex items-center justify-between">
                <span className="label-mono text-acid">{c.sector}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                  {c.tag}
                </span>
              </header>
              <h3 className="mt-6 font-display text-lg font-semibold leading-snug">
                {c.headline}
              </h3>

              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {c.metrics.map(([value, label]) => (
                  <div key={label}>
                    <dt className="font-display text-xl text-acid">{value}</dt>
                    <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex items-center justify-between text-white/50 transition group-hover:text-acid">
                <span className="font-mono text-xs uppercase tracking-widest">read brief</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
