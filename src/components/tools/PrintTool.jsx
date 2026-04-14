"use client";
import { useState } from "react";
import { T } from '../../lib/theme';
import { Btn } from '../../components/ui';

const SAMPLE = [["1","2","3"],["4","5","6"],["7","8","9"],["0","1","2"],["3","4","5"],["6","7","8"]];
const META   = { game:"pick3", date: new Date().toLocaleDateString(), drawTime:"Both", window:30, preset:"Balanced" };

const LAYOUTS = [
  { id:"list",    title:"Formatted play list",      desc:"3-column number grid · large monospace digits · easy to read at terminal counter" },
  { id:"slip",    title:"Bet slip layout",           desc:"One card per combination · bubble grids for each digit position · hand to clerk" },
  { id:"summary", title:"Printable summary card",   desc:"Full report · top picks · all plays · cost breakdown · result tracking checkbox" },
];

function PlayList({ combos, meta }) {
  return (
    <div style={{fontFamily:"'Courier New',monospace",color:"#111"}}>
      <div style={{borderBottom:"2px solid #111",paddingBottom:10,marginBottom:14,fontSize:16,fontWeight:700}}>
        {meta.game==="pick3"?"PICK 3 / DAILY NUMBERS":"WIN 4"} · {meta.date} · {meta.drawTime} · Strategy: {meta.preset}
      </div>
      <div style={{columns:3,columnGap:20}}>
        {combos.map((c,i)=><div key={i} style={{marginBottom:6,fontSize:20,fontWeight:700,letterSpacing:8,breakInside:"avoid"}}>{i+1}. {c.join(" ")}</div>)}
      </div>
      <div style={{borderTop:"2px solid #111",paddingTop:10,marginTop:14,fontSize:12,display:"flex",justifyContent:"space-between"}}>
        <span>Total: {combos.length} plays</span><span>Straight: ${combos.length}.00</span><span>Box: ${combos.length}.00</span><span>dailynumberpicker.com</span>
      </div>
    </div>
  );
}

