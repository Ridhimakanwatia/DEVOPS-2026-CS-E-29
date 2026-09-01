:root{
  --paper:#F5F5F5;
  --paper-deep:#FFFFFF;
  --ink:#0A0A0A;
  --ink-soft:#6B6B6B;
  --blue:#0A0A0A;
  --blue-deep:#000000;
  --teal:#5A5A5A;
  --brass:#B9860B;
  --brass-deep:#8F6708;
  --rule:#E0E0E0;
  --rule-soft:#EFEFEF;
  --danger:#C13A3A;
}
html[data-theme="dark"]{
  --paper:#0A0A0A;
  --paper-deep:#161616;
  --ink:#F2F2F2;
  --ink-soft:#9A9A9A;
  --blue:#F2F2F2;
  --blue-deep:#FFFFFF;
  --teal:#AFAFAF;
  --brass:#E4B653;
  --brass-deep:#F1C876;
  --rule:#333333;
  --rule-soft:#1F1F1F;
  --danger:#E2836A;
}
*{box-sizing:border-box;}
body{
  margin:0;
  min-height:100vh;
  background:
    linear-gradient(var(--rule-soft) 1px, transparent 1px) 0 0/28px 28px,
    linear-gradient(90deg, var(--rule-soft) 1px, transparent 1px) 0 0/28px 28px,
    var(--paper);
  color:var(--ink);
  font-family:'IBM Plex Sans', sans-serif;
}

/* ---------------- TOPBAR ---------------- */
.topbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:16px 32px;
  border-bottom:1.5px solid var(--ink);
  background:var(--paper);
}
.brand .mono{
  font-family:'Space Grotesk', sans-serif;
  font-weight:700;
  font-size:18px;
  letter-spacing:-0.01em;
}
.brand .mono span{color:var(--blue);}

.navlinks{display:flex; gap:26px;}
.navlinks a{
  font-family:'IBM Plex Mono', monospace;
  font-size:13px;
  letter-spacing:0.04em;
  text-transform:uppercase;
  color:var(--ink-soft);
  text-decoration:none;
  padding-bottom:4px;
  border-bottom:2px solid transparent;
}
.navlinks a:hover{color:var(--ink);}
.navlinks a.active{color:var(--ink); border-bottom-color:var(--blue);}

.topbar-right{display:flex; align-items:center; gap:16px;}
#themeToggle{
  font-family:'IBM Plex Mono', monospace;
  font-size:11px;
  letter-spacing:0.1em;
  text-transform:uppercase;
  background:transparent;
  color:var(--blue-deep);
  border:1px solid var(--blue-deep);
  padding:6px 12px;
  cursor:pointer;
}
#themeToggle:hover{background:var(--blue-deep); color:var(--paper);}

.avatar{
  width:32px; height:32px;
  border:1.5px solid var(--ink);
  display:flex; align-items:center; justify-content:center;
  font-family:'Space Grotesk', sans-serif;
  font-weight:700; font-size:13px;
  color:var(--blue);
}

/* ---------------- LAYOUT ---------------- */
.wrap{max-width:980px; margin:0 auto; padding:40px 24px 80px;}

.hero-row{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:24px;
  border-bottom:1.5px solid var(--ink);
  padding-bottom:28px;
  margin-bottom:36px;
}
.eyebrow{
  font-family:'IBM Plex Mono', monospace;
  font-size:11px;
  letter-spacing:0.14em;
  text-transform:uppercase;
  color:var(--brass-deep);
  margin:0 0 10px;
}
h1{
  font-family:'Space Grotesk', sans-serif;
  font-weight:700;
  font-size:clamp(26px, 4vw, 36px);
  margin:0 0 8px;
  letter-spacing:-0.01em;
}
.sub{
  font-size:14.5px;
  color:var(--ink-soft);
  margin:0;
  max-width:44ch;
}

.hero-stamp{
  flex-shrink:0;
  border:2px solid var(--brass);
  color:var(--brass-deep);
  text-align:center;
  padding:14px 18px;
  transform:rotate(-4deg);
  font-family:'Space Grotesk', sans-serif;
  font-weight:700;
}
.hero-stamp .pct{font-size:28px; line-height:1;}
.hero-stamp .label{
  font-family:'IBM Plex Mono', monospace;
  font-weight:500; font-size:10px; letter-spacing:0.06em;
  text-transform:uppercase; margin-top:4px; line-height:1.3;
}

