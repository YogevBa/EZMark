// src/lib/bucket.ts
export type BucketParams = {
  ref?: string;
  screamid?: string;
  aff_id?: string;
};

export function parseAndStoreBucketParams(storage: Storage = localStorage) {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);

  const ref = params.get('ref') || undefined;
  const screamid = params.get('screamid') || undefined;
  const aff_id = params.get('aff_id') || undefined;

  if (ref || screamid || aff_id) {
    const data: BucketParams = { ref, screamid, aff_id };
    storage.setItem('bucketParams', JSON.stringify(data));
    setCookie('bucket.ref', ref ?? '', 30);
    setCookie('bucket.screamid', screamid ?? '', 30);
    setCookie('bucket.aff_id', aff_id ?? '', 30);
  }
}

export function getBucketParams(storage: Storage = localStorage): BucketParams {
  try {
    const raw = storage.getItem('bucketParams');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function triggerBucketConversion(payload: {
  amount?: number | string;
  email?: string;
  adv1?: string; adv2?: string; adv3?: string; adv4?: string; adv5?: string;
  order_id?: string | number;
  transaction_id?: string; // אופציונלי אם תרצה לעקוף ידנית; אחרת ניקח מה-screamid שנשמר
}) {
  const tx =
    payload.transaction_id ||
    getCookie('bucket.screamid') ||
    getBucketParams().screamid;

  if (!tx) throw new Error('Missing transaction_id (screamid).');

  const res = await fetch('/api/bucket/conversion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ ...payload, transaction_id: tx }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Conversion failed: ${res.status} ${text}`);
  }
  return res.json();
}

// ---------- Cookie utils ----------
export function setCookie(name: string, value: string, days = 30) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ` +
    `expires=${expires}; path=/; samesite=lax`;
}

export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const target = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split('; ');
  for (const p of parts) {
    if (p.indexOf(target) === 0) {
      return decodeURIComponent(p.substring(target.length));
    }
  }
  return undefined;
}
