import React from "react";
import "./Header.css";
import logo from "./assets/bull-logo.jpg";

function Header() {
  return (
    <header className="dashboard-header">
      <div className="logo">BullsEye</div>
      <input type="text" placeholder="Search..." className="search-input" />
      <div className="profile-icon">
        <img src={logo} alt="Bull-logo" />
      </div>
    </header>
  );
}

export default Header;