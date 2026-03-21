export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--background)" }}>
      <section className="py-16" style={{ background: "var(--surface-warm)" }}>
        <div className="max-w-prose mx-auto px-6">
          <h1 className="font-display font-bold text-4xl mb-2" style={{ color: "var(--text-primary)" }}>Privacy Policy</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Last updated: March 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-prose mx-auto px-6 flex flex-col gap-8 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <div>
            <h2 className="font-display font-bold text-2xl mb-3" style={{ color: "var(--text-primary)" }}>What We Collect</h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li><strong>Account info:</strong> name and email address provided during registration (via email signup or Google OAuth)</li>
              <li><strong>Party data:</strong> theme, budget, headcount, party date, venue type, zip code, dietary notes, and any custom inputs provided during party planning</li>
              <li><strong>Guest data:</strong> names, email addresses, RSVP status, and dietary information you enter for your guests</li>
              <li><strong>Usage data:</strong> pages visited, features used, browser type, IP address (via standard web analytics)</li>
              <li><strong>Payment data:</strong> processed entirely by Stripe. Partypop does not store credit card numbers.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl mb-3" style={{ color: "var(--text-primary)" }}>How We Use It</h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>To generate your AI party plan (your party details are sent to OpenAI as prompts; no personally identifiable information beyond party parameters is included)</li>
              <li>To operate and improve the Partypop service</li>
              <li>To send transactional emails (plan generation confirmation, account-related notices)</li>
              <li>We do NOT sell your data to vendors or third parties</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl mb-3" style={{ color: "var(--text-primary)" }}>Your Rights</h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Access, correct, or delete your account and party data at any time via Account Settings</li>
              <li>Request data export: email hello@partypopai.com</li>
              <li>EU/EEA users: rights under GDPR apply. Contact us at the email above.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl mb-3" style={{ color: "var(--text-primary)" }}>Cookies</h2>
            <p>Standard cookies for authentication and analytics. No third-party advertising cookies.</p>
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl mb-3" style={{ color: "var(--text-primary)" }}>Contact</h2>
            <p>hello@partypopai.com | Partypop by ChimeStream B.V., Netherlands</p>
          </div>
        </div>
      </section>
    </div>
  );
}
