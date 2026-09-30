import { useMemo, useState } from "react";
import {
  Search,
  CircleAlert,
  Plus,
  Eye,
  MoreHorizontal,
  X,
  CheckCircle2,
  Clock3,
  XCircle,
  User,
  Package,
} from "lucide-react";

import "../CSS/Complaints.css";

const initialComplaints = [
  {
    id: "CMP-0001",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    orderId: "ORD-1025",
    product: "Premium Wireless Earbuds",
    category: "Product Quality",
    message: "The product stopped working after a few days.",
    status: "Pending",
    priority: "High",
    date: "28 Sep 2026",
  },
  {
    id: "CMP-0002",
    customer: "Priya Das",
    email: "priya@example.com",
    orderId: "ORD-1021",
    product: "Smart Watch Series 5",
    category: "Damaged Product",
    message: "The package arrived with visible damage.",
    status: "In Progress",
    priority: "High",
    date: "27 Sep 2026",
  },
  {
    id: "CMP-0003",
    customer: "Amit Roy",
    email: "amit@example.com",
    orderId: "ORD-1018",
    product: "Bluetooth Speaker",
    category: "Wrong Product",
    message: "Received a different product than ordered.",
    status: "Resolved",
    priority: "Medium",
    date: "25 Sep 2026",
  },
  {
    id: "CMP-0004",
    customer: "Sneha Paul",
    email: "sneha@example.com",
    orderId: "ORD-1014",
    product: "USB-C Fast Charger",
    category: "Delivery Issue",
    message: "The order was delivered later than expected.",
    status: "Pending",
    priority: "Low",
    date: "24 Sep 2026",
  },
  {
    id: "CMP-0005",
    customer: "Arjun Singh",
    email: "arjun@example.com",
    orderId: "ORD-1009",
    product: "Mechanical Keyboard",
    category: "Product Quality",
    message: "Several keys are not responding properly.",
    status: "Rejected",
    priority: "Medium",
    date: "22 Sep 2026",
  },
  {
    id: "CMP-0006",
    customer: "Neha Kapoor",
    email: "neha@example.com",
    orderId: "ORD-1005",
    product: "Wireless Mouse",
    category: "Other",
    message: "Requesting assistance regarding the delivered item.",
    status: "Resolved",
    priority: "Low",
    date: "20 Sep 2026",
  },
];

