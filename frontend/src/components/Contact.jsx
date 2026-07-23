import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { api } from '../lib/api';

const initial = { name: '', email: '', company: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState({ status: 'idle', error: null, reference: null });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setState({ status: 'submitting', error: null, reference: null });
    try {
      const result = await api.contact({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || null,
        message: form.message.trim(),
      });
      setState({ status: 'success', error: null, reference: result.reference });
      setForm(initial);
    } catch (err) {
      setState({ status: 'error', error: err.message || 'Submission failed', reference: null });
    }
  };

  return (
    <section
      id="contact"
      className="relative border-t border-white/5 py-28 sm:py-36"
      data-testid="contact-section"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="label-mono mb-4">/// 04 engage</p>
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              Tell us what&rsquo;s <span className="text-acid">keeping you up.</span>
            </h2>
            <p className="mt-6 max-w-md font-mono text-white/70">
              Drop us a line. We respond within one business day. For active incidents,
              email <span className="text-acid">ir@zedxsec.com</span> directly.
            </p>

            <dl className="mt-12 space-y-4 font-mono text-sm">
              {[
                ['general', 'hello@zedxsec.com'],
                ['incident response', 'ir@zedxsec.com'],
                ['careers', 'crew@zedxsec.com'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-white/5 pb-3">
                  <dt className="label-mono">{label}</dt>
                  <dd className="text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="grid-card relative space-y-5 p-8"
            data-testid="contact-form"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Name"
                value={form.name}
                onChange={update('name')}
                required
                testid="contact-input-name"
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={update('email')}
                required
                testid="contact-input-email"
              />
            </div>
            <Field
              label="Company"
              value={form.company}
              onChange={update('company')}
              testid="contact-input-company"
            />
            <label className="block">
              <span className="label-mono">Message</span>
              <textarea
                rows={5}
                required
                minLength={10}
                value={form.message}
                onChange={update('message')}
                className="mt-2 block w-full resize-none border border-white/10 bg-ink-950/60 px-4 py-3 font-mono text-sm text-white placeholder-white/30 focus:border-acid focus:outline-none focus:ring-1 focus:ring-acid"
                placeholder="What are we looking at?"
                data-testid="contact-input-message"
              />
            </label>

            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs text-white/40">
                Submissions are encrypted in transit. We never share your data.
              </p>
              <button
                type="submit"
                className="btn-acid disabled:cursor-not-allowed disabled:opacity-60"
                disabled={state.status === 'submitting'}
                data-testid="contact-submit"
              >
                {state.status === 'submitting' ? 'Transmitting' : 'Transmit'}
                <Send className="h-4 w-4" />
              </button>
            </div>

            {state.status === 'success' && (
              <p
                className="flex items-center gap-2 border border-acid/40 bg-acid/10 px-4 py-3 font-mono text-sm text-acid"
                data-testid="contact-success"
              >
                <CheckCircle2 className="h-4 w-4" /> Received. Reference {state.reference}.
              </p>
            )}
            {state.status === 'error' && (
              <p
                className="flex items-center gap-2 border border-cyber-magenta/40 bg-cyber-magenta/10 px-4 py-3 font-mono text-sm text-cyber-magenta"
                data-testid="contact-error"
              >
                <AlertTriangle className="h-4 w-4" /> {state.error}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', required, testid }) {
  return (
    <label className="block">
      <span className="label-mono">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 block w-full border border-white/10 bg-ink-950/60 px-4 py-3 font-mono text-sm text-white placeholder-white/30 focus:border-acid focus:outline-none focus:ring-1 focus:ring-acid"
        data-testid={testid}
      />
    </label>
  );
}
