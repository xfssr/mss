export const ADMIN_COOKIE_NAME = "cc_admin";

type Bytes = Uint8Array;

function utf8Bytes(s: string): Bytes {
  return new TextEncoder().encode(s);
}

function padBase64(s: string) {
  const pad = s.length % 4;
  return pad === 0 ? s : s + "=".repeat(4 - pad);
}

function base64ToBytes(b64: string): Bytes {
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(b64, "base64"));
  }
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function bytesToBase64(bytes: Bytes): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function toBase64Url(b64: string) {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(b64url: string) {
  return padBase64(b64url.replace(/-/g, "+").replace(/_/g, "/"));
}

function timingSafeEqual(a: Bytes, b: Bytes) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function hmacSha256(secret: string, data: string): Promise<Bytes> {
  const key = await crypto.subtle.importKey(
    "raw",
    utf8Bytes(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, utf8Bytes(data));
  return new Uint8Array(sig);
}

export async function createAdminCookieValue(secret: string, ttlSeconds = 60 * 60 * 24 * 7) {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload = `exp=${exp}`;

  const payloadB64 = toBase64Url(bytesToBase64(utf8Bytes(payload)));
  const sigBytes = await hmacSha256(secret, payload);
  const sig = toBase64Url(bytesToBase64(sigBytes));

  return `${payloadB64}.${sig}`;
}

export async function verifyAdminCookieValue(secret: string, value: string | undefined | null) {
  if (!value) return false;
  const [payloadB64, sigB64Url] = value.split(".");
  if (!payloadB64 || !sigB64Url) return false;

  const payload = new TextDecoder().decode(base64ToBytes(fromBase64Url(payloadB64)));
  const expectedSigBytes = await hmacSha256(secret, payload);
  const gotSigBytes = base64ToBytes(fromBase64Url(sigB64Url));

  if (!timingSafeEqual(gotSigBytes, expectedSigBytes)) return false;

  const m = /exp=(\d+)/.exec(payload);
  if (!m) return false;
  const exp = Number(m[1]);
  return Math.floor(Date.now() / 1000) < exp;
}
