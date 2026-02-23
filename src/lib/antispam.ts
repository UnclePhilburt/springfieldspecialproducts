/**
 * Bot prevention: honeypot field + minimum time check.
 *
 * - `website` is a hidden field that real users never fill out. Bots auto-fill it.
 * - `_t` is a timestamp set when the form renders. Submissions under 3 seconds are rejected.
 *
 * Returns true if the submission looks like spam.
 */
export function isSpam(data: { website?: string; _t?: number }): boolean {
  // Honeypot: if the hidden "website" field has a value, it's a bot
  if (data.website) return true;

  // Time check: if submitted less than 3 seconds after render, likely a bot
  if (data._t) {
    const elapsed = Date.now() - data._t;
    if (elapsed < 3000) return true;
  }

  return false;
}
