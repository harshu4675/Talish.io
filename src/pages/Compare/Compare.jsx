import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import ComparisonTable from "../../components/ComparisonTable/ComparisonTable";
import "./Compare.css";

function Compare() {
  const [searchParams] = useSearchParams();
  const { products, categories } = useProducts();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const productIds = searchParams.get("products");
    if (productIds) {
      const ids = productIds.split(",");
      const preSelected = products.filter((p) => ids.includes(p.id));
      setSelectedProducts(preSelected);
    }
  }, [searchParams, products]);

  const handleAddProduct = (productId) => {
    if (selectedProducts.length >= 4) {
      alert("You can compare up to 4 products at a time");
      return;
    }

    const product = products.find((p) => p.id === productId);
    if (product && !selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  };

  const handleClearAll = () => {
    setSelectedProducts([]);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const notSelected = !selectedProducts.find((sp) => sp.id === p.id);
    return matchesCategory && matchesSearch && notSelected;
  });

  return (
    <div className="compare-page">
      {/* Header */}
      <div className="compare-header">
        <div className="container">
          <h1>
            Compare <span>Products</span>
          </h1>
          <p>Select up to 4 products to compare side by side</p>
        </div>
      </div>

      <div className="container">
        <div className="compare-layout">
          {/* Sidebar */}
          <aside className="compare-sidebar">
            <div className="sidebar-card">
              <h3>Add Products</h3>

              {/* Search */}
              <div className="sidebar-search">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="sidebar-filter">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product List */}
              <div className="product-select-list">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="product-select-item">
                      <img src={product.image} alt={product.name} />
                      <div className="select-item-info">
                        <span className="select-item-brand">
                          {product.brand}
                        </span>
                        <span className="select-item-name">
                          {product.shortName || product.name}
                        </span>
                        <span className="select-item-price">
                          ${product.price?.toFixed(2)}
                        </span>
                      </div>
                      <button
                        className="add-btn"
                        onClick={() => handleAddProduct(product.id)}
                        disabled={selectedProducts.length >= 4}
                        title="Add to comparison"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-products-message">
                    {products.length === 0
                      ? "No products available. Add products from the admin dashboard."
                      : "No products match your search."}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="compare-main">
            {/* Selected Products Bar */}
            {selectedProducts.length > 0 && (
              <div className="selected-bar">
                <div className="selected-info">
                  <span>
                    {selectedProducts.length} product
                    {selectedProducts.length !== 1 ? "s" : ""} selected
                  </span>
                  <button className="clear-btn" onClick={handleClearAll}>
                    Clear All
                  </button>
                </div>
                <div className="selected-chips">
                  {selectedProducts.map((product) => (
                    <div key={product.id} className="selected-chip">
                      <img src={product.image} alt={product.name} />
                      <span>{product.shortName || product.name}</span>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        title="Remove"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparison Table or Placeholder */}
            {selectedProducts.length >= 2 ? (
              <ComparisonTable products={selectedProducts} />
            ) : (
              <div className="compare-placeholder">
                <div className="placeholder-icon">⚖️</div>
                <h2>Select Products to Compare</h2>
                <p>
                  Choose at least 2 products from the sidebar to see a detailed
                  comparison
                </p>
                <div className="placeholder-hint">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  <span>
                    Tip: Compare products in the same category for the best
                    results
                  </span>
                </div>
                {products.length === 0 && (
                  <Link
                    to="/admin/dashboard"
                    className="btn btn-primary"
                    style={{ marginTop: "24px" }}
                  >
                    Add Products First
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

export default Compare;
