import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
        "surface-warm": "var(--surface-warm)",
        border: "var(--border)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          foreground: "var(--accent-foreground)",
          amber: "var(--accent-amber)",
          "amber-light": "var(--accent-amber-light)",
        },
        destructive: "var(--destructive)",
        success: "var(--success)",
        warning: "var(--warning)",
        // shadcn compatibility
        foreground: "var(--text-primary)",
        card: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text-primary)",
        },
        primary: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        secondary: {
          DEFAULT: "var(--surface-warm)",
          foreground: "var(--text-secondary)",
        },
        muted: {
          DEFAULT: "var(--surface-warm)",
          foreground: "var(--text-muted)",
        },
        input: "var(--border)",
        ring: "var(--accent)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "2xs": "12px",
        xs: "14px",
        sm: "14px",
        base: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
        "4xl": "48px",
        "5xl": "64px",
        "6xl": "80px",
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "6px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(45,27,14,0.06), 0 4px 16px rgba(45,27,14,0.06)",
        "card-hover":
          "0 4px 16px rgba(255,107,74,0.12), 0 8px 32px rgba(45,27,14,0.08)",
        dropdown: "0 4px 20px rgba(45,27,14,0.12)",
        modal: "0 16px 48px rgba(45,27,14,0.16)",
        cta: "0 4px 12px rgba(255,107,74,0.32)",
      },
      spacing: {
        "section-desktop": "96px",
        "section-tablet": "64px",
        "section-mobile": "48px",
      },
      maxWidth: {
        container: "1200px",
        content: "960px",
        prose: "720px",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "draw-in": "draw-in 0.8s ease-out",
        "fade-up": "fade-up 0.4s ease-out",
        "scale-in": "scale-in 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "draw-in": {
          from: { "stroke-dashoffset": "1" },
          to: { "stroke-dashoffset": "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { transform: "scale(0.8)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
