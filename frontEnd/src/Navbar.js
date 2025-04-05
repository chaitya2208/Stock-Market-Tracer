import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="nav-item">Dashboard</Link>
        <Link to="/dashboard/watchlist" className="nav-item">Stock</Link>
        <Link to="/dashboard/portfolio" className="nav-item">Portfolio</Link>
        <Link to="#" className="nav-item">Our community</Link>
        <Link to="#" className="nav-item">Profile</Link>
        <Link to="#" className="nav-item">Contact Us</Link>
        <a onClick={() => navigate("/login")} className="nav-item">Logout</a>
      </nav>
    </aside>
  );
}

export default Navbar;
