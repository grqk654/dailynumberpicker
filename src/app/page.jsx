"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { T } from '../lib/theme';
import { Ball } from '../components/ui';

const FEATURES = [
  { href: "/pick3",    icon: "3", title: "Pick 3 Engine",      desc: "9 angles · skip tracking · hot/cold · position analysis" },
  { href: "/win4",     icon: "4", title: "Win-4 Engine",        desc: "Same power for Win-4 · 24-way box · pair affinity" },
  { href: "/wheeling", icon: "⊞", title: "Wheeling System",     desc: "Master digit wheels · straight · box · combo" },
  { href: "/print",    icon: "⎙", title: "Print Your Plays",    desc: "Bet slips · play lists · summary cards" },
  { href: "/blog",     icon: "✦", title: "Strategy Guides",     desc: "Skip tracking · sum analysis · position bias explained" },
];

export default function HomePage() {
  const [ticker, setTicker] = useState(() => Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)));

  useEffect(() => {
    const t = setInterval(() => setTicker(Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))), 1800);
    return () => clearInterval(t);
  }, []);

  const grid = { position: "absolute", inset: 0, backgroundImage: `linear-gradient(${T.border} 1px,transparent 1px),linear-gradient(90deg,${T.border} 1px,transparent 1px)`, backgroundSize: "40px 40px", opacity: 0.5 };

  return (
    <div>
      {/* Hero */}
      <div style={{ position: "relative", overflow: "hidden", padding: "80px 40px 100px", textAlign: "center", minHeight: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={grid} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% 0%,rgba(200,146,42,0.07),transparent)` }} />

        {/* Animated balls */}
        <div style={{ display: "flex", gap: 10, marginBottom: 48, position: "relative" }}>
          {ticker.map((d, i) => <Ball key={`${i}-${d}`} digit={d} size={52} gold={i < 2} delay={i * 60} animate />)}
        </div>

        <h1 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 56, fontWeight: 400, color: T.text, margin: "0 0 16px", lineHeight: 1.1, position: "relative" }}>
          Daily Number Picker
          <span style={{ display: "block", fontSize: 20, color: T.gold, fontFamily: "'IBM Plex Mono',monospace", marginTop: 10, letterSpacing: 4 }}>NY LOTTERY ANALYSIS ENGINE</span>
        </h1>

        <p style={{ fontSize: 16, color: T.textM, maxWidth: 540, margin: "0 0 40px", lineHeight: 1.7, position: "relative" }}>
          45 years of NY draw history. 9 analysis angles. Wheeling systems built for serious Pick 3 and Win-4 players.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 48, position: "relative" }}>
          {["9 analysis angles", "Live NY data", "Master digit wheeling", "Position-based engine", "Print-ready plays"].map(f => (
            <span key={f} style={{ fontSize: 12, padding: "6px 14px", background: T.bg2, border: `1px solid ${T.borderG}`, borderRadius: 20, color: T.goldL, fontWeight: 500 }}>{f}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", position: "relative" }}>
          <Link href="/pick3" style={{ padding: "12px 30px", fontSize: 15, fontWeight: 600, background: `linear-gradient(135deg,${T.gold},${T.goldL})`, color: "#0a0a10", borderRadius: 8, textDecoration: "none" }}>
            Run Pick 3 analysis →
          </Link>
          <Link href="/win4" style={{ padding: "12px 30px", fontSize: 15, fontWeight: 600, background: "transparent", color: T.text, border: `1px solid ${T.border}`, borderRadius: 8, textDecoration: "none" }}>
            Run Win-4 analysis
          </Link>
        </div>
      </div>

      {/* Intro copy — SEO */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px 60px", textAlign: "center" }}>
        <p style={{ fontSize: 15, color: T.textM, lineHeight: 1.8, marginBottom: 16 }}>
          NY Pick 3 and Win-4 draw twice a day, every day — 730 draws a year. Most players pick blind.
          Daily Number Picker analyzes every draw going back to 1980 so you can pick with purpose.
        </p>
        <p style={{ fontSize: 15, color: T.textM, lineHeight: 1.8 }}>
          Our scoring engine runs 9 independent analysis angles on every digit in every position — skip tracking,
          hot/cold frequency, position bias, pair affinity, sum analysis, and more — then blends them into
          a single ranked recommendation for today's draw. Free to use. No signup. Updated as soon as NY publishes each draw.
        </p>
      </div>

      {/* Feature cards */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
          {FEATURES.map(({ href, icon, title, desc }) => (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <div className="card-hover" style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 12, padding: "20px", height: "100%", transition: "all 0.2s" }}>
                <div style={{ fontSize: 24, marginBottom: 10, fontFamily: "'IBM Plex Mono',monospace", color: T.gold }}>{icon}</div>
                <p style={{ fontSize: 14, fontWeight: 600, color: T.text, margin: "0 0 6px" }}>{title}</p>
                <p style={{ fontSize: 12, color: T.textM, margin: 0, lineHeight: 1.6 }}>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}

const FAQS = [
  { q: "What pick 3 number comes in the most?", a: "There's no single number that permanently dominates — frequency patterns change over time and vary by position. Digit 7 in position 1 behaves differently from digit 7 in position 3. The Pick 3 engine tracks frequency per position across your chosen window and updates after every draw." },
  { q: "Can AI predict pick 3 numbers?", a: "No system can predict truly random lottery draws. What analysis tools can do is surface statistical patterns in recent draw history — skip tracking, hot/cold frequency, sum distribution, and more. DailyNumberPicker.com runs 9 analysis angles on official NY data. That's analysis, not prediction." },
  { q: "Is it better to use quick pick or pick your own numbers?", a: "The odds are identical — each draw is random regardless of selection method. Quick pick is pure random. Analysis-based picking is structured and data-informed. Neither changes the fundamental odds, but analysis gives you a reasoned basis for your selections." },
  { q: "What does straight box mean in Pick 3?", a: "Straight/Box is a combination bet. You win the straight prize ($290 on $1) if your digits match in exact order, or the box prize ($40 on $1) if they match in any order. It's effectively insurance on a straight play." },
  { q: "What is a wheeling system?", a: "A wheeling system generates every possible arrangement of your selected digits so you cover multiple combinations systematically. Our master digit wheel uses two anchor digits and up to six secondaries, producing up to 36 straight plays with a guaranteed hit if both anchors plus any secondary appear in the draw." },
  { q: "How much do you win on NY Win-4 box?", a: "A 24-way box (all distinct digits) pays $200 on a $1 play. A 12-way box (one repeated digit) pays $400. A 6-way box (two pairs) pays $800. A 4-way box (one triple) pays $1,200." },
  { q: "What are the odds of winning Pick 3?", a: "Straight: 1 in 1,000. Box (6-way, all distinct digits): 1 in 167. Box (3-way, one repeated digit): 1 in 333. Win-4 straight: 1 in 10,000. Win-4 24-way box: 1 in 417." },
  { q: "Where does DailyNumberPicker.com get its data?", a: "We pull draw history directly from the official NY Open Data portal (data.ny.gov) — a government-run public API that has published NY lottery results since 1980. No scraping. Updated automatically after every draw." },
  { q: "What is skip tracking?", a: "Skip tracking measures how many draws have passed since a digit last appeared in a specific position. The expected interval is one appearance every 10 draws. A digit absent for 15+ draws (1.5× expected) is flagged late. A digit absent for 20+ draws (2× expected) is flagged very late." },
  { q: "Is DailyNumberPicker.com free?", a: "Yes — completely free. No signup, no subscription, no account required. All tools including the scoring engine, wheeling system, and print module are free to use." },
];

function FaqSection() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px 80px" }}>
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 32, color: T.text, fontWeight: 400, margin: "0 0 8px" }}>
          Frequently Asked Questions
        </h2>
        <p style={{ fontSize: 14, color: T.textM, margin: 0 }}>
          Quick answers to the most common Pick 3 and Win-4 questions
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {FAQS.map(({ q, a }, i) => (
          <div key={i}
            style={{ background: T.bg2, border: `1px solid ${open === i ? T.borderG : T.border}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: T.text, lineHeight: 1.4 }}>{q}</span>
              <span style={{ color: T.gold, fontSize: 18, flexShrink: 0, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 20px 16px", fontSize: 14, color: T.textM, lineHeight: 1.7, borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
                {a}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Link href="/faq" style={{ fontSize: 13, color: T.goldL, textDecoration: "none" }}>
          See the full FAQ guide →
        </Link>
      </div>

      {/* JSON-LD FAQ Schema for rich snippets */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(({ q, a }) => ({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": { "@type": "Answer", "text": a }
        }))
      })}} />
    </div>
  );
}
