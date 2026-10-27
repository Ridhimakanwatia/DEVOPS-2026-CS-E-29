import React from 'react';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Heart, Star } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function LaptopDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [laptop, setLaptop] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { api.get(`/laptops/${id}`).then(({data})=>setLaptop(data.laptop)).catch(()=>setError("Laptop not found or the API is unavailable.")); }, [id]);
  async function favourite() {
    if (!user) { setMessage("Log in to save laptops to your favourites."); return; }
    try { await api.post(`/auth/favourites/${id}`); setMessage("Saved to your favourites."); }
    catch (e) { setMessage(e.response?.data?.message || "Couldn't save this laptop."); }
  }
  if (error) return <main className="section-wrap page-section"><div className="error-state">{error}</div><Link to="/catalogue">Back to catalogue</Link></main>;
  if (!laptop) return <main className="section-wrap page-section"><div className="empty-state">Loading laptop details…</div></main>;
  return <main className="section-wrap page-section">
    <Link className="back-link" to="/catalogue"><ArrowLeft size={16}/> Back to catalogue</Link>
    <div className="details-layout">
      <div className="details-visual"><div className="device-placeholder detail-device"><span>{laptop.brand}</span><strong>{laptop.model}</strong><small>{laptop.processor}</small></div></div>
      <div className="details-copy"><p className="eyebrow">{laptop.brand} · {laptop.type}</p><h1>{laptop.model}</h1><div className="detail-rating"><Star size={16} fill="currentColor"/> {laptop.rating} <span>Sample catalogue rating</span></div><p className="detail-price">₹{Number(laptop.price).toLocaleString("en-IN")}</p><p className="detail-description">{laptop.description}</p><button className="btn btn-dark" onClick={favourite}><Heart size={17}/> Save to favourites</button>{message && <p className="inline-message">{message}</p>}</div>
    </div>
    <section className="details-section"><p className="eyebrow">AT A GLANCE</p><h2>Specifications</h2><div className="spec-table">{[["Processor",laptop.processor],["RAM",`${laptop.ram} GB`],["Storage",`${laptop.storage} GB ${laptop.storageType || "SSD"}`],["Graphics",laptop.gpu],["Weight",`${laptop.weight} kg`],["Laptop type",laptop.type]].map(([label,value])=><div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></section>
    <div className="pros-cons"><section className="details-section"><h2>What looks good</h2>{(laptop.pros||[]).map(x=><p className="pro-line" key={x}><Check size={16}/>{x}</p>)}</section><section className="details-section"><h2>Things to consider</h2>{(laptop.cons||[]).map(x=><p className="con-line" key={x}>• {x}</p>)}</section></div>
    <p className="fine-print">Demo product information for this college project. Verify exact configurations and current prices with the seller.</p>
  </main>;
}
