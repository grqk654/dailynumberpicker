import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"));
  return files
    .map(filename => {
      const slug = filename.replace(".md", "");
      const raw  = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);
      return { slug, ...data, readingTime: stats.text, content };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const filepath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return { slug, ...data, readingTime: stats.text, content };
}
