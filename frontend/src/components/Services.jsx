import { motion } from 'framer-motion';
import { Crosshair, Bug, Radar, ShieldAlert, Network, Lock } from 'lucide-react';

const services = [
  {
    icon: Crosshair,
    name: 'Red Team Ops',
    blurb:
      'Goal-oriented adversary emulation. We map your business risk to attacker objectives, then run scenarios against people, process, and tech.',
  },
  {
    icon: Bug,
    name: 'Application Pentesting',
    blurb:
      'Web, mobile, and API assessments anchored in OWASP and tailored to your stack. We chain bugs into real impact, not just severity ratings.',
  },
  {
    icon: Network,
    name: 'Cloud & Infra Audits',
    blurb:
      'AWS, GCP, Azure, and Kubernetes hardening reviews. We model the blast radius of a single compromise and tighten the perimeter that counts.',
  },
  {
    icon: Radar,
    name: 'Detection Engineering',
    blurb:
      'Sigma, Splunk, Sentinel, EDR. We translate adversary tradecraft into high-signal detections your SOC will actually act on.',
  },
  {
    icon: ShieldAlert,
    name: 'Incident Response',
    blurb:
      'On-call DFIR for active intrusions. Containment, root-cause, and a post-incident playbook your team can run without us next time.',
  },
  {
    icon: Lock,
    name: 'Secure SDLC',
    blurb:
      'Threat modeling, code review, and CI/CD pipeline hardening. Embedding security into the build so it stops being a last-mile problem.',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-28 sm:py-36"
      data-testid="services-section"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="label-mono mb-4">/// 01 capabilities</p>
          <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            Six practices. <span className="text-acid">One mission:</span> raise the cost of
            attacking you.
          </h2>
          <p className="mt-5 max-w-2xl font-mono text-white/70">
            We don&rsquo;t sell scanners or compliance theater. Every engagement is run by
            senior operators who&rsquo;ve shipped exploits, defended Fortune 500s, and lost
            sleep so you don&rsquo;t have to.
          </p>
        </div>

        <ul className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.li
              key={service.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative bg-ink-950 p-8 transition-colors hover:bg-ink-900"
              data-testid={`service-card-${i}`}
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(212,255,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(212,255,0,0.06) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <service.icon className="h-7 w-7 text-acid" aria-hidden />
              <h3 className="mt-6 font-display text-xl font-semibold">{service.name}</h3>
              <p className="mt-3 font-mono text-sm leading-relaxed text-white/60">
                {service.blurb}
              </p>
              <span className="absolute right-6 top-6 font-mono text-xs text-white/30">
                0{i + 1}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
