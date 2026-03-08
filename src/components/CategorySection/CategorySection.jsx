import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import "./CategorySection.css";

function CategorySection() {
  const { categories } = useProducts();

  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              Browse by <span>Category</span>
            </h2>
            <p className="section-subtitle">
              Find products in your favorite categories
            </p>
          </div>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products/${category.id}`}
              className="category-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="category-icon-wrapper">
                <span className="category-icon">{category.icon}</span>
                <div className="category-glow"></div>
              </div>
              <div className="category-content">
                <h3 className="category-name">{category.name}</h3>
                <span className="category-count">
                  {category.count} Products
                </span>
              </div>
              <div className="category-arrow">
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
