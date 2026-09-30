import { useMemo, useState } from "react";
import {
  Search,
  Package,
  FileSpreadsheet,
  Download,
  RefreshCcw,
  Plus,
  Minus,
} from "lucide-react";

import "../CSS/ManageStocks.css";

const initialStocks = [
  {
    id: 1,
    title: "Premium Wireless Earbuds",
    category: "Audio",
    company: "boAt",
    stock: 42,
  },
  {
    id: 2,
    title: "USB-C Fast Charging Cable",
    category: "Charging",
    company: "Anker",
    stock: 18,
  },
  {
    id: 3,
    title: "20W Fast Charger",
    category: "Charging",
    company: "Portronics",
    stock: 7,
  },
  {
    id: 4,
    title: "Magnetic Mobile Stand",
    category: "Accessories",
    company: "Spigen",
    stock: 3,
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    category: "Audio",
    company: "JBL",
    stock: 25,
  },
  {
    id: 6,
    title: "Premium Phone Case",
    category: "Cases & Covers",
    company: "Spigen",
    stock: 0,
  },
  {
    id: 7,
    title: "Type-C Audio Adapter",
    category: "Cables",
    company: "boAt",
    stock: 31,
  },
  {
    id: 8,
    title: "Smartphone Tripod",
    category: "Accessories",
    company: "Portronics",
    stock: 5,
  },
  {
    id: 9,
    title: "Wireless Charging Pad",
    category: "Charging",
    company: "Anker",
    stock: 16,
  },
];

