"use client";

import { useEffect, useState } from "react";

/**
 * Prevents Framer Motion initial states (opacity:0) from being serialized into SSR HTML.
 * Wrap any section that uses motion animations to ensure they only render client-side.
 */
export function MotionReady({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return <>{children}</>;
}
