import React, { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Products.css";

function Products() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const { products, categories } = useProducts();

  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Reset filters when category changes
  useEffect(() => {
    setPriceRange("all");
  }, [category]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query),
      );
    }

    // Filter by price range
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter((p) => {
        if (max) {
          return p.price >= min && p.price <= max;
        }
        return p.price >= min;
      });
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "discount":
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        filtered.sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0),
        );
    }

    return filtered;
  }, [products, category, searchQuery, sortBy, priceRange]);

  const getCategoryName = () => {
    if (category) {
      const cat = categories.find((c) => c.id === category);
      return cat ? cat.name : "Products";
    }
    return searchQuery ? `Results for "${searchQuery}"` : "All Products";
  };

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-50", label: "Under ₹50" },
    { value: "50-100", label: "₹50 - ₹100" },
    { value: "100-300", label: "₹100 - ₹300" },
    { value: "300-500", label: "₹300 - ₹500" },
    { value: "500-1000", label: "₹500 - ₹1,000" },
    { value: "1000-", label: "Over ₹1,000" },
  ];

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <div className="container">
          <div className="header-content">
            <div>
              <nav className="breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/products">Products</Link>
                {category && (
                  <>
                    <span>/</span>
                    <span>{getCategoryName()}</span>
                  </>
                )}
              </nav>
              <h1>{getCategoryName()}</h1>
              <p>
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <div className="header-search">
              <SearchBar compact />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="products-layout">
          {/* Sidebar */}
          <aside className={`products-sidebar ${showFilters ? "show" : ""}`}>
            <div className="sidebar-header">
              <h3>Filters</h3>
              <button
                className="close-filters"
                onClick={() => setShowFilters(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Categories Filter */}
            <div className="filter-section">
              <h4>Categories</h4>
              <ul className="filter-list">
                <li>
                  <Link
                    to="/products"
                    className={`filter-link ${!category ? "active" : ""}`}
                  >
                    <span className="filter-icon">📦</span>
                    <span>All Products</span>
                    <span className="filter-count">{products.length}</span>
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      to={`/products/${cat.id}`}
                      className={`filter-link ${category === cat.id ? "active" : ""}`}
                    >
                      <span className="filter-icon">{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className="filter-count">{cat.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range Filter */}
            <div className="filter-section">
              <h4>Price Range</h4>
              <ul className="filter-list">
                {priceRanges.map((range) => (
                  <li key={range.value}>
                    <button
                      className={`filter-btn ${priceRange === range.value ? "active" : ""}`}
                      onClick={() => setPriceRange(range.value)}
                    >
                      {range.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Filters Button (Mobile) */}
            <div className="apply-filters">
              <button
                className="btn btn-primary"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {showFilters && (
            <div
              className="sidebar-overlay"
              onClick={() => setShowFilters(false)}
            ></div>
          )}

          {/* Main Content */}
          <main className="products-main">
            {/* Toolbar */}
            <div className="products-toolbar">
              <button
                className="filter-toggle"
                onClick={() => setShowFilters(true)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
                Filters
              </button>

              <div className="sort-wrapper">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Best Discount</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <div className="no-products-icon">🔍</div>
                <h3>No Products Found</h3>
                <p>
                  {products.length === 0
                    ? "No products have been added yet. Add products from the admin dashboard."
                    : "Try adjusting your filters or search query"}
                </p>
                {products.length === 0 && (
                  <Link to="/admin/dashboard" className="btn btn-primary">
                    Add Products
                  </Link>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Products;
