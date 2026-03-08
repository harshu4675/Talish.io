import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import SearchBar from "../SearchBar/SearchBar";
import "./HeroSection.css";

function HeroSection() {
  const { products } = useProducts();

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-gradient"></div>
        <div className="hero-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge animate-slideUp">
            <span className="badge-pulse"></span>
            <span>Trusted Amazon Service</span>
          </div>

          <h1 className="hero-title animate-slideUp">
            Discover the <span>Best </span> Products
          </h1>

          <p className="hero-description animate-slideUp">
            Expert reviews, honest comparisons, and exclusive deals on the
            latest gadgets. Make informed decisions with our comprehensive
            product analysis.
          </p>

          <div className="hero-search animate-slideUp">
            <SearchBar />
          </div>

          <div className="hero-stats animate-slideUp">
            <div className="stat-item">
              <span className="stat-number">{products.length}+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Updates</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Honest Reviews</span>
            </div>
          </div>

          <div className="hero-actions animate-slideUp">
            <Link to="/products" className="btn btn-primary btn-lg">
              Browse Products
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-cards">
            <div className="visual-card card-1">
              <div className="card-glow"></div>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
                alt="Headphones"
              />
              <div className="card-info">
                <span className="card-badge">Top Rated</span>
                <span className="card-name">Premium Audio</span>
              </div>
            </div>
            <div className="visual-card card-2">
              <div className="card-glow"></div>
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop"
                alt="Laptop"
              />
              <div className="card-info">
                <span className="card-badge">Best Seller</span>
                <span className="card-name">MacBook Pro</span>
              </div>
            </div>
            <div className="visual-card card-3">
              <div className="card-glow"></div>
              <img
                src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop"
                alt="Phone"
              />
              <div className="card-info">
                <span className="card-badge">New</span>
                <span className="card-name">Flagship Phone</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