/* ---------------- ACTION CARDS ---------------- */
.actions-row{
  display:grid;
  grid-template-columns:repeat(3, 1fr);
  gap:16px;
  margin-bottom:40px;
}
.action-card{
  display:block;
  border:1px solid var(--rule);
  border-radius:12px;
  background:var(--paper-deep);
  box-shadow:0 1px 2px rgba(21,26,36,0.03), 0 6px 16px rgba(21,26,36,0.05);
  padding:20px;
  text-decoration:none;
  color:var(--ink);
  position:relative;
  transition:transform .1s, box-shadow .1s;
}
.action-card:hover{transform:translateY(-2px); box-shadow:0 4px 8px rgba(21,26,36,0.05), 0 10px 24px rgba(21,26,36,0.08);}
.action-card.primary{background:var(--paper-deep); border-color:var(--blue);}
.action-card .num{
  font-family:'IBM Plex Mono', monospace;
  font-size:11px;
  color:var(--brass-deep);
  font-weight:600;
  display:block;
  margin-bottom:10px;
}
.action-card h3{
  font-family:'Space Grotesk', sans-serif;
  font-size:17px;
  margin:0 0 6px;
}
.action-card p{
  font-size:13px;
  color:var(--ink-soft);
  margin:0 0 16px;
  line-height:1.4;
}
.action-card .go{
  font-family:'IBM Plex Mono', monospace;
  font-size:12px;
  color:var(--blue);
  letter-spacing:0.04em;
}

/* ---------------- STATS STRIP ---------------- */
.stats-strip{
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  border:1px solid var(--rule);
  border-radius:12px;
  overflow:hidden;
  background:var(--paper-deep);
  box-shadow:0 1px 2px rgba(21,26,36,0.03), 0 6px 16px rgba(21,26,36,0.05);
  margin-bottom:44px;
}
.stat{
  padding:16px 18px;
  border-right:1px solid var(--rule);
}
.stat:last-child{border-right:none;}
.stat .k{
  display:block;
  font-family:'IBM Plex Mono', monospace;
  font-size:10.5px;
  color:var(--ink-soft);
  text-transform:uppercase;
  letter-spacing:0.06em;
  margin-bottom:6px;
}
.stat .v{
  display:block;
  font-family:'Space Grotesk', sans-serif;
  font-weight:600;
  font-size:19px;
}

/* ---------------- RECENT MATCHES ---------------- */
.recent-head{
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  border-bottom:1.5px solid var(--ink);
  padding-bottom:10px;
  margin-bottom:18px;
}
.recent-head h2{
  font-family:'Space Grotesk', sans-serif;
  font-size:20px;
  margin:0;
}
.recent-head .count{
  font-family:'IBM Plex Mono', monospace;
  font-size:11.5px;
  color:var(--ink-soft);
}

.mini-ticket{
  display:flex;
  justify-content:space-between;
  align-items:center;
  border:1px solid var(--rule);
  border-left:3px solid var(--blue);
  border-radius:10px;
  background:var(--paper-deep);
  box-shadow:0 1px 2px rgba(21,26,36,0.03);
  padding:14px 18px;
  margin-bottom:12px;
}
.mini-ticket .left{display:flex; align-items:center; gap:16px;}
.mini-ticket .rank{
  font-family:'IBM Plex Mono', monospace;
  font-size:12px;
  color:var(--ink-soft);
}
.mini-ticket h4{
  font-family:'Space Grotesk', sans-serif;
  font-size:15px;
  margin:0 0 2px;
}
.mini-ticket p{
  font-family:'IBM Plex Mono', monospace;
  font-size:12px;
  color:var(--ink-soft);
  margin:0;
}
.stamp-mini{
  font-family:'IBM Plex Mono', monospace;
  font-weight:600;
  font-size:13px;
  color:var(--brass-deep);
  border:1px solid var(--brass);
  padding:5px 10px;
}

@media (max-width:760px){
  .navlinks{display:none;}
  .actions-row{grid-template-columns:1fr;}
  .stats-strip{grid-template-columns:repeat(2, 1fr);}
  .hero-row{flex-direction:column;}
  .hero-stamp{align-self:flex-start;}
}