function Complaints() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [form, setForm] = useState({
    customer: "",
    email: "",
    orderId: "",
    product: "",
    category: "Product Quality",
    priority: "Medium",
    message: "",
  });

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        complaint.id.toLowerCase().includes(searchValue) ||
        complaint.customer.toLowerCase().includes(searchValue) ||
        complaint.email.toLowerCase().includes(searchValue) ||
        complaint.orderId.toLowerCase().includes(searchValue) ||
        complaint.product.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || complaint.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        complaint.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [complaints, search, statusFilter, priorityFilter]);

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const inProgressComplaints = complaints.filter(
    (item) => item.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  const updateStatus = (id, newStatus) => {
    setComplaints((current) =>
      current.map((complaint) =>
        complaint.id === id
          ? { ...complaint, status: newStatus }
          : complaint
      )
    );
  };

  const handleCreateComplaint = (event) => {
    event.preventDefault();

    if (
      !form.customer.trim() ||
      !form.email.trim() ||
      !form.product.trim() ||
      !form.message.trim()
    ) {
      return;
    }

    const nextNumber = complaints.length + 1;

    const newComplaint = {
      id: `CMP-${String(nextNumber).padStart(4, "0")}`,
      customer: form.customer,
      email: form.email,
      orderId: form.orderId || "N/A",
      product: form.product,
      category: form.category,
      message: form.message,
      status: "Pending",
      priority: form.priority,
      date: "30 Sep 2026",
    };

    setComplaints((current) => [newComplaint, ...current]);

    setForm({
      customer: "",
      email: "",
      orderId: "",
      product: "",
      category: "Product Quality",
      priority: "Medium",
      message: "",
    });

    setShowCreateModal(false);
  };

  return (
    <div className="complaints-page">
      {/* =========================
          HEADER
      ========================= */}
      <div className="complaints-header">
        <div className="complaints-heading">
          <div className="complaints-heading-icon">
            <CircleAlert size={22} />
          </div>

          <div>
            <h1>Complaints</h1>
            <p>Manage and resolve customer complaints</p>
          </div>
        </div>

        <button
          className="complaints-create-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} />
          Create Complaint
        </button>
      </div>

      {/* =========================
          SUMMARY
      ========================= */}
      <div className="complaints-summary">
        <div className="complaints-summary-card">
          <div className="complaints-summary-icon total">
            <CircleAlert size={20} />
          </div>

          <div>
            <span>Total Complaints</span>
            <strong>{totalComplaints}</strong>
          </div>
        </div>

        <div className="complaints-summary-card">
          <div className="complaints-summary-icon pending">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingComplaints}</strong>
          </div>
        </div>

        <div className="complaints-summary-card">
          <div className="complaints-summary-icon progress">
            <MoreHorizontal size={20} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{inProgressComplaints}</strong>
          </div>
        </div>

        <div className="complaints-summary-card">
          <div className="complaints-summary-icon resolved">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Resolved</span>
            <strong>{resolvedComplaints}</strong>
          </div>
        </div>
      </div>

      {/* =========================
          MAIN CARD
      ========================= */}
      <div className="complaints-card">
        {/* TOOLBAR */}
        <div className="complaints-toolbar">
          <div className="complaints-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search complaint, customer, order..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="complaints-filters">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="complaints-table-wrapper">
          <table className="complaints-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Customer</th>
                <th>Order</th>
                <th>Product</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td>
                    <span className="complaint-id">{complaint.id}</span>
                  </td>

                  <td>
                    <div className="complaint-customer">
                      <strong>{complaint.customer}</strong>
                      <span>{complaint.email}</span>
                    </div>
                  </td>

                  <td>
                    <span className="complaint-order">
                      {complaint.orderId}
                    </span>
                  </td>

                  <td>
                    <div className="complaint-product">
                      <Package size={16} />
                      <span>{complaint.product}</span>
                    </div>
                  </td>

                  <td>{complaint.category}</td>

                  <td>
                    <span
                      className={`complaint-priority ${complaint.priority.toLowerCase()}`}
                    >
                      {complaint.priority}
                    </span>
                  </td>

                  <td>
                    <select
                      className={`complaint-status-select ${complaint.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      value={complaint.status}
                      onChange={(event) =>
                        updateStatus(complaint.id, event.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>

                  <td>
                    <span className="complaint-date">{complaint.date}</span>
                  </td>

                  <td>
                    <div className="complaint-actions">
                      <button
                        className="complaint-action-btn view"
                        title="View Complaint"
                        onClick={() => setSelectedComplaint(complaint)}
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        className="complaint-action-btn more"
                        title="More"
                      >
                        <MoreHorizontal size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredComplaints.length === 0 && (
            <div className="complaints-empty">
              <CircleAlert size={34} />
              <h3>No complaints found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          CREATE COMPLAINT MODAL
      ========================= */}
      {showCreateModal && (
        <div
          className="complaints-modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="complaints-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="complaints-modal-header">
              <div>
                <h2>Create Complaint</h2>
                <p>Add a new customer complaint</p>
              </div>

              <button
                className="complaints-modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form
              className="complaints-form"
              onSubmit={handleCreateComplaint}
            >
              <div className="complaints-form-row">
                <div className="complaints-form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    value={form.customer}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        customer: event.target.value,
                      })
                    }
                  />
                </div>

                <div className="complaints-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter customer email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        email: event.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="complaints-form-row">
                <div className="complaints-form-group">
                  <label>Order ID</label>
                  <input
                    type="text"
                    placeholder="e.g. ORD-1030"
                    value={form.orderId}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        orderId: event.target.value,
                      })
                    }
                  />
                </div>

                <div className="complaints-form-group">
                  <label>Product</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={form.product}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        product: event.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="complaints-form-row">
                <div className="complaints-form-group">
                  <label>Complaint Category</label>

                  <select
                    value={form.category}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        category: event.target.value,
                      })
                    }
                  >
                    <option>Product Quality</option>
                    <option>Damaged Product</option>
                    <option>Wrong Product</option>
                    <option>Delivery Issue</option>
                    <option>Payment Issue</option>
                    <option>Refund Issue</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="complaints-form-group">
                  <label>Priority</label>

                  <select
                    value={form.priority}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        priority: event.target.value,
                      })
                    }
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div className="complaints-form-group">
                <label>Complaint Description</label>

                <textarea
                  rows="5"
                  placeholder="Describe the complaint..."
                  value={form.message}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      message: event.target.value,
                    })
                  }
                />
              </div>

              <div className="complaints-form-actions">
                <button
                  type="button"
                  className="complaints-cancel-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="complaints-submit-btn">
                  <Plus size={17} />
                  Create Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          VIEW COMPLAINT MODAL
      ========================= */}
      {selectedComplaint && (
        <div
          className="complaints-modal-overlay"
          onClick={() => setSelectedComplaint(null)}
        >
          <div
            className="complaints-modal complaints-details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="complaints-modal-header">
              <div>
                <h2>Complaint Details</h2>
                <p>{selectedComplaint.id}</p>
              </div>

              <button
                className="complaints-modal-close"
                onClick={() => setSelectedComplaint(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="complaints-details">
              <div className="complaint-detail-top">
                <div className="complaint-detail-icon">
                  <CircleAlert size={24} />
                </div>

                <div>
                  <h3>{selectedComplaint.category}</h3>
                  <span>{selectedComplaint.date}</span>
                </div>
              </div>

              <div className="complaints-detail-grid">
                <div>
                  <span>Customer</span>
                  <strong>
                    <User size={15} />
                    {selectedComplaint.customer}
                  </strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{selectedComplaint.email}</strong>
                </div>

                <div>
                  <span>Order ID</span>
                  <strong>{selectedComplaint.orderId}</strong>
                </div>

                <div>
                  <span>Product</span>
                  <strong>
                    <Package size={15} />
                    {selectedComplaint.product}
                  </strong>
                </div>

                <div>
                  <span>Priority</span>
                  <strong
                    className={`detail-priority ${selectedComplaint.priority.toLowerCase()}`}
                  >
                    {selectedComplaint.priority}
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>{selectedComplaint.status}</strong>
                </div>
              </div>

              <div className="complaint-message">
                <span>Complaint Description</span>
                <p>{selectedComplaint.message}</p>
              </div>

              <div className="complaints-detail-actions">
                <button
                  className="complaints-cancel-btn"
                  onClick={() => setSelectedComplaint(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Complaints;