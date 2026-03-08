import React from "react";
import Rating from "../Rating/Rating";
import "./ComparisonTable.css";

function ComparisonTable({ products }) {
  if (!products || products.length < 2) {
    return (
      <div className="comparison-empty">
        <div className="empty-icon">⚖️</div>
        <h3>Select Products to Compare</h3>
        <p>Choose at least 2 products from the sidebar</p>
      </div>
    );
  }

  const specKeys = products[0]?.specifications
    ? Object.keys(products[0].specifications)
    : [];

  const handleAmazonClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="comparison-wrapper">
      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="sticky-col">Feature</th>
              {products.map((product) => (
                <th key={product.id} className="product-header">
                  <div className="compare-product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="compare-product-image"
                    />
                  </div>
                  <span className="compare-product-name">
                    {product.shortName || product.name}
                  </span>
                  {product.badge && (
                    <span className="compare-badge">{product.badge}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="sticky-col">Price</td>
              {products.map((product) => (
                <td key={product.id}>
                  <div className="compare-price">
                    <span className="price-current">
                      ${product.price?.toFixed(2)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="price-original">
                        ${product.originalPrice?.toFixed(2)}
                      </span>
                    )}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="sticky-col">Rating</td>
              {products.map((product) => (
                <td key={product.id}>
                  <Rating
                    value={product.rating || 0}
                    reviewCount={product.reviewCount}
                    size="small"
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="sticky-col">Brand</td>
              {products.map((product) => (
                <td key={product.id}>{product.brand}</td>
              ))}
            </tr>
            {specKeys.map((key) => (
              <tr key={key}>
                <td className="sticky-col">{key}</td>
                {products.map((product) => (
                  <td key={product.id}>
                    {product.specifications?.[key] || "—"}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="pros-row">
              <td className="sticky-col">Pros</td>
              {products.map((product) => (
                <td key={product.id}>
                  <ul className="compare-list compare-pros">
                    {product.pros?.slice(0, 3).map((pro, index) => (
                      <li key={index}>
                        <span className="list-icon success">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr className="cons-row">
              <td className="sticky-col">Cons</td>
              {products.map((product) => (
                <td key={product.id}>
                  <ul className="compare-list compare-cons">
                    {product.cons?.slice(0, 3).map((con, index) => (
                      <li key={index}>
                        <span className="list-icon danger">✕</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr className="action-row">
              <td className="sticky-col"></td>
              {products.map((product) => (
                <td key={product.id}>
                  <button
                    onClick={() => handleAmazonClick(product.amazonUrl)}
                    className="btn btn-amazon"
                  >
                    Buy on Amazon
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComparisonTable;
