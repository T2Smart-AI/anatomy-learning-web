// Per-device persistence for bookmarks, quiz best scores and the
// weak-structure list. localStorage with an in-memory fallback
// (private browsing / storage-full). Replaces the Perchance kv-plugin.
const PREFIX = "ana_";
const memory = new Map();

function safe(fn, fallback) {
  try { return fn(); } catch { return fallback; }
}

export const storage = {
  async get(key) {
    const raw = safe(() => localStorage.getItem(PREFIX + key), null);
    if (raw == null) return memory.get(key) ?? null;
    try { return JSON.parse(raw); } catch { return raw; }
  },
  async set(key, value) {
    const raw = JSON.stringify(value);
    safe(() => localStorage.setItem(PREFIX + key, raw), null);
    memory.set(key, value);
  },
  async delete(key) {
    safe(() => localStorage.removeItem(PREFIX + key), null);
    memory.delete(key);
  },
};
