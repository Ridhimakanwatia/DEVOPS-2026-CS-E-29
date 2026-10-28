import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Recommend from "./pages/Recommend";
import LaptopDetails from "./pages/LaptopDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";

function Layout({ children }) {
  return <><Navbar/>{children}<footer className="site-footer"><div className="footer-inner"><span className="brand"><span className="brand-mark">LW</span> laptopwise</span><span>Built as a student project · Compare thoughtfully.</span></div></footer></>;
}

export default function App() {
  return <AuthProvider><BrowserRouter><Routes>
    <Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
    <Route path="*" element={<Layout><Routes>
      <Route path="/" element={<Home/>}/><Route path="/catalogue" element={<Catalogue/>}/><Route path="/recommend" element={<Recommend/>}/><Route path="/laptops/:id" element={<LaptopDetails/>}/>
    </Routes></Layout>}/>
  </Routes></BrowserRouter></AuthProvider>;
}
