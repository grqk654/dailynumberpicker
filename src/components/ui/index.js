"use client";
import { T } from '../../lib/theme';

export function Btn({ children, onClick, variant = "primary", small, style = {}, disabled }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 6, cursor: disabled ? "not-allowed" : "pointer", border: "none", borderRadius: 8, fontWeight: 600, transition: "all 0.15s", opacity: disabled ? 0.6 : 1 };
  const v = {
    primary: { background: `linear-gradient(135deg,${T.gold},${T.goldL})`, color: "#0a0a10", padding: small ? "6px 14px" : "10px 22px", fontSize: small ? 12 : 14 },
    ghost:   { background: "transparent", color: T.textM, border: `1px solid ${T.border}`, padding: small ? "6px 14px" : "10px 22px", fontSize: small ? 12 : 14 },
    ice:     { background: T.iceD, color: T.iceL, border: `1px solid ${T.iceD}`, padding: small ? "6px 14px" : "10px 22px", fontSize: small ? 12 : 14 },
  };
  return <button onClick={onClick} disabled={disabled} className="oracle-btn" style={{ ...base, ...v[variant], ...style }}>{children}</button>;
}

export function Card({ children, style = {}, gold, glow }) {
  return (
    <div style={{ background: T.bg2, border: `1px solid ${gold ? T.borderG : T.border}`, borderRadius: 12, padding: "16px 20px", boxShadow: glow ? `0 0 30px rgba(200,146,42,0.08)` : undefined, transition: "all 0.2s", ...style }} className="card-hover">
      {children}
    </div>
  );
}

export function Label({ children, style = {} }) {
  return <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: T.textM, margin: "0 0 8px", textTransform: "uppercase", ...style }}>{children}</p>;
}

export function Toggle({ value, onChange, options, small }) {
  return (
    <div style={{ display: "flex", background: T.bg0, borderRadius: 8, padding: 3, gap: 2, flexWrap: "wrap" }}>
      {options.map(([id, label]) => (
        <button key={id} onClick={() => onChange(id)} style={{
          padding: small ? "4px 10px" : "6px 14px", fontSize: small ? 12 : 13,
          fontWeight: value === id ? 600 : 400,
          background: value === id ? T.bg3 : "transparent",
          border: value === id ? `1px solid ${T.borderG}` : "1px solid transparent",
          borderRadius: 6, color: value === id ? T.goldL : T.textM,
          cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
        }}>{label}</button>
      ))}
    </div>
  );
}

export function Ball({ digit, size = 44, gold, late, veryLate, delay = 0, animate }) {
  const bg  = veryLate ? T.red : late ? T.amber : gold ? `linear-gradient(135deg,${T.gold},${T.goldL})` : `linear-gradient(145deg,${T.bg3},${T.bg2})`;
  const col = veryLate || late ? "white" : gold ? "#0a0a10" : T.text;
  return (
    <div className={animate ? "ball-drop" : ""} style={{
      animationDelay: `${delay}ms`, width: size, height: size, borderRadius: "50%",
      background: bg, border: `2px solid ${veryLate ? T.red : late ? T.amber : gold ? T.gold : T.border}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, fontWeight: 700, color: col,
      fontFamily: "'IBM Plex Mono',monospace", flexShrink: 0,
      boxShadow: gold ? `0 4px 20px rgba(200,146,42,0.3)` : late || veryLate ? `0 4px 16px rgba(212,64,64,0.25)` : undefined,
    }}>{digit}</div>
  );
}

export function ScoreBar({ score, color = T.gold, delay = 0 }) {
  const pct = Math.round(score * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: T.bg3, borderRadius: 3, overflow: "hidden" }}>
        <div className="bar-fill" style={{ "--w": `${pct}%`, height: "100%", background: color, borderRadius: 3, animationDelay: `${delay}ms`, width: 0 }} />
      </div>
      <span style={{ fontSize: 11, color: T.textM, minWidth: 28, textAlign: "right", fontFamily: "'IBM Plex Mono',monospace" }}>{pct}</span>
    </div>
  );
}

export function StatCard({ label, value, sub }) {
  return (
    <div style={{ background: T.bg3, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px" }}>
      <p style={{ fontSize: 10, color: T.textM, margin: "0 0 4px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 700, margin: 0, color: T.goldL, fontFamily: "'IBM Plex Mono',monospace" }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: T.textM, margin: "2px 0 0" }}>{sub}</p>}
    </div>
  );
}
