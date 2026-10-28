import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { Laptop, LogOut, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, signOut } = useAuth();
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link className="brand" to="/"><span className="brand-mark"><Laptop size={20}/></span> laptopwise</Link>
        <nav>
          <NavLink to="/catalogue">Explore laptops</NavLink>
          <NavLink to="/recommend">Find my laptop</NavLink>
        </nav>
        <div className="nav-actions">
          {user ? <><span className="welcome"><UserRound size={16}/> {user.name}</span><button className="btn btn-quiet btn-small" onClick={signOut}><LogOut size={15}/> Sign out</button></> :
            <><Link className="login-link" to="/login">Log in</Link><Link className="btn btn-dark btn-small" to="/register">Create account</Link></>}
        </div>
      </div>
    </header>
  );
}
