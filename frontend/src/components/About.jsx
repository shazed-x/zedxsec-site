import { motion } from 'framer-motion';
import { Users, Award, Globe2 } from 'lucide-react';

const pillars = [
  {
    icon: Users,
    title: 'Operator-led',
    body: 'Our team has shipped exploits at DEF CON, run blue teams at hyperscalers, and disclosed CVEs in software you probably depend on.',
  },
  {
    icon: Award,
    title: 'Outcome-priced',
    body: 'We scope by objective, not hours. You pay for the answer to a question that keeps you up at night, not a stack of timesheets.',
  },
  {
    icon: Globe2,
    title: 'Distributed',
    body: 'Operators across three time zones. Engagements move at the speed of your incident bridge, not a quarterly statement of work.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-white/5 py-28 sm:py-36"
      data-testid="about-section"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="label-mono mb-4">/// 03 the collective</p>
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              A small team of <span className="text-acid">specialists,</span> not a staffing
              agency.
            </h2>
            <p className="mt-6 max-w-xl font-mono leading-relaxed text-white/70">
              zedxsec was founded by a handful of operators who got tired of watching
              consultancies sell deliverables instead of defenses. We stay deliberately small.
              Every engagement is staffed by senior practitioners. No bench, no padding.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {[
                ['8', 'senior operators'],
                ['25y', 'avg. combined exp.'],
                ['EU + US', 'time zones'],
              ].map(([v, l]) => (
                <div key={l} className="border-l border-acid/50 pl-4">
                  <p className="font-display text-3xl">{v}</p>
                  <p className="label-mono mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <ul className="space-y-4">
            {pillars.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="grid-card flex gap-5 p-6"
                data-testid={`about-pillar-${i}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-acid/40 text-acid">
                  <p.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 font-mono text-sm leading-relaxed text-white/60">
                    {p.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
