import { T } from '../../lib/theme';

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${T.border}`, padding: "24px 32px", marginTop: 60 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <span style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 16, color: T.textM }}>
          Daily Number Picker
        </span>
        <span style={{ fontSize: 11, color: T.textD, textAlign: "right" }}>
          Data: NY Open Data (data.ny.gov) · Late = 1.5× expected · Very late = 2× expected ·{" "}
          <strong style={{ fontWeight: 500 }}>For entertainment purposes only. Please play responsibly.</strong>
        </span>
      </div>
    </footer>
  );
}
