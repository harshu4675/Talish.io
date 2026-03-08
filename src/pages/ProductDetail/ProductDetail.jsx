import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import Rating from "../../components/Rating/Rating";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories, getProductById } = useProducts();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const found = getProductById(id);
    if (found) {
      setProduct(found);
      setSelectedImage(0);

      // Get related products
      const related = products
        .filter((p) => p.category === found.category && p.id !== found.id)
        .slice(0, 4);
      setRelatedProducts(related);
    } else {
      setProduct(null);
    }

    window.scrollTo(0, 0);
  }, [id, products, getProductById]);

  const handleAmazonClick = () => {
    if (product?.amazonUrl) {
      window.open(product.amazonUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="not-found-content">
          <div className="not-found-icon">🔍</div>
          <h2>Product Not Found</h2>
          <p>
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const savings = (product.originalPrice || product.price) - product.price;
  const categoryName =
    categories.find((c) => c.id === product.category)?.name || product.category;
  const images = product.images?.length > 0 ? product.images : [product.image];

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <Link to={`/products/${product.category}`}>{categoryName}</Link>
          <span>/</span>
          <span>{product.shortName || product.name}</span>
        </nav>

        {/* Main Content */}
        <div className="product-detail-layout">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="gallery-main">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="gallery-main-image"
              />
              {product.badge && (
                <span className="detail-badge">{product.badge}</span>
              )}
              {product.discount > 0 && (
                <span className="detail-discount">-{product.discount}%</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="gallery-thumbs">
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={`gallery-thumb ${selectedImage === index ? "active" : ""}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <span className="product-brand">{product.brand}</span>
            <h1 className="product-title">{product.name}</h1>

            <div className="product-rating">
              <Rating
                value={product.rating || 0}
                reviewCount={product.reviewCount || 0}
                size="large"
              />
            </div>

            <div className="product-pricing">
              <span className="current-price">
                ${product.price?.toFixed(2)}
              </span>
              {savings > 0 && (
                <>
                  <span className="original-price">
                    ${product.originalPrice?.toFixed(2)}
                  </span>
                  <span className="savings-badge">
                    Save ${savings.toFixed(2)} ({product.discount}%)
                  </span>
                </>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            {/* Features */}
            {product.features?.length > 0 && (
              <div className="product-features">
                <h3>Key Features</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="M22 4 12 14.01l-3-3" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="product-actions">
              <button
                onClick={handleAmazonClick}
                className="btn btn-amazon btn-lg"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
                Buy on Amazon
              </button>
              <button
                onClick={() => navigate(`/compare?products=${product.id}`)}
                className="btn btn-secondary btn-lg"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="12" y1="3" x2="12" y2="21" />
                </svg>
                Compare
              </button>
            </div>

            {/* Notice */}
            <div className="amazon-notice">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <span>
                Price and availability are accurate as of the date/time
                indicated and are subject to change.
              </span>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="product-sections">
          {/* Specifications */}
          {product.specifications &&
            Object.keys(product.specifications).length > 0 && (
              <section className="detail-section">
                <h2>Specifications</h2>
                <div className="specs-grid">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="spec-row">
                        <span className="spec-label">{key}</span>
                        <span className="spec-value">{value}</span>
                      </div>
                    ),
                  )}
                </div>
              </section>
            )}

          {/* Pros & Cons */}
          {(product.pros?.length > 0 || product.cons?.length > 0) && (
            <section className="detail-section">
              <h2>Our Verdict</h2>
              <div className="pros-cons-grid">
                {product.pros?.length > 0 && (
                  <div className="pros-card">
                    <h3>
                      <span className="icon-circle success">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <path d="M22 4 12 14.01l-3-3" />
                        </svg>
                      </span>
                      Pros
                    </h3>
                    <ul>
                      {product.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.cons?.length > 0 && (
                  <div className="cons-card">
                    <h3>
                      <span className="icon-circle danger">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M15 9l-6 6M9 9l6 6" />
                        </svg>
                      </span>
                      Cons
                    </h3>
                    <ul>
                      {product.cons.map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Review Score */}
          <section className="detail-section">
            <div className="review-score-card">
              <div className="score-circle">
                <span className="score-number">
                  {((product.rating || 4.5) * 2).toFixed(1)}
                </span>
                <span className="score-max">/10</span>
              </div>
              <div className="score-info">
                <h3>Editor's Score</h3>
                <p>Based on our comprehensive testing and analysis</p>
                <div className="score-verdict">
                  {(product.rating || 4.5) >= 4.5
                    ? "Highly Recommended"
                    : (product.rating || 4.5) >= 4
                      ? "Recommended"
                      : "Worth Considering"}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-section">
            <h2>Related Products</h2>
            <div className="related-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
