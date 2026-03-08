import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import "./ProductCard.css";

function ProductCard({ product }) {
  const {
    id,
    name,
    shortName,
    price,
    originalPrice,
    discount,
    rating,
    reviewCount,
    image,
    brand,
    badge,
    amazonUrl,
  } = product;

  const handleAmazonClick = (e) => {
    e.preventDefault();
    if (amazonUrl) {
      window.open(amazonUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article className="product-card">
      {badge && <span className="product-badge">{badge}</span>}
      {discount > 0 && <span className="product-discount">-{discount}%</span>}

      <Link to={`/product/${id}`} className="product-image-link">
        <div className="product-image-wrapper">
          <img
            src={image}
            alt={name}
            className="product-image"
            loading="lazy"
          />
          <div className="product-overlay">
            <span className="view-btn">View Details</span>
          </div>
        </div>
      </Link>

      <div className="product-content">
        <span className="product-brand">{brand}</span>
        <Link to={`/product/${id}`}>
          <h3 className="product-title">{shortName || name}</h3>
        </Link>

        <Rating
          value={rating || 0}
          reviewCount={reviewCount || 0}
          size="small"
        />

        <div className="product-pricing">
          <span className="product-price">₹{price?.toFixed(2)}</span>
          {originalPrice && originalPrice > price && (
            <span className="product-original-price">
              ₹{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAmazonClick}
          className="btn btn-amazon product-btn"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
          Buy on Amazon
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
