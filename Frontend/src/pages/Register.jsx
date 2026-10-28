import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Laptop } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form,setForm] = useState({name:"",email:"",password:""});
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  async function submit(e) {
    e.preventDefault(); setLoading(true); setError("");
    try { const {data}=await api.post("/auth/register",form); signIn(data); navigate("/"); }
    catch(err) { setError(err.response?.data?.message || "Registration failed. Check your connection."); }
    finally { setLoading(false); }
  }
  return <main className="auth-page"><form className="auth-card" onSubmit={submit}><Link to="/" className="brand auth-brand"><span className="brand-mark"><Laptop size={20}/></span> laptopwise</Link><p className="eyebrow">GET STARTED</p><h1>Create your account.</h1><p className="auth-sub">Save favourites and revisit your recommendations.</p><label>Your name<input required maxLength="60" autoComplete="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email address<input type="email" required autoComplete="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Password<input type="password" minLength="8" required autoComplete="new-password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><small className="field-hint">Use at least 8 characters.</small></label>{error&&<p className="error-state">{error}</p>}<button className="btn btn-dark full-width" disabled={loading}>{loading?"Creating account…":"Create account"}</button><p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p></form></main>;
}
