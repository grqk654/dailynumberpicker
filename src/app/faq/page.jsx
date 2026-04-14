import Link from "next/link";
import { FAQ_ITEMS, FAQ_CATEGORIES, getFaqsByCategory } from "../../lib/faq";
import { T } from "../../lib/theme";

export const metadata = {
  title: "Pick 3 & Win-4 FAQ — Every Question Answered",
  description: "Complete FAQ for NY Pick 3 and Win-4. Rules, payouts, odds, bet types, strategy, wheeling systems, and how to use DailyNumberPicker.com.",
  keywords: ["pick 3 FAQ", "win 4 FAQ", "NY daily numbers FAQ", "pick 3 questions answered"],
};

export default function FaqIndex() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 32px 80px" }}>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 38,
          color: T.text, margin: "0 0 10px", fontWeight: 400 }}>
          Pick 3 & Win-4 FAQ
        </h1>
        <p style={{ fontSize: 15, color: T.textM, margin: 0, lineHeight: 1.7 }}>
          {FAQ_ITEMS.length} questions answered. Click any question for the full answer on its own page.
        </p>
      </div>

      {FAQ_CATEGORIES.map(cat => {
        const items = getFaqsByCategory(cat);
        if (!items.length) return null;
        return (
          <div key={cat} style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 24,
              color: T.text, margin: "0 0 16px", fontWeight: 400,
              paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>
              {cat}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {items.map(({ slug, question }) => (
                <Link key={slug} href={`/faq/${slug}`} className="card-hover" style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 18px", background: T.bg2,
                  border: `1px solid ${T.border}`, borderRadius: 10,
                  textDecoration: "none", transition: "all 0.15s",
                }}>
                  <span style={{ fontSize: 14, color: T.text, lineHeight: 1.4 }}>{question}</span>
                  <span style={{ color: T.gold, fontSize: 16, flexShrink: 0, marginLeft: 12 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      <div style={{ padding: "24px 28px", background: T.bg3,
        border: `1px solid ${T.borderG}`, borderRadius: 12, textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Serif Display',Georgia,serif",
          fontSize: 20, color: T.text, margin: "0 0 8px", fontWeight: 400 }}>
          Ready to put this into practice?
        </p>
        <p style={{ fontSize: 13, color: T.textM, margin: "0 0 18px" }}>
          Run today's analysis — free, no signup required.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pick3" style={{ padding: "10px 24px", fontSize: 14, fontWeight: 600,
            background: `linear-gradient(135deg,${T.gold},${T.goldL})`,
            color: "#0a0a10", borderRadius: 8, textDecoration: "none" }}>
            Pick 3 analysis →
          </Link>
          <Link href="/win4" style={{ padding: "10px 24px", fontSize: 14, fontWeight: 600,
            background: "transparent", color: T.text,
            border: `1px solid ${T.border}`, borderRadius: 8, textDecoration: "none" }}>
            Win-4 analysis
          </Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map(({ question, answer }) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": { "@type": "Answer",
            "text": Array.isArray(answer) ? answer.join(" ") : answer },
        })),
      })}} />

      <p style={{ fontSize: 11, color: T.textD, marginTop: 32, textAlign: "center" }}>
        For entertainment purposes only. Please play responsibly.
      </p>
    </div>
  );
}
