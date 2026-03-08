import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

function ProductGrid({
  products,
  title,
  subtitle,
  emptyMessage = "No products found",
}) {
  if (products.length === 0) {
    return (
      <section className="product-grid-section">
        {title && (
          <div className="section-header">
            <div>
              <h2 className="section-title">{title}</h2>
              {subtitle && <p className="section-subtitle">{subtitle}</p>}
            </div>
          </div>
        )}
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>{emptyMessage}</h3>
          <p>Check back later for new products</p>
        </div>
      </section>
    );
  }

  return (
    <section className="product-grid-section">
      {title && (
        <div className="section-header">
          <div>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        </div>
      )}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
