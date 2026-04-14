"use client";
import { useState, useMemo } from "react";
import { T } from '../../lib/theme';
import { getUniquePerms, getBoxLabel } from '../../lib/engine';
import { Card, Label, Toggle, Ball, Btn } from '../../components/ui';
import Link from "next/link";

const PRESETS4 = [
  {id:"cd",label:"C–D",n:2},{id:"cf",label:"C–F",n:4},
  {id:"cg",label:"C–G",n:5},{id:"ch",label:"C–H",n:6},
];

function DigitBox({val,onChange,lbl,color,disabled}){
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
      <span style={{fontSize:10,fontWeight:700,color:disabled?T.textD:T.textM,letterSpacing:"0.1em",opacity:disabled?.4:1}}>{lbl}</span>
      <input type="text" maxLength={1} value={val} disabled={disabled}
        onChange={e=>onChange(e.target.value.replace(/[^0-9]/g,""))}
        style={{width:50,height:50,textAlign:"center",fontSize:24,fontWeight:700,
          border:`2px solid ${disabled?T.border:color}`,borderRadius:8,
          background:disabled?T.bg1:T.bg2,color:T.text,outline:"none",
          fontFamily:"'IBM Plex Mono',monospace",opacity:disabled?.35:1,
          cursor:disabled?"not-allowed":"text",transition:"border-color 0.2s"}}/>
    </div>
  );
}