function ManageStocks() {
  const [stocks, setStocks] = useState(initialStocks);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const getStatus = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 5) return "Low Stock";
    return "In Stock";
  };

  const categories = [
    "All",
    ...new Set(stocks.map((item) => item.category)),
  ];

  const totals = useMemo(() => {
    return {
      total: stocks.length,
      inStock: stocks.filter((item) => item.stock > 5).length,
      lowStock: stocks.filter(
        (item) => item.stock > 0 && item.stock <= 5
      ).length,
      outOfStock: stocks.filter(
        (item) => item.stock === 0
      ).length,
    };
  }, [stocks]);

  const filteredStocks = stocks.filter((product) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      !searchValue ||
      product.title.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue) ||
      product.company.toLowerCase().includes(searchValue);

    const matchesCategory =
      category === "All" ||
      product.category === category;

    const matchesStatus =
      status === "All" ||
      getStatus(product.stock) === status;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });

  const updateStock = (id, amount) => {
    setStocks((previous) =>
      previous.map((product) =>
        product.id === id
          ? {
              ...product,
              stock: Math.max(
                0,
                product.stock + amount
              ),
            }
          : product
      )
    );
  };

  const handleInputChange = (id, value) => {
    const numericValue = Math.max(
      0,
      Number(value) || 0
    );

    setStocks((previous) =>
      previous.map((product) =>
        product.id === id
          ? {
              ...product,
              stock: numericValue,
            }
          : product
      )
    );
  };

  const handleRestockAll = () => {
    setStocks((previous) =>
      previous.map((product) =>
        product.stock === 0
          ? {
              ...product,
              stock: 10,
            }
          : product
      )
    );
  };

  const handleExportCSV = () => {
    const headers = [
      "Product",
      "Category",
      "Company",
      "Stock",
      "Status",
    ];

    const rows = stocks.map((product) => [
      product.title,
      product.category,
      product.company,
      product.stock,
      getStatus(product.stock),
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${value}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "thump-stock-report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleGoogleSheet = () => {
    console.log(
      "Google Sheet integration will be connected later."
    );
  };

  return (
    <section className="manage-stocks-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="manage-stocks-header">

        <div className="manage-stocks-heading">

          <div className="manage-stocks-heading-icon">
            <Package
              size={18}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h1>Manage Stocks</h1>

            <p>
              Monitor and manage product inventory
            </p>
          </div>

        </div>

      </div>


      {/* =========================================
          SUMMARY CARDS
      ========================================= */}

      <div className="stock-summary-grid">

        <div className="stock-summary-card">

          <div className="stock-summary-info">
            <span>Total Products</span>
            <strong>{totals.total}</strong>
          </div>

          <div className="stock-summary-icon">
            <Package size={16} />
          </div>

        </div>


        <div className="stock-summary-card">

          <div className="stock-summary-info">
            <span>In Stock</span>
            <strong>{totals.inStock}</strong>
          </div>

          <div className="stock-summary-icon">
            <Package size={16} />
          </div>

        </div>


        <div className="stock-summary-card">

          <div className="stock-summary-info">
            <span>Low Stock</span>
            <strong>{totals.lowStock}</strong>
          </div>

          <div className="stock-summary-icon">
            <Package size={16} />
          </div>

        </div>


        <div className="stock-summary-card">

          <div className="stock-summary-info">
            <span>Out of Stock</span>
            <strong>{totals.outOfStock}</strong>
          </div>

          <div className="stock-summary-icon">
            <Package size={16} />
          </div>

        </div>

      </div>


      {/* =========================================
          ACTIONS
      ========================================= */}

      <div className="manage-stocks-actions">

        <button
          type="button"
          className="stock-action sheet"
          onClick={handleGoogleSheet}
        >
          <FileSpreadsheet size={14} />

          <span>Link Google Sheet</span>
        </button>


        <button
          type="button"
          className="stock-action export"
          onClick={handleExportCSV}
        >
          <Download size={14} />

          <span>Export CSV</span>
        </button>


        <button
          type="button"
          className="stock-action restock"
          onClick={handleRestockAll}
        >
          <RefreshCcw size={14} />

          <span>Restock All OOS</span>
        </button>

      </div>


      {/* =========================================
          FILTERS
      ========================================= */}

      <div className="manage-stocks-toolbar">

        <div className="manage-stocks-search">

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


        <div className="manage-stocks-filters">

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item === "All"
                  ? "All Categories"
                  : item}
              </option>
            ))}
          </select>


          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            <option value="All">
              All Status
            </option>

            <option value="In Stock">
              In Stock
            </option>

            <option value="Low Stock">
              Low Stock
            </option>

            <option value="Out of Stock">
              Out of Stock
            </option>
          </select>

        </div>

      </div>


      {/* =========================================
          TABLE
      ========================================= */}

      <div className="manage-stocks-table-wrapper">

        <table className="manage-stocks-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Category</th>
              <th>Company</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {filteredStocks.map(
              (product, index) => {
                const productStatus =
                  getStatus(product.stock);

                return (
                  <tr key={product.id}>

                    <td className="stock-index">
                      {String(index + 1).padStart(2, "0")}
                    </td>


                    <td className="stock-product">
                      <div className="stock-product-name">
                        {product.title}
                      </div>
                    </td>


                    <td>
                      <span className="stock-category">
                        {product.category}
                      </span>
                    </td>


                    <td className="stock-company">
                      {product.company}
                    </td>


                    <td>

                      <div className="stock-counter">

                        <button
                          type="button"
                          onClick={() =>
                            updateStock(
                              product.id,
                              -1
                            )
                          }
                          disabled={
                            product.stock === 0
                          }
                        >
                          <Minus size={12} />
                        </button>


                        <input
                          type="number"
                          min="0"
                          value={product.stock}
                          onChange={(event) =>
                            handleInputChange(
                              product.id,
                              event.target.value
                            )
                          }
                        />


                        <button
                          type="button"
                          onClick={() =>
                            updateStock(
                              product.id,
                              1
                            )
                          }
                        >
                          <Plus size={12} />
                        </button>

                      </div>

                    </td>


                    <td>

                      <span
                        className={`stock-status ${productStatus
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        <span className="status-dot"></span>

                        {productStatus}
                      </span>

                    </td>

                  </tr>
                );
              }
            )}

          </tbody>

        </table>

      </div>


      {/* =========================================
          EMPTY
      ========================================= */}

      {filteredStocks.length === 0 && (
        <div className="manage-stocks-empty">

          <Package
            size={30}
            strokeWidth={1.4}
          />

          <h3>
            No products found
          </h3>

          <p>
            Try changing your search or filters.
          </p>

        </div>
      )}

    </section>
  );
}

export default ManageStocks;