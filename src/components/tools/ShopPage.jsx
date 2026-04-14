"use client";
import { useState } from "react";
import { T } from "../../lib/theme";

// ─── Product Data ────────────────────────────────────────────────────────────
// type:     "amazon" | "affiliate" | "printify" | "printful" | "own"
// category: "games" | "books" | "spinners" | "tools" | "apparel" | "printables"
// badge:    "Best Seller" | "New" | "Our Pick" | "Digital" | null
//
// ⚠️  UPDATE TITLES: Replace "Product Title Here" with actual Amazon product name
//     Everything else (link, category, type) is already correct.

const PRODUCTS = [
  // ── GAMES (2) ──────────────────────────────────────────────────────────────
  {
    id: "g01",
    type: "amazon",
    category: "games",
    title: "Product Title Here",
    subtitle: "Lottery game — update with actual product name",
    description: "A fun lottery-themed game perfect for Pick 3 and Win-4 enthusiasts. Great for game nights and lottery strategy practice.",
    price: null,
    link: "https://amzn.to/3OEexnl",
    badge: "Our Pick",
    emoji: "🎰",
  },
  {
    id: "g02",
    type: "amazon",
    category: "games",
    title: "Product Title Here",
    subtitle: "Lottery game — update with actual product name",
    description: "Engaging lottery-style game for players who want to practice number strategy in a fun format.",
    price: null,
    link: "https://amzn.to/4tGn0oY",
    badge: null,
    emoji: "🎲",
  },

  // ── BOOKS (3) ──────────────────────────────────────────────────────────────
  {
    id: "b01",
    type: "amazon",
    category: "books",
    title: "Product Title Here",
    subtitle: "Lottery book — update with actual product name",
    description: "In-depth guide for Pick 3 and Win-4 players. Covers strategy, number tracking, and proven methods for serious players.",
    price: null,
    link: "https://amzn.to/4szKNGf",
    badge: null,
    emoji: "📖",
  },
  {
    id: "b02",
    type: "amazon",
    category: "books",
    title: "Product Title Here",
    subtitle: "Lottery book — update with actual product name",
    description: "Essential reading for lottery players looking to move from guesswork to a structured, data-driven approach.",
    price: null,
    link: "https://amzn.to/4sydCCO",
    badge: "Best Seller",
    emoji: "📚",
  },
  {
    id: "b03",
    type: "amazon",
    category: "books",
    title: "Product Title Here",
    subtitle: "Lottery book — update with actual product name",
    description: "Strategy guide covering proven systems and methods for Pick 3 and Win-4 players at every level.",
    price: null,
    link: "https://amzn.to/4cHxhvk",
    badge: null,
    emoji: "📕",
  },

  // ── SPINNERS & WHEELS (5) ──────────────────────────────────────────────────
  {
    id: "s01",
    type: "amazon",
    category: "spinners",
    title: "Product Title Here",
    subtitle: "Number spinner — update with actual product name",
    description: "Physical number spinner for lottery players who prefer a tactile approach to random number selection. Compact and easy to use.",
    price: null,
    link: "https://amzn.to/4t4YAFK",
    badge: "Our Pick",
    emoji: "🎡",
  },
  {
    id: "s02",
    type: "amazon",
    category: "spinners",
    title: "Product Title Here",
    subtitle: "Number spinner — update with actual product name",
    description: "Spin to select your lottery digits. A fun and fair way to pick numbers for Pick 3, Win-4, and other lottery games.",
    price: null,
    link: "https://amzn.to/3PZws8B",
    badge: null,
    emoji: "🌀",
  },
  {
    id: "s03",
    type: "amazon",
    category: "spinners",
    title: "Product Title Here",
    subtitle: "Number spinner — update with actual product name",
    description: "Customizable spinning wheel for number selection. Dry-erase slots let you configure your own number ranges.",
    price: null,
    link: "https://amzn.to/3Q79YCy",
    badge: null,
    emoji: "🎯",
  },
  {
    id: "s04",
    type: "amazon",
    category: "spinners",
    title: "Product Title Here",
    subtitle: "Number spinner — update with actual product name",
    description: "Portable number selection wheel. Perfect for players who want a physical backup to their digital analysis.",
    price: null,
    link: "https://amzn.to/4cjhzW0",
    badge: null,
    emoji: "⭕",
  },
  {
    id: "s05",
    type: "amazon",
    category: "spinners",
    title: "Product Title Here",
    subtitle: "Number spinner — update with actual product name",
    description: "Heavy-duty spinning wheel with multiple slots. Ideal for household lottery game nights and number picking sessions.",
    price: null,
    link: "https://amzn.to/4t4Zylm",
    badge: null,
    emoji: "🎪",
  },

  // ── TOOLS (1) ──────────────────────────────────────────────────────────────
  {
    id: "t01",
    type: "amazon",
    category: "tools",
    title: "Product Title Here",
    subtitle: "Lottery tool — update with actual product name",
    description: "Practical tool for serious lottery players. Designed to complement your analysis workflow and number tracking system.",
    price: null,
    link: "https://amzn.to/4tazZPN",
    badge: "New",
    emoji: "🔧",
  },

  // ── POD PLACEHOLDER — uncomment when ready ─────────────────────────────────
  // { id:"pod01", type:"printify", category:"apparel",
  //   title:"Play With Purpose Tee", subtitle:"DailyNumberPicker original",
  //   description:"Show your strategy. Print on demand.", price:"$24.99",
  //   link:"/shop/pod01", badge:"New", emoji:"👕" },
];

