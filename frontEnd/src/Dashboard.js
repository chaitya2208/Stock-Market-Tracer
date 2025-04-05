import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <Navbar />
        <div className="content-area">
          <Outlet />  {/* Nested routes will render here */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;


