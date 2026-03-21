"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong"); setLoading(false); return; }
      const signInResult = await signIn("credentials", { email, redirect: false });
      if (signInResult?.error) { setError("Login failed after signup"); setLoading(false); return; }
      router.push("/onboarding");
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <Link href="/" className="font-display text-2xl font-bold mb-8 block" style={{ color: "var(--text-primary)" }}>
            Party<span style={{ color: "var(--accent)" }}>pop</span>
          </Link>
          <h1 className="font-display text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Create your account</h1>
          <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>Free for your first party. No credit card needed.</p>

          {error && (
            <div className="mb-4 p-3 rounded-md text-sm" style={{ background: "#FEE2E2", color: "var(--destructive)" }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-md text-base outline-none transition-all border"
                style={{ borderColor: "var(--border)", background: "white", color: "var(--text-primary)" }}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-md text-base outline-none transition-all border"
                style={{ borderColor: "var(--border)", background: "white", color: "var(--text-primary)" }}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md text-sm font-semibold text-white transition-all hover:scale-[1.01] disabled:opacity-60 mt-2"
              style={{ background: "var(--accent)", boxShadow: "0 4px 12px rgba(255,107,74,0.32)" }}
            >
              {loading ? "Creating account..." : "Create Free Account →"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1" style={{ borderColor: "var(--border)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>or</span>
            <hr className="flex-1" style={{ borderColor: "var(--border)" }} />
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
            className="w-full py-3 rounded-md text-sm font-semibold border transition-all hover:bg-gray-50 flex items-center justify-center gap-2"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
            Continue with Google
          </button>

          <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link href="/login" className="font-medium hover:underline" style={{ color: "var(--accent)" }}>Log in</Link>
          </p>
        </motion.div>
      </div>

      {/* Right: gradient + product preview */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12"
        style={{ background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-amber) 100%)" }}>
        <div className="max-w-xs w-full">
          <Image src="/images/hero-illustration.png" alt="Partypop dashboard" width={400} height={280} className="rounded-xl mb-8"
            style={{ boxShadow: "0 16px 48px rgba(45,27,14,0.2)", transform: "rotate(1deg)" }} />
          <div className="flex flex-col gap-3">
            {["AI-generated plan in 2 minutes", "Checklist + shopping list included", "Local vendor recommendations"].map(f => (
              <div key={f} className="flex items-center gap-2.5">
                <Check size={16} className="text-white flex-shrink-0" />
                <span className="text-sm text-white/90">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
