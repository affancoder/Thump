import { useMemo, useState } from "react";
import {
  Search,
  RotateCcw,
  Plus,
  Eye,
  MoreHorizontal,
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import "../CSS/PurchaseReturns.css";

const initialReturns = [
  {
    id: "RET-0001",
    supplier: "Tech Distributors",
    product: "Premium Wireless Earbuds",
    quantity: 12,
    reason: "Damaged Product",
    amount: 15588,
    status: "Pending",
    date: "28 Sep 2026",
  },
  {
    id: "RET-0002",
    supplier: "Anker Wholesale",
    product: "USB-C Fast Charging Cable",
    quantity: 20,
    reason: "Wrong Product",
    amount: 9980,
    status: "Approved",
    date: "26 Sep 2026",
  },
  {
    id: "RET-0003",
    supplier: "JBL Distributors",
    product: "Bluetooth Speaker",
    quantity: 5,
    reason: "Damaged Product",
    amount: 9495,
    status: "Approved",
    date: "24 Sep 2026",
  },
  {
    id: "RET-0004",
    supplier: "Mobile Accessories Hub",
    product: "Premium Phone Case",
    quantity: 8,
    reason: "Wrong Product",
    amount: 7192,
    status: "Rejected",
    date: "22 Sep 2026",
  },
  {
    id: "RET-0005",
    supplier: "Portronics Wholesale",
    product: "20W Fast Charger",
    quantity: 10,
    reason: "Quality Issue",
    amount: 7990,
    status: "Pending",
    date: "20 Sep 2026",
  },
  {
    id: "RET-0006",
    supplier: "Cable World",
    product: "Type-C Audio Adapter",
    quantity: 15,
    reason: "Defective Product",
    amount: 4485,
    status: "Approved",
    date: "18 Sep 2026",
  },
];

function PurchaseReturns() {
  const [returns, setReturns] = useState(initialReturns);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);

  const [newReturn, setNewReturn] = useState({
    supplier: "",
    product: "",
    quantity: "",
    reason: "Damaged Product",
    amount: "",
  });

  /* =========================================
     SUMMARY
  ========================================= */

  const totalReturns = returns.length;

  const pendingReturns = returns.filter(
    (item) => item.status === "Pending"
  ).length;

  const approvedReturns = returns.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejectedReturns = returns.filter(
    (item) => item.status === "Rejected"
  ).length;

  /* =========================================
     FILTER
  ========================================= */

  const filteredReturns = useMemo(() => {
    const query = search.trim().toLowerCase();

    return returns.filter((item) => {
      const matchesSearch =
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.supplier.toLowerCase().includes(query) ||
        item.product.toLowerCase().includes(query) ||
        item.reason.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [returns, search, statusFilter]);

  /* =========================================
     OPEN CREATE RETURN
  ========================================= */

  const handleOpenCreate = () => {
    setNewReturn({
      supplier: "",
      product: "",
      quantity: "",
      reason: "Damaged Product",
      amount: "",
    });

    setShowModal(true);
  };

  /* =========================================
     CLOSE MODAL
  ========================================= */

  const handleCloseModal = () => {
    setShowModal(false);
  };

  /* =========================================
     INPUT CHANGE
  ========================================= */

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewReturn((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================
     CREATE RETURN
  ========================================= */

  const handleCreateReturn = (event) => {
    event.preventDefault();

    if (
      !newReturn.supplier.trim() ||
      !newReturn.product.trim() ||
      !newReturn.quantity ||
      !newReturn.amount
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const nextNumber =
      returns.length > 0
        ? Math.max(
            ...returns.map((item) =>
              Number(item.id.replace("RET-", ""))
            )
          ) + 1
        : 1;

    const today = new Date();

    const formattedDate = today.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

    const returnItem = {
      id: `RET-${String(nextNumber).padStart(4, "0")}`,
      supplier: newReturn.supplier.trim(),
      product: newReturn.product.trim(),
      quantity: Number(newReturn.quantity),
      reason: newReturn.reason,
      amount: Number(newReturn.amount),
      status: "Pending",
      date: formattedDate,
    };

    setReturns((previous) => [
      returnItem,
      ...previous,
    ]);

    setShowModal(false);
  };

  /* =========================================
     VIEW RETURN
  ========================================= */

  const handleViewReturn = (item) => {
    setSelectedReturn(item);
  };

  /* =========================================
     STATUS CHANGE
  ========================================= */

  const handleStatusChange = (id, status) => {
    setReturns((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item
      )
    );
  };

  return (
    <section className="purchase-returns-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="purchase-returns-header">

        <div className="purchase-returns-heading">

          <div className="purchase-returns-heading-icon">
            <RotateCcw
              size={18}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h1>
              Purchase Returns
            </h1>

            <p>
              Manage and track returned purchases.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="purchase-return-add-button"
          onClick={handleOpenCreate}
        >
          <Plus
            size={15}
            strokeWidth={2}
          />

          <span>
            Create Return
          </span>
        </button>

      </div>


      {/* =========================================
          SUMMARY CARDS
      ========================================= */}

      <div className="purchase-returns-summary">

        <div className="purchase-return-summary-card">

          <div className="purchase-return-summary-info">
            <span>Total Returns</span>
            <strong>{totalReturns}</strong>
          </div>

          <div className="purchase-return-summary-icon">
            <Package size={17} />
          </div>

        </div>


        <div className="purchase-return-summary-card">

          <div className="purchase-return-summary-info">
            <span>Pending</span>
            <strong>{pendingReturns}</strong>
          </div>

          <div className="purchase-return-summary-icon">
            <Clock3 size={17} />
          </div>

        </div>


        <div className="purchase-return-summary-card">

          <div className="purchase-return-summary-info">
            <span>Approved</span>
            <strong>{approvedReturns}</strong>
          </div>

          <div className="purchase-return-summary-icon">
            <CheckCircle2 size={17} />
          </div>

        </div>


        <div className="purchase-return-summary-card">

          <div className="purchase-return-summary-info">
            <span>Rejected</span>
            <strong>{rejectedReturns}</strong>
          </div>

          <div className="purchase-return-summary-icon">
            <XCircle size={17} />
          </div>

        </div>

      </div>


      {/* =========================================
          TOOLBAR
      ========================================= */}

      <div className="purchase-returns-toolbar">

        <div className="purchase-returns-search">

          <Search
            size={15}
            strokeWidth={1.8}
          />

          <input
            type="text"
            placeholder="Search returns..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>


        <div className="purchase-returns-filters">

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

        </div>

      </div>


      {/* =========================================
          TABLE
      ========================================= */}

      {filteredReturns.length > 0 ? (

        <div className="purchase-returns-table-wrapper">

          <table className="purchase-returns-table">

            <thead>

              <tr>

                <th>
                  Return ID
                </th>

                <th>
                  Supplier
                </th>

                <th>
                  Product
                </th>

                <th>
                  Quantity
                </th>

                <th>
                  Reason
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Status
                </th>

                <th>
                  Date
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredReturns.map((item) => (

                <tr key={item.id}>

                  <td>

                    <span className="purchase-return-id">
                      {item.id}
                    </span>

                  </td>


                  <td>

                    <div className="purchase-return-supplier">

                      <strong>
                        {item.supplier}
                      </strong>

                    </div>

                  </td>


                  <td>

                    <span className="purchase-return-product">
                      {item.product}
                    </span>

                  </td>


                  <td>

                    <span className="purchase-return-quantity">
                      {item.quantity}
                    </span>

                  </td>


                  <td>

                    <span className="purchase-return-reason">
                      {item.reason}
                    </span>

                  </td>


                  <td>

                    <span className="purchase-return-amount">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </span>

                  </td>


                  <td>

                    <select
                      className={`purchase-return-status-select ${item.status.toLowerCase()}`}
                      value={item.status}
                      onChange={(event) =>
                        handleStatusChange(
                          item.id,
                          event.target.value
                        )
                      }
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Approved">
                        Approved
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>

                    </select>

                  </td>


                  <td>

                    <span className="purchase-return-date">
                      {item.date}
                    </span>

                  </td>


                  <td>

                    <div className="purchase-return-actions">

                      <button
                        type="button"
                        className="purchase-return-view-button"
                        onClick={() =>
                          handleViewReturn(item)
                        }
                        title="View return"
                      >
                        <Eye
                          size={14}
                          strokeWidth={1.8}
                        />
                      </button>

                      <button
                        type="button"
                        className="purchase-return-more-button"
                        onClick={() =>
                          console.log(
                            "More options:",
                            item
                          )
                        }
                        title="More options"
                      >
                        <MoreHorizontal
                          size={16}
                          strokeWidth={1.8}
                        />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      ) : (

        <div className="purchase-returns-empty">

          <Truck
            size={32}
            strokeWidth={1.4}
          />

          <h3>
            No purchase returns found
          </h3>

          <p>
            Try changing your search or filter.
          </p>

        </div>

      )}


      {/* =========================================
          CREATE RETURN MODAL
      ========================================= */}

      {showModal && (

        <div
          className="purchase-return-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              handleCloseModal();
            }
          }}
        >

          <div className="purchase-return-modal">

            <div className="purchase-return-modal-header">

              <div>

                <h2>
                  Create Purchase Return
                </h2>

                <p>
                  Add a new purchase return request.
                </p>

              </div>

              <button
                type="button"
                className="purchase-return-modal-close"
                onClick={handleCloseModal}
              >
                <X size={18} />
              </button>

            </div>


            <form
              className="purchase-return-form"
              onSubmit={handleCreateReturn}
            >

              <div className="purchase-return-form-group">

                <label>
                  Supplier
                </label>

                <input
                  type="text"
                  name="supplier"
                  placeholder="Enter supplier name"
                  value={newReturn.supplier}
                  onChange={handleInputChange}
                />

              </div>


              <div className="purchase-return-form-group">

                <label>
                  Product
                </label>

                <input
                  type="text"
                  name="product"
                  placeholder="Enter product name"
                  value={newReturn.product}
                  onChange={handleInputChange}
                />

              </div>


              <div className="purchase-return-form-row">

                <div className="purchase-return-form-group">

                  <label>
                    Quantity
                  </label>

                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    placeholder="0"
                    value={newReturn.quantity}
                    onChange={handleInputChange}
                  />

                </div>


                <div className="purchase-return-form-group">

                  <label>
                    Return Amount
                  </label>

                  <input
                    type="number"
                    name="amount"
                    min="0"
                    placeholder="₹0"
                    value={newReturn.amount}
                    onChange={handleInputChange}
                  />

                </div>

              </div>


              <div className="purchase-return-form-group">

                <label>
                  Return Reason
                </label>

                <select
                  name="reason"
                  value={newReturn.reason}
                  onChange={handleInputChange}
                >

                  <option value="Damaged Product">
                    Damaged Product
                  </option>

                  <option value="Wrong Product">
                    Wrong Product
                  </option>

                  <option value="Defective Product">
                    Defective Product
                  </option>

                  <option value="Quality Issue">
                    Quality Issue
                  </option>

                  <option value="Excess Stock">
                    Excess Stock
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              <div className="purchase-return-modal-actions">

                <button
                  type="button"
                  className="purchase-return-cancel-button"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="purchase-return-create-button"
                >
                  <Plus size={14} />
                  Create Return
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =========================================
          VIEW RETURN MODAL
      ========================================= */}

      {selectedReturn && (

        <div
          className="purchase-return-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedReturn(null);
            }
          }}
        >

          <div className="purchase-return-modal">

            <div className="purchase-return-modal-header">

              <div>

                <h2>
                  Return Details
                </h2>

                <p>
                  {selectedReturn.id}
                </p>

              </div>

              <button
                type="button"
                className="purchase-return-modal-close"
                onClick={() =>
                  setSelectedReturn(null)
                }
              >
                <X size={18} />
              </button>

            </div>


            <div className="purchase-return-details">

              <div>
                <span>Supplier</span>
                <strong>
                  {selectedReturn.supplier}
                </strong>
              </div>

              <div>
                <span>Product</span>
                <strong>
                  {selectedReturn.product}
                </strong>
              </div>

              <div>
                <span>Quantity</span>
                <strong>
                  {selectedReturn.quantity}
                </strong>
              </div>

              <div>
                <span>Reason</span>
                <strong>
                  {selectedReturn.reason}
                </strong>
              </div>

              <div>
                <span>Amount</span>
                <strong>
                  ₹{selectedReturn.amount.toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {selectedReturn.status}
                </strong>
              </div>

              <div>
                <span>Date</span>
                <strong>
                  {selectedReturn.date}
                </strong>
              </div>

            </div>


            <div className="purchase-return-modal-actions">

              <button
                type="button"
                className="purchase-return-cancel-button"
                onClick={() =>
                  setSelectedReturn(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default PurchaseReturns;