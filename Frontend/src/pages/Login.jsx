import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Laptop } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form,setForm] = useState({email:"",password:""});
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  async function submit(e) {
    e.preventDefault(); setLoading(true); setError("");
    try { const {data}=await api.post("/auth/login",form); signIn(data); navigate("/"); }
    catch(err) { setError(err.response?.data?.message || "Login failed. Check your connection."); }
    finally { setLoading(false); }
  }
  return <main className="auth-page"><form className="auth-card" onSubmit={submit}><Link to="/" className="brand auth-brand"><span className="brand-mark"><Laptop size={20}/></span> laptopwise</Link><p className="eyebrow">WELCOME BACK</p><h1>Good to see you.</h1><p className="auth-sub">Log in to keep your laptop shortlist close.</p><label>Email address<input type="email" required autoComplete="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Password<input type="password" required autoComplete="current-password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>{error&&<p className="error-state">{error}</p>}<button className="btn btn-dark full-width" disabled={loading}>{loading?"Logging in…":"Log in"}</button><p className="auth-switch">New to LaptopWise? <Link to="/register">Create an account</Link></p></form></main>;
}
