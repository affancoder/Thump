import { useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  Power,
  Plus,
  Package,
  X,
  ImagePlus,
} from "lucide-react";

import "../CSS/ViewProducts.css";

const sampleProducts = [
  {
    id: 1,
    title: "Premium Wireless Earbuds",
    category: "Audio",
    company: "boAt",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
  {
    id: 2,
    title: "USB-C Fast Charging Cable",
    category: "Charging",
    company: "Anker",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
  {
    id: 3,
    title: "20W Fast Charger",
    category: "Charging",
    company: "Portronics",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
  {
    id: 4,
    title: "Magnetic Mobile Stand",
    category: "Accessories",
    company: "Spigen",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80",
    active: false,
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    category: "Audio",
    company: "JBL",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
  {
    id: 6,
    title: "Premium Phone Case",
    category: "Cases & Covers",
    company: "Spigen",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
  {
    id: 7,
    title: "Type-C Audio Adapter",
    category: "Cables",
    company: "boAt",
    price: 299,
    image:
      "https://imgs.search.brave.com/bXP40R0bJI-72ZRR5ahxlUWdQ6gDWhYjpQZk2NnvXgo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yb2Nz/dG9yLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNS8wOC9ZMTBBMjQ0LUIxLVVTQi1DJUMyJUFFLXRvLTMuNW1tLUF1ZGlvLUFkYXB0ZXIxLmpwZw",
    active: true,
  },
  {
    id: 8,
    title: "Smartphone Tripod",
    category: "Accessories",
    company: "Portronics",
    price: 1099,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    active: false,
  },
  {
    id: 9,
    title: "Wireless Charging Pad",
    category: "Charging",
    company: "Anker",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
];

function ViewProducts() {
  const [products, setProducts] = useState(sampleProducts);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    company: "",
    price: "",
    image: "",
  });

  /* =========================================
     SEARCH
  ========================================= */

  const filteredProducts = products.filter((product) => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return true;
    }

    return (
      product.title.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value) ||
      product.company.toLowerCase().includes(value)
    );
  });

  /* =========================================
     DELETE PRODUCT
  ========================================= */

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    setProducts((previousProducts) =>
      previousProducts.filter(
        (product) => product.id !== id
      )
    );
  };

  /* =========================================
     TOGGLE ACTIVE
  ========================================= */

  const handleToggleActive = (id) => {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              active: !product.active,
            }
          : product
      )
    );
  };

  /* =========================================
     EDIT PRODUCT
  ========================================= */

  const handleEdit = (product) => {
    console.log("Edit product:", product);
  };

  /* =========================================
     OPEN ADD PRODUCT MODAL
  ========================================= */

  const handleAddProduct = () => {
    setNewProduct({
      title: "",
      category: "",
      company: "",
      price: "",
      image: "",
    });

    setShowAddModal(true);
  };

  /* =========================================
     CLOSE ADD PRODUCT MODAL
  ========================================= */

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  /* =========================================
     NEW PRODUCT INPUT
  ========================================= */

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;

    setNewProduct((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================
     CREATE PRODUCT
  ========================================= */

  const handleCreateProduct = (event) => {
    event.preventDefault();

    if (
      !newProduct.title.trim() ||
      !newProduct.category.trim() ||
      !newProduct.company.trim() ||
      !newProduct.price
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const nextId =
      products.length > 0
        ? Math.max(
            ...products.map((product) => product.id)
          ) + 1
        : 1;

    const product = {
      id: nextId,

      title: newProduct.title.trim(),

      category: newProduct.category.trim(),

      company: newProduct.company.trim(),

      price: Number(newProduct.price),

      image:
        newProduct.image.trim() ||
        "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=800&q=80",

      active: true,
    };

    setProducts((previousProducts) => [
      product,
      ...previousProducts,
    ]);

    setShowAddModal(false);

    setNewProduct({
      title: "",
      category: "",
      company: "",
      price: "",
      image: "",
    });
  };

  /* =========================================
     IMAGE ERROR
  ========================================= */

  const handleImageError = (event) => {
    event.currentTarget.src =
      "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=800&q=80";
  };

  return (
    <section className="view-products-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="view-products-header">

        <div className="view-products-heading">

          <div className="view-products-heading-icon">
            <Package
              size={18}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h1>View Products</h1>

            <p>
              Manage all your products
            </p>
          </div>

        </div>

        <button
          type="button"
          className="view-products-add-button"
          onClick={handleAddProduct}
        >
          <Plus
            size={15}
            strokeWidth={2}
          />

          <span>Add Product</span>
        </button>

      </div>


      {/* =========================================
          SEARCH
      ========================================= */}

      <div className="view-products-toolbar">

        <div className="view-products-search">

          <Search
            size={15}
            strokeWidth={1.8}
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

        <div className="view-products-count">
          {filteredProducts.length} Products
        </div>

      </div>


      {/* =========================================
          PRODUCT GRID
      ========================================= */}

      <div className="view-products-grid">

        {filteredProducts.map((product) => (
          <article
            className="view-product-card"
            key={product.id}
          >

            {/* =====================================
                PRODUCT IMAGE
            ===================================== */}

            <div className="view-product-image-container">

              <img
                src={product.image}
                alt={product.title}
                className="view-product-image"
                onError={handleImageError}
              />

              <span
                className={`view-product-active-badge ${
                  product.active
                    ? "active"
                    : "inactive"
                }`}
              >
                {product.active
                  ? "Active"
                  : "Off"}
              </span>

            </div>


            {/* =====================================
                PRODUCT INFORMATION
            ===================================== */}

            <div className="view-product-content">

              <h2>
                {product.title}
              </h2>


              <div className="view-product-meta">

                <div>
                  <span>
                    Category
                  </span>

                  <strong>
                    {product.category}
                  </strong>
                </div>


                <div>
                  <span>
                    Company
                  </span>

                  <strong>
                    {product.company}
                  </strong>
                </div>

              </div>


              {/* ===================================
                  PRICE
              =================================== */}

              <div className="view-product-price">
                ₹
                {product.price.toLocaleString(
                  "en-IN"
                )}
              </div>


              {/* ===================================
                  ACTIONS
              =================================== */}

              <div className="view-product-actions">

                {/* EDIT */}

                <button
                  type="button"
                  className="view-product-edit"
                  onClick={() =>
                    handleEdit(product)
                  }
                >
                  <Pencil
                    size={13}
                    strokeWidth={1.8}
                  />

                  <span>
                    Edit
                  </span>
                </button>


                {/* DELETE */}

                <button
                  type="button"
                  className="view-product-delete"
                  onClick={() =>
                    handleDelete(product.id)
                  }
                >
                  <Trash2
                    size={13}
                    strokeWidth={1.8}
                  />

                  <span>
                    Delete
                  </span>
                </button>


                {/* ACTIVE / OFF */}

                <button
                  type="button"
                  className={`view-product-toggle ${
                    product.active
                      ? "active"
                      : "inactive"
                  }`}
                  onClick={() =>
                    handleToggleActive(
                      product.id
                    )
                  }
                >
                  <Power
                    size={13}
                    strokeWidth={1.8}
                  />

                  <span>
                    {product.active
                      ? "Active"
                      : "Off"}
                  </span>
                </button>

              </div>

            </div>

          </article>
        ))}

      </div>


      {/* =========================================
          EMPTY STATE
      ========================================= */}

      {filteredProducts.length === 0 && (
        <div className="view-products-empty">

          <Package
            size={32}
            strokeWidth={1.4}
          />

          <h3>
            No products found
          </h3>

          <p>
            Try searching for another product.
          </p>

        </div>
      )}


      {/* =========================================
          ADD PRODUCT MODAL
      ========================================= */}

      {showAddModal && (
        <div
          className="view-product-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              handleCloseAddModal();
            }
          }}
        >

          <div className="view-product-modal">

            {/* ===================================
                MODAL HEADER
            =================================== */}

            <div className="view-product-modal-header">

              <div className="view-product-modal-title">

                <div className="view-product-modal-icon">
                  <Package
                    size={18}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <h2>
                    Add New Product
                  </h2>

                  <p>
                    Create a new product listing.
                  </p>
                </div>

              </div>


              <button
                type="button"
                className="view-product-modal-close"
                onClick={
                  handleCloseAddModal
                }
                aria-label="Close"
              >
                <X
                  size={18}
                  strokeWidth={1.8}
                />
              </button>

            </div>


            {/* ===================================
                FORM
            =================================== */}

            <form
              className="view-product-modal-form"
              onSubmit={handleCreateProduct}
            >

              {/* PRODUCT TITLE */}

              <div className="view-product-form-group">

                <label>
                  Product Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter product title"
                  value={newProduct.title}
                  onChange={
                    handleNewProductChange
                  }
                  autoFocus
                />

              </div>


              {/* CATEGORY + COMPANY */}

              <div className="view-product-form-row">

                <div className="view-product-form-group">

                  <label>
                    Product Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    placeholder="e.g. Audio"
                    value={
                      newProduct.category
                    }
                    onChange={
                      handleNewProductChange
                    }
                  />

                </div>


                <div className="view-product-form-group">

                  <label>
                    Company
                  </label>

                  <input
                    type="text"
                    name="company"
                    placeholder="e.g. boAt"
                    value={
                      newProduct.company
                    }
                    onChange={
                      handleNewProductChange
                    }
                  />

                </div>

              </div>


              {/* PRICE */}

              <div className="view-product-form-group">

                <label>
                  Price
                </label>

                <div className="view-product-price-input">

                  <span>
                    ₹
                  </span>

                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="1"
                    placeholder="Enter price"
                    value={
                      newProduct.price
                    }
                    onChange={
                      handleNewProductChange
                    }
                  />

                </div>

              </div>


              {/* IMAGE URL */}

              <div className="view-product-form-group">

                <label>
                  Product Image URL

                  <span className="optional">
                    Optional
                  </span>
                </label>

                <div className="view-product-image-input">

                  <ImagePlus
                    size={15}
                    strokeWidth={1.7}
                  />

                  <input
                    type="url"
                    name="image"
                    placeholder="https://example.com/product-image.jpg"
                    value={
                      newProduct.image
                    }
                    onChange={
                      handleNewProductChange
                    }
                  />

                </div>

                <small>
                  If no image URL is provided,
                  a default product image will
                  be used.
                </small>

              </div>


              {/* IMAGE PREVIEW */}

              {newProduct.image.trim() && (
                <div className="view-product-modal-preview">

                  <span>
                    Image Preview
                  </span>

                  <img
                    src={newProduct.image}
                    alt="Product preview"
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";
                    }}
                  />

                </div>
              )}


              {/* =================================
                  MODAL ACTIONS
              ================================= */}

              <div className="view-product-modal-actions">

                <button
                  type="button"
                  className="view-product-modal-cancel"
                  onClick={
                    handleCloseAddModal
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="view-product-modal-create"
                >
                  <Plus
                    size={15}
                    strokeWidth={2}
                  />

                  Create Product
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </section>
  );
}

export default ViewProducts;