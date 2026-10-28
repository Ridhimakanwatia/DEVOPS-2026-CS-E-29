import React from 'react';
import { Link } from "react-router-dom";
import { ArrowUpRight, Star } from "lucide-react";

export function LaptopCard({ laptop, score, reasons }) {
  return (
    <article className="laptop-card">
      <div className="laptop-visual">
        <div className="device-placeholder"><span>{laptop.brand}</span><strong>{laptop.model}</strong><small>{laptop.processor}</small></div>
        {score != null && <span className="score-pill">{score}% match</span>}
      </div>
      <div className="laptop-card-body">
        <div className="card-topline"><span className="eyebrow">{laptop.brand} · {laptop.type}</span><span className="rating"><Star size={14} fill="currentColor"/> {laptop.rating}</span></div>
        <h3>{laptop.model}</h3>
        <p className="price">₹{Number(laptop.price).toLocaleString("en-IN")}</p>
        <div className="spec-chips"><span>{laptop.ram} GB RAM</span><span>{laptop.storage} GB SSD</span><span>{laptop.gpu}</span></div>
        {reasons?.length > 0 && <p className="match-reason">{reasons[0]}</p>}
        <Link className="card-link" to={`/laptops/${laptop._id}`}>View details <ArrowUpRight size={16}/></Link>
      </div>
    </article>
  );
}
