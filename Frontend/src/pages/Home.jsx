import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Code2, Gamepad2, GraduationCap, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api";
import { LaptopCard } from "../components/LaptopCard";
import React from 'react';

const categories = [
  { title:"College & study", sub:"Reliable everyday machines", use:"college", icon:GraduationCap },
  { title:"Coding & development", sub:"For IDEs and multitasking", use:"coding", icon:Code2 },
  { title:"Gaming", sub:"Performance and graphics", use:"gaming", icon:Gamepad2 }
];

export default function Home() {
  const [laptops, setLaptops] = useState([]);
  useEffect(() => { api.get("/laptops").then(({data}) => setLaptops(data.laptops.slice(0,3))).catch(() => {}); }, []);
  return <main>
    <section className="hero section-wrap">
      <div className="hero-copy">
        <div className="eyebrow hero-eyebrow"><Sparkles size={15}/> A smarter way to shop</div>
        <h1>Your next laptop.<br/><span>Found thoughtfully.</span></h1>
        <p className="hero-sub">Tell us what you need it for and what you want to spend. We'll help narrow the options down to laptops that make sense for you.</p>
        <div className="hero-actions"><Link className="btn btn-dark" to="/recommend">Find my laptop <ArrowRight size={17}/></Link><Link className="btn btn-outline" to="/catalogue">Browse all laptops</Link></div>
        <div className="trust-row"><span><CheckCircle2 size={16}/> Recommendations by your needs</span><span><CheckCircle2 size={16}/> Easy spec comparison</span></div>
      </div>
      <div className="hero-art" aria-label="Decorative laptop illustration">
        <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
        <div className="hero-laptop"><div className="screen"><div className="screen-glow"></div><span>LW.</span><small>Find your fit.</small></div><div className="keyboard"></div></div>
        <div className="floating-note note-top"><span className="note-dot"></span><div><strong>Made for your needs</strong><small>Not just a top-10 list</small></div></div>
        <div className="floating-note note-bottom"><div className="mini-score">92</div><div><strong>Great match</strong><small>Budget · performance · use</small></div></div>
      </div>
    </section>
    <section className="section-wrap category-section">
      <div className="section-heading"><div><p className="eyebrow">START WITH YOUR GOAL</p><h2>What will you use it for?</h2></div><Link className="text-link" to="/recommend">Get a recommendation <ArrowRight size={15}/></Link></div>
      <div className="category-grid">{categories.map(({title,sub,use,icon:Icon}) => <Link to={`/recommend?use=${encodeURIComponent(use)}`} className="category-card" key={title}><span className="category-icon"><Icon size={22}/></span><h3>{title}</h3><p>{sub}</p><ArrowRight className="category-arrow" size={18}/></Link>)}</div>
    </section>
    <section className="section-wrap featured-section">
      <div className="section-heading"><div><p className="eyebrow">A FEW TO GET YOU STARTED</p><h2>Featured laptops</h2><p className="section-sub">A small preview of the catalogue. Your best match depends on your preferences.</p></div><Link className="text-link" to="/catalogue">See all laptops <ArrowRight size={15}/></Link></div>
      {laptops.length ? <div className="laptop-grid">{laptops.map(l => <LaptopCard key={l._id} laptop={l}/>)}</div> : <div className="empty-state">Connect the backend to load the sample laptop catalogue.</div>}
    </section>
    <section className="section-wrap bottom-cta"><div><p className="eyebrow">NOT SURE WHERE TO START?</p><h2>Answer a few questions.<br/>Get a shortlist that fits.</h2></div><Link className="btn btn-light" to="/recommend">Start recommendation <ArrowRight size={17}/></Link></section>
  </main>;
}
