import Link from "next/link";
import { getAllPosts } from '../../lib/blog';
import { T } from '../../lib/theme';

export const metadata = {
  title: "Pick 3 & Win-4 Strategy Guides",
  description: "Free guides on NY Pick 3 and Win-4 strategy — skip tracking, hot numbers, wheeling systems, sum analysis, and more.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 32px" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 36, color: T.text, margin: "0 0 8px", fontWeight: 400 }}>
          Strategy Guides
        </h1>
        <p style={{ fontSize: 14, color: T.textM, margin: 0 }}>
          Pick 3 and Win-4 analysis, strategy, and system guides — updated regularly.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
            <div className="card-hover" style={{
              background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 12,
              padding: "20px 24px", transition: "all 0.2s", marginBottom: 10,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                <div>
                  {post.category && (
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: T.gold, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                      {post.category}
                    </span>
                  )}
                  <h2 style={{ fontSize: 18, fontWeight: 600, color: T.text, margin: "0 0 8px", lineHeight: 1.3 }}>{post.title}</h2>
                  {post.description && (
                    <p style={{ fontSize: 13, color: T.textM, margin: 0, lineHeight: 1.6 }}>{post.description}</p>
                  )}
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <p style={{ fontSize: 11, color: T.textD, margin: "0 0 4px" }}>
                    {post.date ? new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                  </p>
                  <p style={{ fontSize: 11, color: T.textD, margin: 0 }}>{post.readingTime}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", border: `1px dashed ${T.border}`, borderRadius: 12, color: T.textD }}>
            Articles coming soon.
          </div>
        )}
      </div>
    </div>
  );
}
