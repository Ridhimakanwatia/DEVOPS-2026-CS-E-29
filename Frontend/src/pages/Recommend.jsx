import React from 'react';
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, SlidersHorizontal, Sparkles } from "lucide-react";
import api from "../services/api";
import { LaptopCard } from "../components/LaptopCard";

export default function Recommend() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({budget:"70000", use:searchParams.get("use") || "coding", ram:"16", storage:"512", portability:"balanced"});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  function update(key, value) { setForm(prev => ({...prev, [key]:value})); }
  async function submit(e) {
    e.preventDefault(); setLoading(true); setError(""); setSubmitted(false);
    try { const {data} = await api.post("/recommendations", {...form, budget:Number(form.budget), ram:Number(form.ram), storage:Number(form.storage)}); setResults(data.results); setSubmitted(true); }
    catch (err) { setError(err.response?.data?.message || "Could not generate recommendations. Is the backend running?"); }
    finally { setLoading(false); }
  }
  return <main className="section-wrap page-section">
    <div className="page-heading"><p className="eyebrow"><Sparkles size={14}/> PERSONALIZED SHORTLIST</p><h1>Let's find your laptop.</h1><p>A few quick details help us rank options based on what you actually need.</p></div>
    <div className="recommend-layout">
      <form className="preference-form" onSubmit={submit}>
        <div className="form-section-title"><span className="step-number">01</span><div><h3>Your budget</h3><p>Choose a comfortable spending limit.</p></div></div>
        <label>Maximum budget (₹)<input type="number" min="10000" max="1000000" required value={form.budget} onChange={e=>update("budget",e.target.value)}/></label>
        <div className="form-section-title"><span className="step-number">02</span><div><h3>Your main use</h3><p>We'll adjust scoring for this workload.</p></div></div>
        <div className="use-options">{[["coding","Coding"],["gaming","Gaming"],["college","College"],["office","Office work"],["video editing","Video editing"],["everyday","General use"]].map(([value,label])=><button type="button" key={value} onClick={()=>update("use",value)} className={`use-option ${form.use===value?"selected":""}`}>{label}</button>)}</div>
        <div className="two-fields"><label>Preferred RAM<select value={form.ram} onChange={e=>update("ram",e.target.value)}><option value="8">8 GB</option><option value="16">16 GB</option><option value="32">32 GB</option><option value="64">64 GB</option></select></label><label>Preferred storage<select value={form.storage} onChange={e=>update("storage",e.target.value)}><option value="256">256 GB</option><option value="512">512 GB</option><option value="1024">1 TB</option><option value="2048">2 TB</option></select></label></div>
        <div className="form-section-title"><span className="step-number">03</span><div><h3>What's your priority?</h3><p>Pick the trade-off that feels right.</p></div></div>
        <div className="priority-options">{[["lightweight","Easy to carry"],["balanced","A bit of both"],["performance","Maximum performance"]].map(([value,label])=><button type="button" key={value} onClick={()=>update("portability",value)} className={`priority-option ${form.portability===value?"selected":""}`}>{label}</button>)}</div>
        {error && <p className="error-state">{error}</p>}
        <button className="btn btn-dark full-width submit-btn" disabled={loading}>{loading?"Finding your matches…":"Find my matches"} <ArrowRight size={17}/></button>
        <p className="fine-print">Recommendations are calculated from sample catalogue specifications, not sponsored placements.</p>
      </form>
      <section className="recommend-results">
        {!submitted ? <div className="results-placeholder"><div className="placeholder-icon"><SlidersHorizontal size={25}/></div><h2>Your shortlist will appear here</h2><p>Set your preferences and we'll score the available laptops against them.</p><div className="criteria-list"><span>01 <b>Budget fit</b></span><span>02 <b>Performance and specs</b></span><span>03 <b>Use-case match</b></span></div></div> :
          <><div className="results-heading"><div><p className="eyebrow">YOUR RESULTS</p><h2>Top matches for you</h2></div><span className="match-count">{results.length} matches</span></div>{results.length ? <div className="laptop-grid">{results.map(item=><LaptopCard key={item.laptop._id} laptop={item.laptop} score={item.score} reasons={item.reasons}/>)}</div> : <div className="empty-state">No laptops found yet. Add more products to the catalogue.</div>}</>}
      </section>
    </div>
  </main>;
}
