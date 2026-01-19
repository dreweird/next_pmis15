// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";


/**
 * Extract client IP from Next.js, X-Forwarded-For, or Cloudflare headers.
 * Falls back to "unknown" if not available.
 */
function getClientIp(req: NextRequest): string {
  // Next.js provides req.ip when behind certain proxies
  const directIp = (req as any).ip as string | undefined;

  // Common proxy header
  const xff = req.headers.get("x-forwarded-for") || "";

  // Cloudflare header
  const cfConnectingIp = req.headers.get("cf-connecting-ip") || "";

  const candidate =
    directIp ||
    (xff.split(",").map(s => s.trim()).find(Boolean) ?? "") ||
    cfConnectingIp;

  return candidate || "unknown";
}

/**
 * Build a strict Content Security Policy.
 * Adjust trusted origins as needed (e.g., analytics, fonts, APIs).
 */
function buildCsp(nonce: string): string {
  const csp = [
    "default-src 'self'",
    // Allow embedding Power BI 
    "frame-src 'self' https://app.powerbi.com",
    `script-src 'self' 'nonce-${nonce}'`, // allow scripts with this nonce
    `style-src 'self' 'unsafe-inline'`,  // allow styles with this nonce |'unsafe-inline' in style-src is required for AG Grid’s DOM virtualization.
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'", // add your API origins if needed, e.g., https://api.example.com
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ];
  return csp.join("; ");
}

/**
 * Paths to block outright (probes, legacy, or known malicious).
 * Customize to your environment.
 */
const blockedPathPrefixes = [
  "/news/index.html",
  "/blog/index.html",
];

const allowedMethods = new Set(["GET", "POST", "PUT", "DELETE", "OPTIONS"]);

export function proxy(req: NextRequest) {
  const method = req.method;
  const url = req.nextUrl.pathname + req.nextUrl.search;
  const ua = req.headers.get("user-agent") || "";
  const ip = getClientIp(req);

   const nonce = crypto.randomBytes(16).toString("base64");


  // Structured audit log
 // console.log(`[AUDIT] ${method} ${url} | ip=${ip} ua="${ua}"`);
  console.log(`[AUDIT] ${method} ${url}`);

  // Block suspicious paths
  if (blockedPathPrefixes.some(prefix => url.startsWith(prefix))) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Enforce allowed methods
  if (!allowedMethods.has(method)) {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  // Continue request and attach security headers
  const res = NextResponse.next();

  // Security headers
  // res.headers.set("Content-Security-Policy", buildCsp(nonce));
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "no-referrer");
  res.headers.set("Permissions-Policy", [
    "geolocation=()",
    "camera=()",
    "microphone=()",
    "payment=()",
    "usb=()",
    "accelerometer=()",
    "gyroscope=()",
    "magnetometer=()",
    "fullscreen=()",
  ].join(", "));
  // HSTS: enable only if you serve HTTPS in production
  res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  // Remove hop-by-hop headers if present (defensive; proxies should handle this)
  res.headers.delete("Connection");
  res.headers.delete("Transfer-Encoding");

  return res;
}

// Apply to all routes
export const config = {
  matcher: "/:path*",
};

// Things to log or monitor in future:
// - Rate limiting per IP (to mitigate brute force, DoS)
// - GeoIP logging (to detect unusual access patterns)
// - User agent anomalies (e.g., known bad bots)
// - Referrer analysis (to detect CSRF or unwanted traffic sources)