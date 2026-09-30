import { useState } from "react";
import {
  Smartphone,
  Upload,
  Tag,
  Boxes,
  IndianRupee,
  Percent,
  FileText,
  ChevronDown,
} from "lucide-react";

import "../CSS/AddProducts.css";

function AddProducts() {
  const [activeTab, setActiveTab] = useState("single");

  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    category: "",
    sellingPrice: "",
    originalPrice: "",
    gst: "18% GST (Default)",
    stockQuantity: "",
    minOrderQuantity: "1",
    maxOrderQuantity: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Product Data:", formData);
  };

  return (
    <section className="add-products-page">
      {/* Page Header */}
      <div className="add-products-header">
        <div className="add-products-title-row">
          <Smartphone size={18} strokeWidth={1.8} />

          <div>
            <h1>Add Electronics Accessories</h1>

            <p>
              Add mobile &amp; tech accessories via single or bulk upload
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="add-products-tabs">
        <button
          type="button"
          className={`add-products-tab ${
            activeTab === "single" ? "active" : ""
          }`}
          onClick={() => setActiveTab("single")}
        >
          <Tag size={15} strokeWidth={1.8} />
          <span>Single Product</span>
        </button>

        <button
          type="button"
          className={`add-products-tab ${
            activeTab === "bulk" ? "active" : ""
          }`}
          onClick={() => setActiveTab("bulk")}
        >
          <Upload size={15} strokeWidth={1.8} />
          <span>Bulk Upload (Excel/CSV)</span>
        </button>
      </div>

      {/* Single Product */}
      {activeTab === "single" && (
        <form
          className="add-products-card"
          onSubmit={handleSubmit}
        >
          <h2>Product Details</h2>

          {/* Product Name + Brand */}
          <div className="add-products-grid">
            <div className="add-products-field">
              <label htmlFor="productName">
                PRODUCT NAME <span>*</span>
              </label>

              <div className="add-products-input-wrapper">
                <Tag size={15} />

                <input
                  id="productName"
                  name="productName"
                  type="text"
                  placeholder="e.g. USB-C Fast Charging Cable"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="add-products-field">
              <label htmlFor="brand">
                BRAND
              </label>

              <div className="add-products-input-wrapper">
                <Tag size={15} />

                <input
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="e.g. Anker, boAt, Spigen"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="add-products-field">
            <label htmlFor="category">
              CATEGORY <span>*</span>
            </label>

            <div className="add-products-input-wrapper select-wrapper">
              <Boxes size={15} />

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select category
                </option>
                <option value="mobile-accessories">
                  Mobile Accessories
                </option>
                <option value="charging">
                  Charging
                </option>
                <option value="audio">
                  Audio
                </option>
                <option value="cables">
                  Cables
                </option>
                <option value="cases">
                  Cases &amp; Covers
                </option>
              </select>

              <ChevronDown
                className="add-products-select-icon"
                size={15}
              />
            </div>
          </div>

          {/* Selling + Original Price */}
          <div className="add-products-grid">
            <div className="add-products-field">
              <label htmlFor="sellingPrice">
                SELLING PRICE (₹) <span>*</span>
              </label>

              <div className="add-products-input-wrapper">
                <IndianRupee size={15} />

                <input
                  id="sellingPrice"
                  name="sellingPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="add-products-field">
              <label htmlFor="originalPrice">
                ORIGINAL PRICE / MRP (₹)
              </label>

              <div className="add-products-input-wrapper">
                <IndianRupee size={15} />

                <input
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.originalPrice}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* GST */}
          <div className="add-products-field add-products-half-field">
            <label htmlFor="gst">
              GST SLAB(%)
            </label>

            <div className="add-products-input-wrapper select-wrapper">
              <Percent size={15} />

              <select
                id="gst"
                name="gst"
                value={formData.gst}
                onChange={handleChange}
              >
                <option value="0% GST">
                  0% GST
                </option>
                <option value="5% GST">
                  5% GST
                </option>
                <option value="12% GST">
                  12% GST
                </option>
                <option value="18% GST (Default)">
                  18% GST (Default)
                </option>
                <option value="28% GST">
                  28% GST
                </option>
              </select>

              <ChevronDown
                className="add-products-select-icon"
                size={15}
              />
            </div>
          </div>

          {/* Stock + Minimum Order */}
          <div className="add-products-grid">
            <div className="add-products-field">
              <label htmlFor="stockQuantity">
                STOCK QUANTITY <span>*</span>
              </label>

              <div className="add-products-input-wrapper">
                <Boxes size={15} />

                <input
                  id="stockQuantity"
                  name="stockQuantity"
                  type="number"
                  min="0"
                  placeholder="e.g. 50"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="add-products-field">
              <label htmlFor="minOrderQuantity">
                MIN ORDER QUANTITY
              </label>

              <div className="add-products-input-wrapper">
                <Boxes size={15} />

                <input
                  id="minOrderQuantity"
                  name="minOrderQuantity"
                  type="number"
                  min="1"
                  value={formData.minOrderQuantity}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Maximum Order */}
          <div className="add-products-field add-products-half-field">
            <label htmlFor="maxOrderQuantity">
              MAX ORDER QUANTITY
            </label>

            <div className="add-products-input-wrapper">
              <Boxes size={15} />

              <input
                id="maxOrderQuantity"
                name="maxOrderQuantity"
                type="number"
                min="1"
                placeholder="No limit (optional)"
                value={formData.maxOrderQuantity}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
          <div className="add-products-field">
            <label htmlFor="description">
              DESCRIPTION
            </label>

            <div className="add-products-textarea-wrapper">
              <FileText size={15} />

              <textarea
                id="description"
                name="description"
                placeholder="Brief product description..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="add-products-actions">
            <button
              type="submit"
              className="add-products-submit"
            >
              Add Product
            </button>
          </div>
        </form>
      )}

      {/* Bulk Upload */}
      {activeTab === "bulk" && (
        <div className="add-products-card add-products-bulk">
          <Upload size={28} />

          <h2>Bulk Upload Products</h2>

          <p>
            Upload your products using an Excel or CSV file.
          </p>

          <button
            type="button"
            className="add-products-upload-button"
          >
            <Upload size={15} />
            Upload Excel / CSV
          </button>
        </div>
      )}
    </section>
  );
}

export default AddProducts;