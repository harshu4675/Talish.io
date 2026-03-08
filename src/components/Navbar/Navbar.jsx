import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/compare", label: "Compare" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <span className="logo-letter">T</span>
          </div>
          <span className="brand-text">
            Talish<span className="brand-dot">.</span>
            <span className="brand-io">io</span>
          </span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? "is-open" : ""}`}>
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`navbar-link ${location.pathname === link.path ? "active" : ""}`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="link-badge">{link.badge}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-menu-actions">
            {isAuthenticated ? (
              <>
                <Link to="/admin/dashboard" className="btn btn-primary btn-sm">
                  Dashboard
                </Link>
                <button onClick={logout} className="btn btn-secondary btn-sm">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/admin/login" className="btn btn-secondary btn-sm">
                Admin
              </Link>
            )}
          </div>
        </div>

        <div className="navbar-actions">
          {isAuthenticated && (
            <Link to="/admin/dashboard" className="admin-indicator">
              <span className="admin-dot"></span>
              Admin
            </Link>
          )}

          <button
            className={`menu-toggle ${isMenuOpen ? "is-open" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="navbar-overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </nav>
  );
}

export default Navbar;
