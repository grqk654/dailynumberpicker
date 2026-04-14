import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from '../../../lib/blog';
import { T } from '../../../lib/theme';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description || post.title,
    keywords: post.keywords || [],
    openGraph: { title: post.title, description: post.description },
  };
}

export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 32px" }}>
      {/* Back */}
      <Link href="/blog" style={{ fontSize: 13, color: T.textM, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
        ← All guides
      </Link>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        {post.category && (
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: T.gold, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
            {post.category}
          </span>
        )}
        <h1 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 38, color: T.text, margin: "0 0 16px", fontWeight: 400, lineHeight: 1.2 }}>
          {post.title}
        </h1>
        <div style={{ display: "flex", gap: 16, fontSize: 12, color: T.textD }}>
          {post.date && <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>}
          <span>{post.readingTime}</span>
        </div>
      </div>

      {/* Article body */}
      <div style={{
        fontSize: 16, lineHeight: 1.8, color: T.textM,
        "--heading-color": T.text,
        "--link-color": T.goldL,
        "--border-color": T.border,
        "--code-bg": T.bg3,
      }} className="article-body">
        <style>{`
          .article-body h2 { font-family:'DM Serif Display',Georgia,serif; font-size:26px; font-weight:400; color:${T.text}; margin:48px 0 16px; }
          .article-body h3 { font-size:18px; font-weight:600; color:${T.text}; margin:32px 0 12px; }
          .article-body p  { margin-bottom:20px; }
          .article-body a  { color:${T.goldL}; }
          .article-body ul, .article-body ol { padding-left:24px; margin-bottom:20px; }
          .article-body li { margin-bottom:8px; }
          .article-body hr { border:none; border-top:1px solid ${T.border}; margin:40px 0; }
          .article-body strong { color:${T.text}; font-weight:600; }
          .article-body table { width:100%; border-collapse:collapse; margin-bottom:24px; font-size:14px; }
          .article-body th { padding:10px 12px; background:${T.bg3}; color:${T.text}; font-weight:600; text-align:left; border:1px solid ${T.border}; }
          .article-body td { padding:10px 12px; border:1px solid ${T.border}; color:${T.textM}; }
          .article-body code { background:${T.bg3}; padding:2px 6px; border-radius:4px; font-family:'IBM Plex Mono',monospace; font-size:13px; color:${T.goldL}; }
          .article-body blockquote { border-left:3px solid ${T.gold}; padding-left:20px; margin:24px 0; color:${T.textM}; font-style:italic; }
        `}</style>
        <MDXRemote source={post.content} />
      </div>

      {/* CTA */}
      <div style={{ marginTop: 48, padding: "24px", background: T.bg3, border: `1px solid ${T.borderG}`, borderRadius: 12, textAlign: "center" }}>
        <p style={{ fontSize: 16, color: T.text, margin: "0 0 16px", fontFamily: "'DM Serif Display',Georgia,serif" }}>
          Ready to pick today's numbers?
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pick3" style={{ padding: "10px 24px", fontSize: 14, fontWeight: 600, background: `linear-gradient(135deg,${T.gold},${T.goldL})`, color: "#0a0a10", borderRadius: 8, textDecoration: "none" }}>
            Pick 3 analysis →
          </Link>
          <Link href="/win4" style={{ padding: "10px 24px", fontSize: 14, fontWeight: 600, background: "transparent", color: T.text, border: `1px solid ${T.border}`, borderRadius: 8, textDecoration: "none" }}>
            Win-4 analysis
          </Link>
        </div>
        <p style={{ fontSize: 11, color: T.textD, margin: "16px 0 0" }}>For entertainment purposes only. Please play responsibly.</p>
      </div>
    </div>
  );
}