function BetSlips({ combos, meta }) {
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
      {combos.map((combo,i)=>(
        <div key={i} style={{border:"2px solid #333",borderRadius:6,padding:"10px 12px",width:230,background:"white"}}>
          <div style={{fontFamily:"Arial",fontSize:11,fontWeight:700,borderBottom:"1px solid #ccc",paddingBottom:6,marginBottom:8,display:"flex",justifyContent:"space-between"}}>
            <span>{meta.game==="pick3"?"PICK 3 / DAILY NUMBERS":"WIN 4"}</span><span>#{i+1}</span>
          </div>
          {combo.map((digit,pi)=>(
            <div key={pi} style={{display:"flex",gap:3,marginBottom:5,alignItems:"center"}}>
              <span style={{fontSize:9,width:18,textAlign:"right",fontFamily:"Arial",color:"#555"}}>{pi+1}</span>
              {Array.from({length:10},(_,d)=>(
                <div key={d} style={{width:18,height:18,borderRadius:"50%",border:"1.5px solid #333",
                  background:d===Number(digit)?"#111":"white",display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:8,fontWeight:700,color:d===Number(digit)?"white":"#333",fontFamily:"Arial"}}>{d}</div>
              ))}
            </div>
          ))}
          <div style={{borderTop:"1px solid #ccc",paddingTop:5,marginTop:5,display:"flex",justifyContent:"space-between",fontFamily:"Arial",fontSize:10}}>
            <span>Straight: {combo.join("")}</span>
            <div style={{display:"flex",gap:5}}>
              {["Str","Box","Combo"].map(t=><span key={t} style={{display:"flex",alignItems:"center",gap:2}}><span style={{width:10,height:10,border:"1px solid #333",display:"inline-block",borderRadius:2}}/>{t}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SummaryCard({ combos, meta }) {
  return (
    <div style={{fontFamily:"Arial",color:"#111",maxWidth:620}}>
      <div style={{border:"2px solid #111",borderRadius:6,padding:"14px 16px",marginBottom:14}}>
        <div style={{fontSize:18,fontWeight:700,marginBottom:8}}>{meta.game==="pick3"?"PICK 3":"WIN 4"} — PLAY SUMMARY</div>
        <div style={{display:"flex",gap:16,fontSize:12,color:"#555",flexWrap:"wrap"}}>
          <span>Date: {meta.date}</span><span>Draw: {meta.drawTime}</span><span>Strategy: {meta.preset}</span><span>Window: {meta.window} draws</span>
        </div>
      </div>
      <div style={{border:"1px solid #ddd",borderRadius:6,padding:"12px 14px",marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:700,color:"#555",marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>All plays</div>
        <div style={{columns:4,columnGap:10}}>
          {combos.map((c,i)=><div key={i} style={{marginBottom:4,fontSize:15,fontWeight:700,fontFamily:"'Courier New',monospace",letterSpacing:4,breakInside:"avoid"}}>{i+1}. {c.join("")}</div>)}
        </div>
      </div>
      <div style={{border:"1px solid #ddd",borderRadius:6,padding:"10px 14px",display:"flex",gap:20,alignItems:"center",fontSize:13,flexWrap:"wrap"}}>
        <span style={{fontWeight:700,fontSize:11,textTransform:"uppercase",letterSpacing:1}}>Played?</span>
        {["Midday ☐","Evening ☐","Both ☐"].map(t=><span key={t}>{t}</span>)}
        <span style={{marginLeft:"auto"}}>Result: ___________</span>
      </div>
    </div>
  );
}

export default function PrintTool() {
  const [layout,  setLayout]  = useState("list");
  const [preview, setPreview] = useState(false);

  function doPrint(){
    const s = document.createElement("style");
    s.textContent = `@media print{body *{visibility:hidden!important}#print-zone,#print-zone *{visibility:visible!important}#print-zone{position:fixed;top:0;left:0;width:100%}@page{margin:0.5in}}`;
    document.head.appendChild(s);
    setTimeout(()=>window.print(),100);
  }

  const PrintContent = () => (
    <>
      {layout==="list"    && <PlayList   combos={SAMPLE} meta={META} />}
      {layout==="slip"    && <BetSlips   combos={SAMPLE} meta={META} />}
      {layout==="summary" && <SummaryCard combos={SAMPLE} meta={META} />}
    </>
  );

  return (
    <div style={{padding:"40px 32px", maxWidth:800, margin:"0 auto"}}>
      <div className="fade-up" style={{marginBottom:32}}>
        <h1 style={{fontFamily:"'DM Serif Display',Georgia,serif", fontSize:36, color:T.text, margin:"0 0 6px", fontWeight:400}}>Print Your Plays</h1>
        <p style={{fontSize:14, color:T.textM, margin:0}}>Choose layout · preview · print clean</p>
      </div>

      <div style={{display:"flex", flexDirection:"column", gap:10, marginBottom:24}}>
        {LAYOUTS.map(({id,title,desc})=>(
          <div key={id} onClick={()=>setLayout(id)} className="card-hover"
            style={{padding:"14px 18px", borderRadius:12, cursor:"pointer",
              border:`1px solid ${layout===id?T.gold:T.border}`,
              background:layout===id?`rgba(200,146,42,0.05)`:T.bg2,
              display:"flex", alignItems:"center", gap:14, transition:"all 0.2s"}}>
            <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${layout===id?T.gold:T.border}`,background:layout===id?T.gold:"transparent",flexShrink:0}}/>
            <div>
              <p style={{fontSize:14, fontWeight:600, margin:0, color:T.text}}>{title}</p>
              <p style={{fontSize:12, color:T.textM, margin:0}}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{display:"flex", gap:10, marginBottom:24}}>
        <Btn onClick={()=>setPreview(v=>!v)} variant="ghost">{preview?"Hide preview":"Preview"}</Btn>
        <Btn onClick={doPrint}>Print →</Btn>
      </div>

      {preview && (
        <div style={{border:`1px solid ${T.border}`, borderRadius:12, overflow:"hidden", marginBottom:16}}>
          <div style={{padding:"8px 16px", background:T.bg3, borderBottom:`1px solid ${T.border}`, fontSize:12, color:T.textM}}>Preview</div>
          <div id="print-zone" style={{padding:24, background:"white", overflowX:"auto"}}>
            <PrintContent />
          </div>
        </div>
      )}

      {!preview && <div id="print-zone" style={{display:"none"}}><PrintContent /></div>}

      <p style={{fontSize:12, color:T.textM, borderTop:`1px solid ${T.border}`, paddingTop:12, marginTop:8}}>
        Tip: In your browser print dialog, set margins to minimum and disable headers/footers for cleanest output.
      </p>
    </div>
  );
}
