import { notFound } from "next/navigation";
import Link from "next/link";
import { FAQ_ITEMS, getFaqBySlug } from "../../../lib/faq";
import { T } from "../../../lib/theme";

export async function generateStaticParams() {
  return FAQ_ITEMS.map(f => ({ slug: f.slug }));
}

export async function generateMetadata({ params }) {
  const faq = getFaqBySlug(params.slug);
  if (!faq) return {};
  return {
    title: faq.question,
    description: faq.metaDescription,
    openGraph: { title: faq.question, description: faq.metaDescription },
  };
}

function renderTable(text) {
  const rows = text.trim().split("\n").filter(r => r.trim());
  const headers = rows[0].split("|").map(c => c.trim()).filter(Boolean);
  const body = rows.slice(2).map(r => r.split("|").map(c => c.trim()).filter(Boolean));
  return (
    <div style={{ overflowX: "auto", margin: "4px 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr>{headers.map((h, i) => (
            <th key={i} style={{ padding: "10px 12px", background: T.bg3,
              color: T.text, fontWeight: 600, textAlign: "left",
              border: `1px solid ${T.border}` }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri}>{row.map((cell, ci) => (
              <td key={ci} style={{ padding: "10px 12px",
                border: `1px solid ${T.border}`, color: T.textM }}>{cell}</td>
            ))}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FaqQuestion({ params }) {
  const faq = getFaqBySlug(params.slug);
  if (!faq) notFound();
  const related = (faq.related || []).map(s => getFaqBySlug(s)).filter(Boolean);
  const paragraphs = Array.isArray(faq.answer) ? faq.answer : [faq.answer];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 32px 80px" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 8, fontSize: 13,
        color: T.textM, marginBottom: 32 }}>
        <Link href="/faq" style={{ color: T.textM, textDecoration: "none" }}>FAQ</Link>
        <span>/</span>
        <span style={{ color: T.gold }}>{faq.category}</span>
      </div>

      {/* Question H1 */}
      <h1 style={{ fontFamily: "'DM Serif Display',Georgia,serif",
        fontSize: 34, color: T.text, margin: "0 0 32px",
        fontWeight: 400, lineHeight: 1.25 }}>
        {faq.question}
      </h1>

      {/* Answer */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
        {paragraphs.map((para, i) =>
          para.includes("|---|")
            ? <div key={i}>{renderTable(para)}</div>
            : <p key={i} style={{ fontSize: 16, color: T.textM,
                lineHeight: 1.8, margin: 0 }}>{para}</p>
        )}
      </div>

      {/* Related questions */}
      {related.length > 0 && (
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif",
            fontSize: 22, color: T.text, margin: "0 0 16px", fontWeight: 400,
            paddingBottom: 10, borderBottom: `1px solid ${T.border}` }}>
            Related questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {related.map(rf => (
              <Link key={rf.slug} href={`/faq/${rf.slug}`} className="card-hover"
                style={{ display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "13px 16px",
                  background: T.bg2, border: `1px solid ${T.border}`,
                  borderRadius: 10, textDecoration: "none", transition: "all 0.15s" }}>
                <span style={{ fontSize: 14, color: T.text }}>{rf.question}</span>
                <span style={{ color: T.gold, flexShrink: 0, marginLeft: 12 }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Nav */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap",
        alignItems: "center", marginBottom: 32 }}>
        <Link href="/faq" style={{ fontSize: 13, color: T.textM,
          textDecoration: "none" }}>← All questions</Link>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Link href="/pick3" style={{ padding: "8px 18px", fontSize: 13, fontWeight: 600,
            background: `linear-gradient(135deg,${T.gold},${T.goldL})`,
            color: "#0a0a10", borderRadius: 8, textDecoration: "none" }}>
            Pick 3 analysis →
          </Link>
          <Link href="/win4" style={{ padding: "8px 18px", fontSize: 13, fontWeight: 600,
            background: "transparent", color: T.text, border: `1px solid ${T.border}`,
            borderRadius: 8, textDecoration: "none" }}>
            Win-4 analysis
          </Link>
        </div>
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [{ "@type": "Question", "name": faq.question,
          "acceptedAnswer": { "@type": "Answer",
            "text": Array.isArray(faq.answer) ? faq.answer.join(" ") : faq.answer } }],
      })}} />

      <p style={{ fontSize: 11, color: T.textD, textAlign: "center" }}>
        For entertainment purposes only. Please play responsibly.
      </p>
    </div>
  );
}