export default function WheelingTool(){
  const [tab,setTab]         = useState("pick3");
  const [masters,setMasters] = useState(["",""]);
  const [secs,setSecs]       = useState(["","","","","",""]);
  const [preset,setPreset]   = useState("ch");
  const [betType,setBetType] = useState("straight");

  const setMaster = (i,v) => setMasters(m=>{const n=[...m];n[i]=v.replace(/[^0-9]/g,"");return n;});
  const setSec    = (i,v) => setSecs(s=>{const n=[...s];n[i]=v.replace(/[^0-9]/g,"");return n;});

  const ac = PRESETS4.find(p=>p.id===preset)?.n??6;
  const isBox   = betType==="box";
  const isCombo = betType==="combo";

  const {tickets,pairs,hasDoubles} = useMemo(()=>{
    const [A,B] = masters;
    if(!A||!B) return {tickets:[],pairs:0,hasDoubles:false};
    let hasD = false;

    if(tab==="pick3"){
      const filled = secs.filter(s=>s!=="");
      if(!filled.length) return {tickets:[],pairs:0,hasDoubles:false};
      const t = [];
      filled.forEach(sec=>{
        const digits=[A,B,sec];
        const perms=getUniquePerms(digits);
        const way=getBoxLabel(digits);
        if(way&&way!=="6-way") hasD=true;
        if(isBox){ t.push({digits:[...digits].sort(),label:way??null}); }
        else perms.forEach(p=>t.push({digits:p,label:isCombo?(way?`combo·${way}`:null):null}));
      });
      return {tickets:t,pairs:0,hasDoubles:hasD};
    } else {
      const filled = secs.slice(0,ac).filter(s=>s!=="");
      if(filled.length<2) return {tickets:[],pairs:0,hasDoubles:false};
      const t=[]; let pr=0;
      for(let i=0;i<filled.length;i++) for(let j=i+1;j<filled.length;j++){
        pr++;
        const digits=[A,B,filled[i],filled[j]];
        const perms=getUniquePerms(digits);
        const way=getBoxLabel(digits);
        if(way&&way!=="24-way") hasD=true;
        if(isBox){ t.push({digits:[...digits].sort(),label:way??null}); }
        else perms.forEach(p=>t.push({digits:p,label:isCombo?(way?`combo·${way}`:null):null}));
      }
      return {tickets:t,pairs:pr,hasDoubles:hasD};
    }
  },[masters,secs,tab,preset,betType,ac,isBox,isCombo]);

  const half = Math.ceil(tickets.length/2);
  const colL  = tickets.slice(0,half);
  const colR  = tickets.slice(half);

  const cellStyle = {
    padding:"5px 0",textAlign:"center",width:32,fontWeight:700,fontSize:15,
    border:`0.5px solid ${T.border}`,background:T.bg2,color:T.goldL,
    fontFamily:"'IBM Plex Mono',monospace",
  };

  return(
    <div style={{padding:"40px 32px",maxWidth:960,margin:"0 auto"}}>
      <div className="fade-up" style={{marginBottom:32}}>
        <h1 style={{fontFamily:"'DM Serif Display',Georgia,serif",fontSize:36,color:T.text,margin:"0 0 6px",fontWeight:400}}>Wheeling System</h1>
        <p style={{fontSize:14,color:T.textM,margin:0}}>Enter your digits — doubles auto-detected — all arrangements generated</p>
      </div>

      {/* Tab */}
      <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,marginBottom:24}}>
        {[["pick3","Pick 3"],["win4","Win-4"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setTab(id)} style={{
            padding:"10px 24px",fontSize:14,fontWeight:tab===id?700:400,
            background:"transparent",border:"none",cursor:"pointer",
            borderBottom:tab===id?`2px solid ${T.gold}`:"2px solid transparent",
            color:tab===id?T.goldL:T.textM,marginBottom:-1,fontFamily:"inherit",transition:"all 0.15s",
          }}>{lbl}</button>
        ))}
      </div>

      <Card gold style={{marginBottom:20}}>
        <div style={{display:"flex",gap:32,flexWrap:"wrap",marginBottom:20}}>
          <div>
            <Label>2 Master Digits</Label>
            <div style={{display:"flex",gap:8}}>
              {["A","B"].map((l,i)=><DigitBox key={l} val={masters[i]} onChange={v=>setMaster(i,v)} lbl={l} color={T.gold}/>)}
            </div>
          </div>
          <div>
            <Label>Secondary Digits {tab==="win4"?`(active: C–${["D","F","G","H"][PRESETS4.findIndex(p=>p.id===preset)]})`:"(up to 6)"}</Label>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {["C","D","E","F","G","H"].map((l,i)=>(
                <DigitBox key={l} val={secs[i]} onChange={v=>setSec(i,v)} lbl={l} color={T.ice} disabled={tab==="win4"&&i>=ac}/>
              ))}
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:16,flexWrap:"wrap",alignItems:"flex-end"}}>
          {tab==="win4"&&<div><Label>Secondary Pool</Label><Toggle value={preset} onChange={setPreset} options={PRESETS4.map(p=>[p.id,p.label])}/></div>}
          <div><Label>Bet Type</Label><Toggle value={betType} onChange={setBetType} options={[["straight","Straight"],["box","Box"],["combo","Combo"]]}/></div>
          {hasDoubles&&<span style={{fontSize:12,color:T.amber,background:"rgba(208,128,32,0.1)",padding:"4px 10px",borderRadius:6}}>Repeating digits — arrangements auto-adjusted</span>}
        </div>
      </Card>

      {tickets.length>0&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:10,marginBottom:20}}>
          {[[tab==="win4"?"Pairs":"Secondaries",tab==="win4"?pairs:secs.filter(s=>s!=="").length],
            ["Per group",isBox?1:tab==="pick3"?6:24],
            ["Total tickets",tickets.length]].map(([l,v])=>(
            <div key={l} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px"}}>
              <p style={{fontSize:10,color:T.textM,margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.08em"}}>{l}</p>
              <p style={{fontSize:24,fontWeight:700,margin:0,color:T.goldL,fontFamily:"'IBM Plex Mono',monospace"}}>{v}</p>
            </div>
          ))}
        </div>
      )}

      {tickets.length>0?(
        <Card>
          <div style={{display:"flex",gap:12}}>
            {[colL,colR].map((col,ci)=>(
              <table key={ci} style={{flex:1,borderCollapse:"collapse"}}>
                <tbody>
                  {col.map(({digits,label},i)=>(
                    <tr key={i} style={{borderBottom:`1px solid ${T.border}`}}>
                      <td style={{padding:"4px 6px",color:T.textD,fontSize:11,width:22,fontFamily:"'IBM Plex Mono',monospace"}}>{ci===0?i+1:half+i+1}.</td>
                      {digits.map((d,j)=>(
                        <td key={j} style={{padding:"5px 2px",textAlign:"center",width:32}}>
                          <span style={{display:"inline-block",width:28,height:28,borderRadius:5,background:T.bg3,
                            border:`1px solid ${T.border}`,textAlign:"center",lineHeight:"28px",
                            fontSize:15,fontWeight:700,color:T.goldL,fontFamily:"'IBM Plex Mono',monospace"}}>{d}</span>
                        </td>
                      ))}
                      {label&&<td style={{paddingLeft:6}}>
                        <span style={{fontSize:9,padding:"2px 6px",background:"rgba(74,143,216,0.1)",color:T.iceL,borderRadius:3,fontWeight:700,whiteSpace:"nowrap"}}>{label}</span>
                      </td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>
          {tickets.length>0&&(
            <div style={{marginTop:14,paddingTop:12,borderTop:`1px solid ${T.border}`,display:"flex",gap:8}}>
              <Link href="/print"><Btn variant="ghost" small>Print plays →</Btn></Link>
            </div>
          )}
        </Card>
      ):(
        <div style={{padding:40,textAlign:"center",border:`1px dashed ${T.border}`,borderRadius:12,color:T.textD,fontSize:14}}>
          Enter both master digits and at least {tab==="win4"?"2 secondary":"one secondary"} digit to generate plays
        </div>
      )}
    </div>
  );
}
