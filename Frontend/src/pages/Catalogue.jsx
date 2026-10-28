
import React from 'react';
import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import api from "../services/api";
import { LaptopCard } from "../components/LaptopCard";

export default function Catalogue() {
  const [filters, setFilters] = useState({ search:"", brand:"", type:"", ram:"", maxPrice:"", sort:"rating" });
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  function update(key, value) { setFilters(prev => ({...prev, [key]:value})); }
  useEffect(() => {
    let active = true;
    setLoading(true); setError("");
    const params = Object.fromEntries(Object.entries(filters).filter(([,v]) => v !== ""));
    api.get("/laptops", {params}).then(({data}) => { if(active) setLaptops(data.laptops); })
      .catch(() => { if(active) setError("Couldn't load laptops. Check that the backend and MongoDB are running."); })
      .finally(() => { if(active) setLoading(false); });
    return () => { active = false; };
  }, [filters]);
  return <main className="section-wrap page-section">
    <div className="page-heading"><p className="eyebrow">THE CATALOGUE</p><h1>Explore laptops</h1><p>Compare the details that matter before making a decision.</p></div>
    <div className="catalogue-toolbar"><label className="search-box"><Search size={18}/><input value={filters.search} onChange={e=>update("search",e.target.value)} placeholder="Search brand, model or processor"/></label><span className="result-count">{laptops.length} results</span></div>
    <div className="catalogue-layout">
      <aside className="filter-panel"><h3><SlidersHorizontal size={17}/> Filters</h3>
        <label>Brand<select value={filters.brand} onChange={e=>update("brand",e.target.value)}><option value="">All brands</option>{["Lenovo","ASUS","HP","Acer","Apple","Dell","MSI"].map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Laptop type<select value={filters.type} onChange={e=>update("type",e.target.value)}><option value="">All types</option>{["Student","Gaming","Creator","Business","Everyday"].map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Minimum RAM<select value={filters.ram} onChange={e=>update("ram",e.target.value)}><option value="">Any RAM</option><option value="8">8 GB or more</option><option value="16">16 GB or more</option><option value="32">32 GB or more</option></select></label>
        <label>Maximum budget<select value={filters.maxPrice} onChange={e=>update("maxPrice",e.target.value)}><option value="">Any price</option><option value="40000">₹40,000</option><option value="60000">₹60,000</option><option value="80000">₹80,000</option><option value="100000">₹1,00,000</option></select></label>
        <label>Sort by<select value={filters.sort} onChange={e=>update("sort",e.target.value)}><option value="rating">Top rated</option><option value="priceAsc">Price: low to high</option><option value="priceDesc">Price: high to low</option></select></label>
        <button className="btn btn-outline full-width" onClick={()=>setFilters({search:"",brand:"",type:"",ram:"",maxPrice:"",sort:"rating"})}>Clear filters</button>
      </aside>
      <div className="catalogue-results">{loading ? <div className="empty-state">Loading laptops…</div> : error ? <div className="error-state">{error}</div> : laptops.length ? <div className="laptop-grid">{laptops.map(l=><LaptopCard key={l._id} laptop={l}/>)}</div> : <div className="empty-state">No laptops match these filters. Try changing your budget or filters.</div>}</div>
    </div>
  </main>;
}
