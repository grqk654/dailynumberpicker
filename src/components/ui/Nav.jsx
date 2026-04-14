"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { T } from '../../lib/theme';

const LINKS = [
  { href: "/",          label: "Home"      },
  { href: "/pick3",     label: "Pick 3"    },
  { href: "/win4",      label: "Win-4"     },
  { href: "/wheeling",  label: "Wheeling"  },
  { href: "/print",     label: "Print"     },
  { href: "/blog",      label: "Blog"      },
  { href: "/faq",       label: "FAQ"       },
  { href: "/shop",      label: "Shop"      },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav style={{
      borderBottom: `1px solid ${T.border}`,
      background: `${T.bg0}ee`,
      backdropFilter: "blur(12px)",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 32px",
        display: "flex", alignItems: "center", gap: 8, height: 60,
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0, marginRight: 16 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: `linear-gradient(135deg,${T.gold},${T.goldL})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 700, color: "#0a0a10",
            fontFamily: "'IBM Plex Mono',monospace",
            boxShadow: `0 0 20px rgba(200,146,42,0.4)`,
          }}>7</div>
          <span style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 18, color: T.text, fontWeight: 400 }}>
            Daily Number Picker
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 2, flex: 1, flexWrap: "wrap" }}>
          {LINKS.map(({ href, label }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} className="nav-link" style={{
                padding: "6px 14px", fontSize: 13,
                fontWeight: active ? 600 : 400,
                color: active ? T.goldL : T.textM,
                textDecoration: "none",
                borderBottom: active ? `2px solid ${T.gold}` : "2px solid transparent",
                transition: "all 0.15s",
              }}>{label}</Link>
            );
          })}
        </div>

        {/* Badge */}
        <div style={{
          flexShrink: 0, fontSize: 10, padding: "4px 10px",
          background: T.goldD, border: `1px solid ${T.borderG}`,
          borderRadius: 20, color: T.gold, fontWeight: 700, letterSpacing: "0.08em",
        }}>NY LOTTERY DATA</div>
      </div>
    </nav>
  );
}
