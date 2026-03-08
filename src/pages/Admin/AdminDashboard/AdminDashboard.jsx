import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useProducts } from "../../../context/ProductContext";
import Modal from "../../../components/Modal/Modal";
import ProductForm from "../ProductForm/ProductForm";
import "./AdminDashboard.css";

function AdminDashboard() {
  const { admin, logout } = useAuth();
  const { products, categories, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId);
    setDeleteConfirm(null);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalProducts: products.length,
    featuredProducts: products.filter((p) => p.isFeatured).length,
    dealProducts: products.filter((p) => p.isDeal).length,
    categories: categories.length,
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-info">
            <h1>Dashboard</h1>
            <p>Welcome back, {admin?.name || "Admin"}</p>
          </div>
          <div className="header-actions">
            <button onClick={handleAddProduct} className="btn btn-primary">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Product
            </button>
            <button onClick={handleLogout} className="btn btn-secondary">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16,17 21,12 16,7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon stat-icon-primary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.totalProducts}</span>
              <span className="stat-label">Total Products</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-warning">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.featuredProducts}</span>
              <span className="stat-label">Featured</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-danger">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.dealProducts}</span>
              <span className="stat-label">Active Deals</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-success">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.categories}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <section className="products-section">
          <div className="section-header">
            <h2>Products</h2>
            <div className="filters">
              <div className="search-wrapper">
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
                  className="search-input"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-products">
              <div className="empty-icon">📦</div>
              <h3>No Products Found</h3>
              <p>
                {products.length === 0
                  ? "Get started by adding your first product"
                  : "Try adjusting your search or filters"}
              </p>
              {products.length === 0 && (
                <button onClick={handleAddProduct} className="btn btn-primary">
                  Add Your First Product
                </button>
              )}
            </div>
          ) : (
            <div className="products-table-wrapper">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="product-cell">
                          <img src={product.image} alt={product.name} />
                          <div>
                            <span className="product-name">
                              {product.shortName || product.name}
                            </span>
                            <span className="product-brand">
                              {product.brand}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="category-badge">
                          {categories.find((c) => c.id === product.category)
                            ?.name || product.category}
                        </span>
                      </td>
                      <td>
                        <div className="price-cell">
                          <span className="current-price">
                            ${product.price?.toFixed(2)}
                          </span>
                          {product.discount > 0 && (
                            <span className="discount-badge">
                              -{product.discount}%
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="status-badges">
                          {product.isFeatured && (
                            <span className="status featured">Featured</span>
                          )}
                          {product.isDeal && (
                            <span className="status deal">Deal</span>
                          )}
                          {!product.isFeatured && !product.isDeal && (
                            <span className="status normal">Active</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="action-btn edit"
                            title="Edit"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(product.id)}
                            className="action-btn delete"
                            title="Delete"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="3,6 5,6 21,6" />
                              <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
                            </svg>
                          </button>
                          {product.amazonUrl && (
                            <a
                              href={product.amazonUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="action-btn amazon"
                              title="View on Amazon"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15,3 21,3 21,9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Edit Product" : "Add New Product"}
        size="lg"
      >
        <ProductForm
          product={editingProduct}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Product"
        size="sm"
      >
        <div className="delete-confirm">
          <div className="delete-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <p>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
          <div className="delete-actions">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteProduct(deleteConfirm)}
              className="btn btn-danger"
            >
              Delete Product
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
