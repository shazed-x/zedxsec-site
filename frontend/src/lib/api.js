// Thin fetch wrapper for the FastAPI backend. Vite proxies /api to localhost:8000 in dev.

const API_BASE = import.meta.env.VITE_API_BASE || '';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail || detail;
    } catch {
      /* ignore parse errors */
    }
    throw new Error(typeof detail === 'string' ? detail : 'Request failed');
  }

  return res.json();
}

export const api = {
  status: () => request('/api/status'),
  contact: (payload) =>
    request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
