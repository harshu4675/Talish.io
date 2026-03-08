import React, { useState, useEffect } from "react";
import { useProducts } from "../../../context/ProductContext";
import "./ProductForm.css";

const initialFormState = {
  name: "",
  shortName: "",
  brand: "",
  category: "",
  price: "",
  originalPrice: "",
  discount: "",
  rating: "",
  reviewCount: "",
  image: "",
  amazonUrl: "",
  description: "",
  features: [""],
  specifications: {},
  pros: [""],
  cons: [""],
  isFeatured: false,
  isDeal: false,
  badge: "",
};

function ProductForm({ product, onSuccess, onCancel }) {
  const { addProduct, updateProduct, categories } = useProducts();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        ...initialFormState,
        ...product,
        price: product.price?.toString() || "",
        originalPrice: product.originalPrice?.toString() || "",
        discount: product.discount?.toString() || "",
        rating: product.rating?.toString() || "",
        reviewCount: product.reviewCount?.toString() || "",
        features: product.features?.length ? product.features : [""],
        pros: product.pros?.length ? product.pros : [""],
        cons: product.cons?.length ? product.cons : [""],
        specifications: product.specifications || {},
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addSpecification = () => {
    if (specKey.trim() && specValue.trim()) {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey.trim()]: specValue.trim(),
        },
      }));
      setSpecKey("");
      setSpecValue("");
    }
  };

  const removeSpecification = (key) => {
    setFormData((prev) => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return { ...prev, specifications: newSpecs };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.amazonUrl.trim())
      newErrors.amazonUrl = "Amazon URL is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice:
          parseFloat(formData.originalPrice) || parseFloat(formData.price),
        discount: parseInt(formData.discount) || 0,
        rating: parseFloat(formData.rating) || 4.5,
        reviewCount: parseInt(formData.reviewCount) || 0,
        features: formData.features.filter((f) => f.trim()),
        pros: formData.pros.filter((p) => p.trim()),
        cons: formData.cons.filter((c) => c.trim()),
      };

      if (product) {
        await updateProduct(product.id, productData);
      } else {
        await addProduct(productData);
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        {/* Basic Info */}
        <div className="form-section">
          <h3>Basic Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? "error" : ""}`}
                placeholder="e.g., Sony WH-1000XM5 Wireless Headphones"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Short Name</label>
              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Sony WH-1000XM5"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Brand *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className={`form-input ${errors.brand ? "error" : ""}`}
                placeholder="e.g., Sony"
              />
              {errors.brand && (
                <span className="form-error">{errors.brand}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`form-select ${errors.category ? "error" : ""}`}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="form-error">{errors.category}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-textarea ${errors.description ? "error" : ""}`}
              placeholder="Write a detailed description..."
              rows="4"
            />
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="form-section">
          <h3>Pricing & Rating</h3>

          <div className="form-row form-row-4">
            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`form-input ${errors.price ? "error" : ""}`}
                placeholder="99.99"
                step="0.01"
                min="0"
              />
              {errors.price && (
                <span className="form-error">{errors.price}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Original Price (₹)</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="form-input"
                placeholder="129.99"
                step="0.01"
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Discount (%)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="form-input"
                placeholder="20"
                min="0"
                max="100"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="form-input"
                placeholder="4.5"
                step="0.1"
                min="0"
                max="5"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Review Count</label>
            <input
              type="number"
              name="reviewCount"
              value={formData.reviewCount}
              onChange={handleChange}
              className="form-input"
              placeholder="1234"
              min="0"
            />
          </div>
        </div>

        {/* Media & Links */}
        <div className="form-section">
          <h3>Media & Links</h3>

          <div className="form-group">
            <label className="form-label">Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`form-input ${errors.image ? "error" : ""}`}
              placeholder="https://example.com/product-image.jpg"
            />
            {errors.image && <span className="form-error">{errors.image}</span>}
            {formData.image && (
              <div className="image-preview">
                <img
                  src={formData.image}
                  alt="Preview"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Amazon Affiliate URL *</label>
            <input
              type="url"
              name="amazonUrl"
              value={formData.amazonUrl}
              onChange={handleChange}
              className={`form-input ${errors.amazonUrl ? "error" : ""}`}
              placeholder="https://amazon.com/dp/XXXXXXX?tag=yourtag-20"
            />
            {errors.amazonUrl && (
              <span className="form-error">{errors.amazonUrl}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Badge (optional)</label>
            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Best Seller, Editor's Choice"
            />
          </div>
        </div>

        {/* Features */}
        <div className="form-section">
          <h3>Features</h3>
          {formData.features.map((feature, index) => (
            <div key={index} className="array-input-row">
              <input
                type="text"
                value={feature}
                onChange={(e) =>
                  handleArrayChange("features", index, e.target.value)
                }
                className="form-input"
                placeholder={`Feature ${index + 1}`}
              />
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("features", index)}
                  className="remove-btn"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("features")}
            className="add-btn"
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
            Add Feature
          </button>
        </div>

        {/* Specifications */}
        <div className="form-section">
          <h3>Specifications</h3>
          <div className="specs-list">
            {Object.entries(formData.specifications).map(([key, value]) => (
              <div key={key} className="spec-item">
                <span className="spec-key">{key}</span>
                <span className="spec-value">{value}</span>
                <button
                  type="button"
                  onClick={() => removeSpecification(key)}
                  className="remove-btn small"
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
          <div className="spec-input-row">
            <input
              type="text"
              value={specKey}
              onChange={(e) => setSpecKey(e.target.value)}
              className="form-input"
              placeholder="e.g., Battery Life"
            />
            <input
              type="text"
              value={specValue}
              onChange={(e) => setSpecValue(e.target.value)}
              className="form-input"
              placeholder="e.g., 30 hours"
            />
            <button
              type="button"
              onClick={addSpecification}
              className="add-btn"
            >
              Add
            </button>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="form-section">
          <h3>Pros</h3>
          {formData.pros.map((pro, index) => (
            <div key={index} className="array-input-row">
              <input
                type="text"
                value={pro}
                onChange={(e) =>
                  handleArrayChange("pros", index, e.target.value)
                }
                className="form-input"
                placeholder={`Pro ${index + 1}`}
              />
              {formData.pros.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("pros", index)}
                  className="remove-btn"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("pros")}
            className="add-btn"
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
            Add Pro
          </button>
        </div>

        <div className="form-section">
          <h3>Cons</h3>
          {formData.cons.map((con, index) => (
            <div key={index} className="array-input-row">
              <input
                type="text"
                value={con}
                onChange={(e) =>
                  handleArrayChange("cons", index, e.target.value)
                }
                className="form-input"
                placeholder={`Con ${index + 1}`}
              />
              {formData.cons.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("cons", index)}
                  className="remove-btn"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("cons")}
            className="add-btn"
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
            Add Con
          </button>
        </div>

        {/* Status */}
        <div className="form-section">
          <h3>Product Status</h3>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              <span className="checkbox-custom"></span>
              <span>Featured Product</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isDeal"
                checked={formData.isDeal}
                onChange={handleChange}
              />
              <span className="checkbox-custom"></span>
              <span>Active Deal</span>
            </label>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="btn-spinner"></span>
              Saving...
            </>
          ) : (
            <>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              {product ? "Update Product" : "Add Product"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
