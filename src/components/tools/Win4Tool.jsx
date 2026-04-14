"use client";
import { useState, useMemo } from "react";
import { T } from '../../lib/theme';
import { ANGLES, PRESETS, API_BASE, parseDraws, runEngine, blend } from '../../lib/engine';
import { Btn, Card, Label, Toggle, Ball, ScoreBar, StatCard } from '../../components/ui';
import Link from "next/link";

const WINDOWS = [7,14,30,60,90,180,365];

export default function Win4Tool() {
  const [win, setWin]         = useState(30);
  const [dt, setDt]           = useState("both");
  const [preset, setPreset]   = useState("balanced");
  const [weights, setWeights] = useState({...PRESETS.balanced});
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [fetched, setFetched] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [showWheel, setShowWheel] = useState(false);
  const [subView, setSubView] = useState("scores");

  function applyPreset(p) { setPreset(p); if (p !== "custom") setWeights({...PRESETS[p]}); }
  function setW(id, v) { setPreset("custom"); setWeights(w => ({...w, [id]: v})); }

  async function fetchData() {
    setLoading(true); setError(null);
    try {
      const r = await fetch(`${API_BASE}?$limit=${Math.min(win*4,800)}&$order=draw_date%20DESC`);
      if (!r.ok) throw new Error(`API ${r.status}`);
      setRawData(await r.json()); setFetched(true);
    } catch(e) { setError(e.message); } finally { setLoading(false); }
  }

  const draws  = useMemo(() => rawData.length ? parseDraws(rawData,"win4",dt) : [], [rawData,dt]);
  const eng    = useMemo(() => draws.length ? runEngine(draws,"win4",win) : null, [draws,win]);
  const comp   = useMemo(() => blend(eng,weights), [eng,weights]);
  const ranked = useMemo(() => comp ? comp.map(pos => [...Array(10).keys()].sort((a,b)=>pos[b]-pos[a])) : null, [comp]);

  const wheelCombos = useMemo(() => {
    if (!ranked) return [];
    const tops = ranked.map(p => p.slice(0,3).map(String));
    const out = []; const seen = new Set();
    tops[0].forEach(a => tops[1].forEach(b => tops[2].forEach(c => tops[3].forEach(d => {
      const k = a+b+c+d;
      if (!seen.has(k)) { seen.add(k); out.push([a,b,c,d]); }
    }))));
    return out;
  }, [ranked]);

  const totalW = Object.values(weights).reduce((a,b)=>a+b,0);

  return (
    <div style={{padding:"40px 32px", maxWidth:960, margin:"0 auto"}}>
      <div className="fade-up" style={{marginBottom:32}}>
        <h1 style={{fontFamily:"'DM Serif Display',Georgia,serif", fontSize:36, color:T.text, margin:"0 0 6px", fontWeight:400}}>Win-4 Analysis Engine</h1>
        <p style={{fontSize:14, color:T.textM, margin:0}}>NY Win-4 · 9 angles · live data · transparent scoring</p>
      </div>

      {/* Controls */}
      <Card gold style={{marginBottom:16}}>
        <div style={{display:"flex", gap:16, flexWrap:"wrap", alignItems:"flex-end"}}>
          <div><Label>Draw</Label><Toggle value={dt} onChange={setDt} options={[["both","Both"],["midday","Midday"],["evening","Evening"]]} /></div>
          <div><Label>Window</Label><Toggle value={win} onChange={v=>setWin(Number(v))} options={WINDOWS.map(w=>[w,String(w)])} small /></div>
          <Btn onClick={fetchData} disabled={loading} style={{marginTop:18}}>{loading?"Analyzing...":fetched?"Refresh →":"Run analysis →"}</Btn>
        </div>
      </Card>

      {/* Strategy */}
      <Card style={{marginBottom:16}}>
        <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:14, flexWrap:"wrap"}}>
          <Label style={{margin:0}}>Strategy</Label>
          <Toggle value={preset} onChange={applyPreset} options={[["aggressive","Aggressive"],["balanced","Balanced"],["conservative","Conservative"],["custom","Custom"]]} />
          <span style={{fontSize:11, color: Math.abs(totalW-1)>.01?T.red:T.green, marginLeft:"auto"}}>{Math.round(totalW*100)}% total</span>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"8px 24px"}}>
          {ANGLES.map(({id,label,desc}) => (
            <div key={id}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:3}}>
                <span style={{fontSize:12, fontWeight:600, color:T.text}}>{label}</span>
                <span style={{fontSize:11, color:T.gold, fontFamily:"'IBM Plex Mono',monospace"}}>{Math.round(weights[id]*100)}%</span>
              </div>
              <input type="range" min={0} max={40} step={1} value={Math.round(weights[id]*100)} onChange={e=>setW(id,Number(e.target.value)/100)} style={{width:"100%", accentColor:T.gold}} />
              <p style={{fontSize:10, color:T.textD, margin:"2px 0 0"}}>{desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {error && <div style={{padding:"12px 16px", background:"rgba(212,64,64,0.1)", border:`1px solid ${T.red}`, borderRadius:8, color:T.red, marginBottom:16, fontSize:13}}>Error: {error}</div>}

      {!fetched && !loading && (
        <div style={{padding:48, textAlign:"center", border:`1px dashed ${T.border}`, borderRadius:12, color:T.textD, fontSize:15}}>
          Configure settings and click Run analysis to pull live NY lottery data
        </div>
      )}

      {fetched && eng && comp && ranked && (
        <div className="fade-up">
          <div style={{display:"grid", gridTemplateColumns:"repeat(4,minmax(0,1fr))", gap:10, marginBottom:20}}>
            {[["Draws",eng.n],["Expected/digit",eng.exp.toFixed(1)],["Late skip >",eng.late],["Very late >",eng.vLate]].map(([l,v])=>(
              <StatCard key={l} label={l} value={v} />
            ))}
          </div>

          <div style={{display:"flex", gap:8, marginBottom:16}}>
            <Toggle value={subView} onChange={setSubView} options={[["scores","Digit scores"],["sum","Sum chart"],["oddeven","Odd / even"]]} />
          </div>

          {subView==="oddeven" && (
            <Card style={{marginBottom:20}}>
              <Label>Odd / Even Balance</Label>
              <div style={{display:"flex", alignItems:"center", gap:14, marginBottom:8}}>
                <span style={{fontSize:13, color:T.text, minWidth:100}}>Odd: <strong style={{color:T.gold}}>{eng.odd}</strong> ({((eng.odd/(eng.odd+eng.even))*100).toFixed(0)}%)</span>
                <div style={{flex:1, height:12, background:T.bg3, borderRadius:6, overflow:"hidden"}}>
                  <div className="bar-fill" style={{"--w":`${(eng.odd/(eng.odd+eng.even))*100}%`, height:"100%", background:`linear-gradient(90deg,${T.gold},${T.goldL})`, borderRadius:6, width:0}} />
                </div>
                <span style={{fontSize:13, color:T.text, minWidth:100, textAlign:"right"}}>Even: <strong style={{color:T.ice}}>{eng.even}</strong> ({((eng.even/(eng.odd+eng.even))*100).toFixed(0)}%)</span>
              </div>
              <p style={{fontSize:12, color:T.textM, margin:0}}>{eng.odd>eng.even?"Odd-heavy — engine favoring even digits":"Even-heavy — engine favoring odd digits"}</p>
            </Card>
          )}

          {subView==="sum" && (
            <Card style={{marginBottom:20}}>
              <Label>Sum Distribution (sums 12–15 are statistically common)</Label>
              <div style={{display:"flex", alignItems:"flex-end", gap:3, height:80, overflowX:"auto", paddingBottom:4}}>
                {eng.sumD.map((c,i) => {
                  const h = (c/Math.max(...eng.sumD,1))*72;
                  const pk = [12,13,14,15].includes(i);
                  return (
                    <div key={i} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:18}}>
                      <div style={{width:14, height:Math.max(h,c>0?3:0), background:pk?T.gold:T.bg3, borderRadius:"2px 2px 0 0"}} />
                      <span style={{fontSize:8, color:T.textD}}>{i}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {subView==="scores" && (
            <div>
              <p style={{fontSize:11, color:T.textM, marginBottom:12, letterSpacing:"0.08em", textTransform:"uppercase"}}>Click any digit to expand angle breakdown</p>
              <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
                {["1","2","3","4"].map((lbl,pos) => (
                  <div key={pos} style={{flex:1, minWidth:160}}>
                    <Label>Position {lbl}</Label>
                    <div style={{display:"flex", flexDirection:"column", gap:5}}>
                      {ranked[pos].map((d,rank) => {
                        const isOpen = expanded===`${pos}-${d}`;
                        const sk = eng.skip[pos][d];
                        const isVL = sk>eng.vLate, isL = sk>eng.late;
                        return (
                          <div key={d} className="digit-card" onClick={()=>setExpanded(isOpen?null:`${pos}-${d}`)}
                            style={{border:`1px solid ${rank<3?T.borderG:T.border}`, borderRadius:10, padding:"8px 10px",
                              background:rank<3?`rgba(200,146,42,0.06)`:T.bg2, cursor:"pointer", transition:"all 0.2s"}}>
                            <div style={{display:"flex", alignItems:"center", gap:8}}>
                              <Ball digit={d} size={34} gold={rank===0} late={isL&&!isVL} veryLate={isVL} />
                              <div style={{flex:1}}>
                                <ScoreBar score={comp[pos][d]} color={rank<3?T.gold:T.textD} />
                                <div style={{display:"flex", gap:5, marginTop:3}}>
                                  <span style={{fontSize:10, color:T.textM, fontFamily:"'IBM Plex Mono',monospace"}}>f:{eng.freq[pos][d]} s:{sk>30?"30+":sk}</span>
                                  {isVL&&<span style={{fontSize:9, padding:"1px 5px", background:"rgba(212,64,64,0.15)", color:T.red, borderRadius:3, fontWeight:700}}>VERY LATE</span>}
                                  {!isVL&&isL&&<span style={{fontSize:9, padding:"1px 5px", background:"rgba(208,128,32,0.15)", color:T.amber, borderRadius:3, fontWeight:700}}>LATE</span>}
                                </div>
                              </div>
                              <span style={{fontSize:10, color:T.textD}}>{isOpen?"▲":"▼"}</span>
                            </div>
                            {isOpen && (
                              <div style={{marginTop:10, paddingTop:10, borderTop:`1px solid ${T.border}`}}>
                                {ANGLES.map(({id,label},ai) => (
                                  <div key={id} style={{display:"flex", alignItems:"center", gap:8, marginBottom:5}}>
                                    <span style={{fontSize:11, color:T.textM, minWidth:110}}>{label}</span>
                                    <ScoreBar score={eng.raw[id]?.[pos]?.[d]??0} color={[T.gold,T.ice,T.green,T.red,T.gold,T.amber,T.green,T.ice,T.gold][ai]} delay={ai*40} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top picks + wheel */}
          <div style={{marginTop:24, padding:"20px", background:T.bg3, border:`1px solid ${T.borderG}`, borderRadius:12}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:8}}>
              <div>
                <Label style={{margin:"0 0 10px"}}>Top picks by position</Label>
                <div style={{display:"flex", gap:20, flexWrap:"wrap"}}>
                  {ranked.map((pos,pi) => (
                    <div key={pi}>
                      <span style={{fontSize:11, color:T.textM, display:"block", marginBottom:6}}>{["1st","2nd","3rd"][pi]}</span>
                      <div style={{display:"flex", gap:5}}>
                        {pos.slice(0,3).map((d,ri)=><Ball key={d} digit={d} size={ri===0?42:34} gold={ri===0} delay={pi*100+ri*50} animate />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                <Btn onClick={()=>setShowWheel(v=>!v)} variant={showWheel?"ghost":"primary"}>{showWheel?"Hide wheel":"Generate wheel ↗"}</Btn>
                <Link href="/wheeling"><Btn variant="ghost">Full wheeling tool</Btn></Link>
              </div>
            </div>
            {showWheel && (
              <div style={{borderTop:`1px solid ${T.border}`, paddingTop:16}}>
                <p style={{fontSize:12, color:T.textM, marginBottom:10}}>{wheelCombos.length} straight plays · top 3 digits per position</p>
                <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))", gap:5}}>
                  {wheelCombos.map((combo,i) => (
                    <div key={i} style={{display:"flex", alignItems:"center", gap:5, padding:"4px 8px", background:T.bg2, borderRadius:6, border:`1px solid ${T.border}`}}>
                      <span style={{fontSize:10, color:T.textD, minWidth:18}}>{i+1}.</span>
                      <span style={{fontSize:16, fontWeight:700, fontFamily:"'IBM Plex Mono',monospace", color:T.goldL, letterSpacing:4}}>{combo.join("")}</span>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:12, display:"flex", gap:8}}>
                  <Link href="/print"><Btn variant="ghost" small>Print plays →</Btn></Link>
                  <Btn variant="ghost" small onClick={()=>setShowWheel(false)}>Clear</Btn>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
