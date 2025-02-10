import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🏥 Hospital Management
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/register-patient">
                ➕ Register Patient
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/patients">
                📋 Patient List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/register-opd">
                🏥 Register OPD
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/opd-list">
                📑 OPD List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/register-prescription">
                💊 Register Prescription
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/prescriptions">
                📜 Prescription List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
