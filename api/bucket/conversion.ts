// api/bucket/conversion.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const NID       = process.env.BUCKET_NID ?? '1104';
const EVENT_ID  = process.env.BUCKET_EVENT_ID; // ← הגדר בפרוד: 889

// דה-דופליקציה פשוטה בזמן ריצה (מומלץ להחליף ב-DB/Redis בפרודקשן)
const seen = new Map<string, number>();
function seenRecently(key: string, ttlMs = 10 * 60 * 1000) {
  const now = Date.now();
  for (const [k, t] of seen) if (t < now - ttlMs) seen.delete(k);
  if (seen.has(key)) return true;
  seen.set(key, now);
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    transaction_id,
    amount, email,
    adv1, adv2, adv3, adv4, adv5,
    order_id,
    event_id: bodyEventId, // ← חדש: מאפשר להעביר event_id גם מהקליינט (אופציונלי)
  } = (req.body ?? {}) as Record<string, unknown>;

  if (!transaction_id) {
    return res.status(400).json({ error: 'Missing transaction_id (must equal screamid)' });
  }

  const dedupeKey = String(order_id ?? transaction_id);
  if (seenRecently(dedupeKey)) {
    return res.json({ ok: true, deduped: true });
  }

  const url = new URL('https://go.scrmgo.com/');
  url.searchParams.set('nid', NID);
  url.searchParams.set('transaction_id', String(transaction_id));

  // ⚠️ חובה לליד: event_id=889 (או ערך אחר שתגדיר ב-ENV)
  const effectiveEventId = bodyEventId ?? EVENT_ID;
  if (effectiveEventId != null && String(effectiveEventId).length > 0) {
    url.searchParams.set('event_id', String(effectiveEventId));
  }

  const optionals: Record<string, unknown> = {
    amount, email, adv1, adv2, adv3, adv4, adv5, order_id,
  };
  for (const [k, v] of Object.entries(optionals)) {
    if (v !== undefined && v !== null && String(v).length > 0) {
      url.searchParams.set(k, String(v));
    }
  }

  try {
    const upstream = await fetch(url.toString(), {
      method: 'GET',
      headers: { accept: '*/*' },
      cache: 'no-store',
    });
    const text = await upstream.text();
    return res.status(upstream.ok ? 200 : 502).json({
      ok: upstream.ok,
      status: upstream.status,
      upstreamRaw: text, // ניתן להסרה בפרוד אם לא צריך
    });
  } catch (e: unknown) {
    return res.status(502).json({
      error: 'Upstream request failed',
      message: e instanceof Error ? e.message : String(e),
    });
  }
}
