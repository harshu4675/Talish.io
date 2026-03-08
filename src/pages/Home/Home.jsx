import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import HeroSection from "../../components/HeroSection/HeroSection";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import CategorySection from "../../components/CategorySection/CategorySection";

import "./Home.css";

function Home() {
  const { products, getFeaturedProducts, getDealProducts } = useProducts();

  const featuredProducts = getFeaturedProducts().slice(0, 8);
  const dealProducts = getDealProducts().slice(0, 3);

  return (
    <div className="home-page">
      <HeroSection />

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                Featured <span>Products</span>
              </h2>
              <p className="section-subtitle">Hand-picked by our expert team</p>
            </div>
            <Link to="/products" className="btn btn-secondary">
              View All
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} />
          ) : (
            <div className="empty-section">
              <div className="empty-icon">✨</div>
              <h3>No Featured Products Yet</h3>
              <p>
                Add products and mark them as featured in the admin dashboard
              </p>
              <Link to="/admin/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <CategorySection />

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="container">
          <div className="section-header center">
            <div>
              <h2 className="section-title">
                Why Choose <span>Talish.io</span>
              </h2>
              <p className="section-subtitle">
                We're committed to helping you make the best tech decisions
              </p>
            </div>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4 12 14.01l-3-3" />
                </svg>
              </div>
              <h3>Expert Reviews</h3>
              <p>
                In-depth analysis by tech enthusiasts who actually use the
                products
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Trusted Recommendations</h3>
              <p>Honest opinions with no hidden agendas or paid placements</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </div>
              <h3>Best Deals</h3>
              <p>
                We track prices and find the best discounts across retailers
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <h3>Easy Comparisons</h3>
              <p>Compare products side-by-side to find your perfect match</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-bg"></div>
            <div className="newsletter-content">
              <div className="newsletter-icon">📧</div>
              <h2>Get the Best Deals in Your Inbox</h2>
              <p>
                Subscribe to our newsletter for exclusive deals, new product
                alerts, and tech tips.
              </p>
              <form
                className="newsletter-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
              <p className="newsletter-note">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