const CATEGORIES = [
  { id: "all",       label: "All"              },
  { id: "games",     label: "Games"            },
  { id: "books",     label: "Books"            },
  { id: "spinners",  label: "Spinners & Wheels"},
  { id: "tools",     label: "Tools"            },
  { id: "apparel",   label: "Apparel"          },   // POD — future
  { id: "printables",label: "Printables"       },   // Own products — future
];

const BADGE_STYLES = {
  "Best Seller": { bg:"rgba(200,146,42,0.15)", color:T.goldL },
  "Our Pick":    { bg:"rgba(74,143,216,0.15)",  color:T.iceL  },
  "New":         { bg:"rgba(64,184,112,0.15)",  color:T.green },
  "Digital":     { bg:"rgba(200,146,42,0.1)",   color:T.textM },
};

const TYPE_LABEL = {
  amazon:   { text:"Amazon",           color:T.amber },
  affiliate:{ text:"Affiliate",        color:T.ice   },
  printify: { text:"Print on Demand",  color:T.green },
  printful: { text:"Print on Demand",  color:T.green },
  own:      { text:"DailyNumberPicker",color:T.gold  },
};

function ProductCard({ p }) {
  const tl = TYPE_LABEL[p.type] || TYPE_LABEL.affiliate;
  const bs = p.badge ? BADGE_STYLES[p.badge] : null;
  return (
    <div className="card-hover" style={{
      background:T.bg2, border:`1px solid ${T.border}`, borderRadius:12,
      overflow:"hidden", display:"flex", flexDirection:"column", transition:"all 0.2s",
    }}>
      {/* Image area */}
      <div style={{
        background:T.bg3, height:140, display:"flex",
        alignItems:"center", justifyContent:"center",
        position:"relative", borderBottom:`1px solid ${T.border}`,
      }}>
        <span style={{fontSize:56}}>{p.emoji}</span>
        {bs && (
          <span style={{position:"absolute",top:10,left:10,fontSize:10,fontWeight:700,
            padding:"3px 8px",background:bs.bg,color:bs.color,borderRadius:20,letterSpacing:"0.06em"}}>
            {p.badge}
          </span>
        )}
        <span style={{position:"absolute",top:10,right:10,fontSize:9,fontWeight:600,
          padding:"2px 7px",background:`${tl.color}22`,color:tl.color,borderRadius:20}}>
          {tl.text}
        </span>
      </div>
      {/* Content */}
      <div style={{padding:"14px 16px",flex:1,display:"flex",flexDirection:"column"}}>
        <p style={{fontSize:14,fontWeight:600,color:T.text,margin:"0 0 4px",lineHeight:1.3}}>{p.title}</p>
        <p style={{fontSize:11,color:T.gold,margin:"0 0 8px",fontWeight:500}}>{p.subtitle}</p>
        <p style={{fontSize:12,color:T.textM,margin:"0 0 16px",lineHeight:1.6,flex:1}}>{p.description}</p>
        {p.price && (
          <p style={{fontSize:16,fontWeight:700,color:T.goldL,margin:"0 0 12px",fontFamily:"'IBM Plex Mono',monospace"}}>
            {p.price}
          </p>
        )}
        <a href={p.link} target="_blank" rel="noopener noreferrer sponsored"
          className="oracle-btn"
          style={{display:"block",textAlign:"center",padding:"9px 16px",
            background:`linear-gradient(135deg,${T.gold},${T.goldL})`,
            color:"#0a0a10",borderRadius:8,fontSize:13,fontWeight:600,
            textDecoration:"none",transition:"all 0.15s"}}>
          {p.type==="amazon" ? "View on Amazon →" :
           p.type==="own" ? "Get it →" :
           (p.type==="printify"||p.type==="printful") ? "Order Now →" : "View Product →"}
        </a>
        {p.type==="amazon" && (
          <p style={{fontSize:9,color:T.textD,textAlign:"center",margin:"6px 0 0"}}>
            As an Amazon Associate we earn from qualifying purchases
          </p>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [cat,  setCat]  = useState("all");
  const [q,    setQ]    = useState("");

  const activeCats = CATEGORIES.filter(c =>
    c.id==="all" || PRODUCTS.some(p=>p.category===c.id)
  );

  const filtered = PRODUCTS.filter(p => {
    const matchCat  = cat==="all" || p.category===cat;
    const matchQ    = !q || p.title.toLowerCase().includes(q.toLowerCase()) ||
                      p.description.toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"40px 32px 80px"}}>

      {/* Header */}
      <div style={{marginBottom:32}}>
        <h1 style={{fontFamily:"'DM Serif Display',Georgia,serif",fontSize:36,
          color:T.text,margin:"0 0 8px",fontWeight:400}}>
          Player Resources
        </h1>
        <p style={{fontSize:14,color:T.textM,margin:0}}>
          Games, books, spinners, and tools curated for Pick 3 and Win-4 players
        </p>
      </div>

      {/* Search + filters */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:28}}>
        <input type="text" placeholder="Search products..." value={q}
          onChange={e=>setQ(e.target.value)}
          style={{padding:"8px 14px",fontSize:13,background:T.bg2,
            border:`1px solid ${T.border}`,borderRadius:8,color:T.text,
            outline:"none",width:220}} />
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {activeCats.map(({id,label})=>(
            <button key={id} onClick={()=>setCat(id)} style={{
              padding:"6px 14px",fontSize:12,fontWeight:cat===id?600:400,
              background:cat===id?`rgba(200,146,42,0.15)`:T.bg2,
              border:`1px solid ${cat===id?T.gold:T.border}`,
              borderRadius:20,color:cat===id?T.goldL:T.textM,
              cursor:"pointer",transition:"all 0.15s"}}>
              {label}
            </button>
          ))}
        </div>
        <span style={{fontSize:12,color:T.textD,marginLeft:"auto"}}>
          {filtered.length} product{filtered.length!==1?"s":""}
        </span>
      </div>

      {/* Grid */}
      {filtered.length>0 ? (
        <div style={{display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16}}>
          {filtered.map(p=><ProductCard key={p.id} p={p}/>)}
        </div>
      ) : (
        <div style={{padding:48,textAlign:"center",
          border:`1px dashed ${T.border}`,borderRadius:12,
          color:T.textD,fontSize:14}}>
          No products found. Try a different search or category.
        </div>
      )}

      {/* Coming soon — POD */}
      <div style={{marginTop:48,padding:"28px 32px",background:T.bg2,
        border:`1px solid ${T.borderG}`,borderRadius:12,textAlign:"center"}}>
        <p style={{fontFamily:"'DM Serif Display',Georgia,serif",fontSize:22,
          color:T.text,margin:"0 0 8px",fontWeight:400}}>
          DailyNumberPicker Gear — Coming Soon
        </p>
        <p style={{fontSize:13,color:T.textM,margin:"0 0 16px"}}>
          Custom Pick 3 &amp; Win-4 apparel, printable play slips, and strategy tools — print on demand, shipped to your door.
        </p>
        <span style={{fontSize:11,padding:"5px 14px",background:T.goldD,
          border:`1px solid ${T.borderG}`,borderRadius:20,
          color:T.gold,fontWeight:600}}>COMING SOON</span>
      </div>

      {/* Disclaimer */}
      <p style={{fontSize:11,color:T.textD,marginTop:32,textAlign:"center",lineHeight:1.6}}>
        DailyNumberPicker.com is a participant in the Amazon Services LLC Associates Program,
        an affiliate advertising program designed to provide a means for sites to earn
        advertising fees by advertising and linking to Amazon.com. Amazon and the Amazon logo
        are trademarks of Amazon.com, Inc. or its affiliates.
      </p>
    </div>
  );
}
