import { useRef, useState } from "react";
import {
  Tags,
  Upload,
  Link as LinkIcon,
  Trash2,
  Power,
  Image as ImageIcon,
  Plus,
  RefreshCw,
  X,
  Palette,
} from "lucide-react";

import "../CSS/Categories.css";

const fallbackCategoryImage =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800";

const initialCategories = [
  {
    id: "CAT-001",
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800",
    source: "Custom",
    active: true,
    themeColor: "#078477",
  },
  {
    id: "CAT-002",
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
    source: "Custom",
    active: true,
    themeColor: "#078477",
  },
  {
    id: "CAT-003",
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
    source: "Fallback",
    active: true,
    themeColor: "#078477",
  },
  {
    id: "CAT-004",
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
    source: "Custom",
    active: false,
    themeColor: "#078477",
  },
  {
    id: "CAT-005",
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    source: "Fallback",
    active: true,
    themeColor: "#078477",
  },
  {
    id: "CAT-006",
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
    source: "Custom",
    active: true,
    themeColor: "#078477",
  },
];

function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [imageUrls, setImageUrls] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);

  const [newCategory, setNewCategory] = useState({
    name: "",
    themeColor: "#078477",
    imageUrl: "",
    imageFile: null,
  });

  const [newCategoryPreview, setNewCategoryPreview] = useState("");

  const fileInputRefs = useRef({});

  /* =========================================
     EXISTING CATEGORY IMAGE UPLOAD
  ========================================= */

  const handleFileUpload = (event, categoryId) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setCategories((previous) =>
      previous.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              image: imageUrl,
              source: "Custom",
            }
          : category
      )
    );

    event.target.value = "";
  };

  /* =========================================
     EXISTING CATEGORY URL
  ========================================= */

  const handleUrlChange = (categoryId, value) => {
    setImageUrls((previous) => ({
      ...previous,
      [categoryId]: value,
    }));
  };

  const handleSaveUrl = (categoryId) => {
    const url = imageUrls[categoryId]?.trim();

    if (!url) return;

    setCategories((previous) =>
      previous.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              image: url,
              source: "Custom",
            }
          : category
      )
    );

    setImageUrls((previous) => ({
      ...previous,
      [categoryId]: "",
    }));
  };

  /* =========================================
     ACTIVE / INACTIVE
  ========================================= */

  const handleToggle = (categoryId) => {
    setCategories((previous) =>
      previous.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              active: !category.active,
            }
          : category
      )
    );
  };

  /* =========================================
     DELETE
  ========================================= */

  const handleDelete = (categoryId) => {
    setCategories((previous) =>
      previous.filter((category) => category.id !== categoryId)
    );
  };

  /* =========================================
     REFRESH
  ========================================= */

  const handleRefresh = () => {
    window.location.reload();
  };

  /* =========================================
     OPEN ADD CATEGORY MODAL
  ========================================= */

  const handleAddCategory = () => {
    setNewCategory({
      name: "",
      themeColor: "#078477",
      imageUrl: "",
      imageFile: null,
    });

    setNewCategoryPreview("");
    setShowAddModal(true);
  };

  /* =========================================
     CLOSE MODAL
  ========================================= */

  const handleCloseModal = () => {
    setShowAddModal(false);

    setNewCategory({
      name: "",
      themeColor: "#078477",
      imageUrl: "",
      imageFile: null,
    });

    setNewCategoryPreview("");
  };

  /* =========================================
     NEW CATEGORY INPUT
  ========================================= */

  const handleNewCategoryChange = (event) => {
    const { name, value } = event.target;

    setNewCategory((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "imageUrl" && value.trim()) {
      setNewCategoryPreview(value.trim());
    }

    if (name === "imageUrl" && !value.trim() && !newCategory.imageFile) {
      setNewCategoryPreview("");
    }
  };

  /* =========================================
     NEW CATEGORY IMAGE FILE
  ========================================= */

  const handleNewCategoryImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setNewCategory((previous) => ({
      ...previous,
      imageFile: file,
    }));

    setNewCategoryPreview(previewUrl);
  };

  /* =========================================
     CREATE CATEGORY
  ========================================= */

  const handleCreateCategory = (event) => {
    event.preventDefault();

    const categoryName = newCategory.name.trim();

    if (!categoryName) {
      alert("Please enter category name.");
      return;
    }

    let categoryImage = fallbackCategoryImage;
    let source = "Fallback";

    /*
      Uploaded file takes priority over direct URL.
    */
    if (newCategory.imageFile) {
      categoryImage = URL.createObjectURL(newCategory.imageFile);
      source = "Custom";
    } else if (newCategory.imageUrl.trim()) {
      categoryImage = newCategory.imageUrl.trim();
      source = "Custom";
    }

    const nextNumber =
      categories.reduce((max, category) => {
        const number = Number(category.id.replace("CAT-", ""));
        return Number.isNaN(number) ? max : Math.max(max, number);
      }, 0) + 1;

    const newCategoryItem = {
      id: `CAT-${String(nextNumber).padStart(3, "0")}`,
      name: categoryName,
      image: categoryImage,
      source,
      active: true,
      themeColor: newCategory.themeColor,
    };

    setCategories((previous) => [
      ...previous,
      newCategoryItem,
    ]);

    handleCloseModal();
  };

  /* =========================================
     IMAGE ERROR
  ========================================= */

  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";

    const fallback =
      event.currentTarget.parentElement.querySelector(
        ".category-image-fallback"
      );

    if (fallback) {
      fallback.style.display = "flex";
    }
  };

  return (
    <section className="categories-page">
      {/* =========================================
          HEADER
      ========================================= */}

      <div className="categories-header">
        <div className="categories-heading">
          <div className="categories-heading-icon">
            <Tags size={20} strokeWidth={1.8} />
          </div>

          <div>
            <h1>Categories</h1>
            <p>
              Manage product categories, images and availability.
            </p>
          </div>
        </div>

        <div className="categories-header-actions">
          <button
            type="button"
            className="categories-refresh-button"
            onClick={handleRefresh}
          >
            <RefreshCw size={16} strokeWidth={1.8} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            className="categories-add-button"
            onClick={handleAddCategory}
          >
            <Plus size={17} strokeWidth={2} />
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* =========================================
          CATEGORY GRID
      ========================================= */}

      <div className="categories-grid">
        {categories.map((category) => (
          <article
            className={`category-card ${
              !category.active ? "category-card-inactive" : ""
            }`}
            key={category.id}
            style={{
              "--category-theme-color":
                category.themeColor || "#078477",
            }}
          >
            {/* IMAGE */}

            <div className="category-image-wrapper">
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
                onError={handleImageError}
              />

              <div className="category-image-fallback">
                <ImageIcon size={30} strokeWidth={1.4} />
                <span>No image</span>
              </div>

              <div className="category-image-overlay">
                <button
                  type="button"
                  className="category-upload-overlay-button"
                  onClick={() =>
                    fileInputRefs.current[category.id]?.click()
                  }
                >
                  <Upload size={14} />
                  Change Image
                </button>
              </div>

              <input
                ref={(element) => {
                  fileInputRefs.current[category.id] = element;
                }}
                type="file"
                accept="image/*"
                className="category-file-input"
                onChange={(event) =>
                  handleFileUpload(event, category.id)
                }
              />
            </div>

            {/* CARD CONTENT */}

            <div className="category-card-content">
              <div className="category-card-top">
                <div>
                  <h2>{category.name}</h2>

                  <span className="category-id">
                    ID: {category.id}
                  </span>
                </div>

                <button
                  type="button"
                  className={`category-status ${
                    category.active ? "active" : "inactive"
                  }`}
                  onClick={() => handleToggle(category.id)}
                >
                  <span className="category-status-dot" />
                  {category.active ? "Active" : "Inactive"}
                </button>
              </div>

              {/* THEME COLOR */}

              <div className="category-theme-row">
                <span className="category-source-label">
                  Theme
                </span>

                <div className="category-theme-value">
                  <span
                    className="category-theme-color"
                    style={{
                      backgroundColor:
                        category.themeColor || "#078477",
                    }}
                  />

                  <span>
                    {category.themeColor || "#078477"}
                  </span>
                </div>
              </div>

              {/* ASSET */}

              <div className="category-source">
                <span className="category-source-label">
                  Asset
                </span>

                <span
                  className={`category-source-value ${category.source.toLowerCase()}`}
                >
                  {category.source}
                </span>
              </div>

              {/* UPLOAD */}

              <div className="category-upload-section">
                <input
                  type="file"
                  accept="image/*"
                  className="category-file-input"
                  id={`category-file-${category.id}`}
                  onChange={(event) =>
                    handleFileUpload(event, category.id)
                  }
                />

                <label
                  htmlFor={`category-file-${category.id}`}
                  className="category-upload-button"
                >
                  <Upload size={15} />
                  Upload Image
                </label>
              </div>

              {/* URL */}

              <div className="category-url-section">
                <div className="category-url-input">
                  <LinkIcon size={14} strokeWidth={1.7} />

                  <input
                    type="url"
                    placeholder="Paste image URL"
                    value={imageUrls[category.id] || ""}
                    onChange={(event) =>
                      handleUrlChange(
                        category.id,
                        event.target.value
                      )
                    }
                  />
                </div>

                <button
                  type="button"
                  className="category-save-url"
                  onClick={() => handleSaveUrl(category.id)}
                >
                  Save URL
                </button>
              </div>

              {/* FOOTER */}

              <div className="category-card-footer">
                <button
                  type="button"
                  className="category-toggle-button"
                  onClick={() => handleToggle(category.id)}
                >
                  <Power size={14} />

                  {category.active
                    ? "Turn Off"
                    : "Activate"}
                </button>

                <button
                  type="button"
                  className="category-delete-button"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* =========================================
          EMPTY STATE
      ========================================= */}

      {categories.length === 0 && (
        <div className="categories-empty">
          <Tags size={34} strokeWidth={1.4} />

          <h3>No categories found</h3>

          <p>
            Categories will appear here once they are added.
          </p>
        </div>
      )}

      {/* =========================================
          ADD CATEGORY MODAL
      ========================================= */}

      {showAddModal && (
        <div
          className="category-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              handleCloseModal();
            }
          }}
        >
          <div className="category-modal">
            {/* MODAL HEADER */}

            <div className="category-modal-header">
              <div className="category-modal-title">
                <div className="category-modal-icon">
                  <Plus size={18} strokeWidth={2} />
                </div>

                <div>
                  <h2>Add New Category</h2>
                  <p>
                    Create a new product category.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="category-modal-close"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            {/* FORM */}

            <form
              className="category-modal-form"
              onSubmit={handleCreateCategory}
            >
              {/* CATEGORY NAME */}

              <div className="category-form-group">
                <label htmlFor="category-name">
                  Category Name
                </label>

                <input
                  id="category-name"
                  name="name"
                  type="text"
                  placeholder="Enter category name"
                  value={newCategory.name}
                  onChange={handleNewCategoryChange}
                  autoFocus
                />
              </div>

              {/* THEME COLOR */}

              <div className="category-form-group">
                <label htmlFor="category-theme-color">
                  Theme Color
                </label>

                <div className="category-color-input-wrapper">
                  <div
                    className="category-selected-color"
                    style={{
                      backgroundColor:
                        newCategory.themeColor,
                    }}
                  />

                  <input
                    id="category-theme-color"
                    name="themeColor"
                    type="color"
                    value={newCategory.themeColor}
                    onChange={handleNewCategoryChange}
                  />

                  <span>
                    {newCategory.themeColor}
                  </span>

                  <Palette
                    size={16}
                    strokeWidth={1.7}
                  />
                </div>
              </div>

              {/* BANNER IMAGE FILE */}

              <div className="category-form-group">
                <label>
                  Category Banner Image{" "}
                  <span>(Optional)</span>
                </label>

                <div className="category-modal-file-row">
                  <input
                    id="new-category-image"
                    type="file"
                    accept="image/*"
                    onChange={handleNewCategoryImage}
                  />

                  <label
                    htmlFor="new-category-image"
                    className="category-modal-file-button"
                  >
                    <Upload size={15} />
                    Choose Image
                  </label>

                  <span className="category-selected-file">
                    {newCategory.imageFile
                      ? newCategory.imageFile.name
                      : "No image selected"}
                  </span>
                </div>
              </div>

              {/* DIRECT IMAGE URL */}

              <div className="category-form-group">
                <label htmlFor="new-category-image-url">
                  Direct Image URL
                </label>

                <div className="category-modal-url-input">
                  <LinkIcon
                    size={15}
                    strokeWidth={1.7}
                  />

                  <input
                    id="new-category-image-url"
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com/banner.jpg"
                    value={newCategory.imageUrl}
                    onChange={handleNewCategoryChange}
                  />
                </div>

                <small>
                  If both file and URL are provided,
                  uploaded file will be used.
                </small>
              </div>

              {/* IMAGE PREVIEW */}

              {newCategoryPreview && (
                <div className="category-modal-preview">
                  <span>Image Preview</span>

                  <img
                    src={newCategoryPreview}
                    alt="Category preview"
                    onError={() =>
                      setNewCategoryPreview("")
                    }
                  />
                </div>
              )}

              {/* ACTIONS */}

              <div className="category-modal-actions">
                <button
                  type="button"
                  className="category-modal-cancel"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="category-modal-create"
                >
                  <Plus size={16} strokeWidth={2} />
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Categories;