import { useMemo, useState } from "react";
import {
  Search,
  ClipboardList,
  Eye,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";

import "../CSS/Orders.css";

const initialOrders = [
  {
    id: "ORD-1001",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    products: 2,
    amount: 2499,
    payment: "Paid",
    status: "Delivered",
    date: "30 Sep 2026",
  },
  {
    id: "ORD-1002",
    customer: "Priya Das",
    email: "priya@example.com",
    products: 1,
    amount: 899,
    payment: "Paid",
    status: "Shipped",
    date: "29 Sep 2026",
  },
  {
    id: "ORD-1003",
    customer: "Amit Roy",
    email: "amit@example.com",
    products: 3,
    amount: 4299,
    payment: "Pending",
    status: "Processing",
    date: "29 Sep 2026",
  },
  {
    id: "ORD-1004",
    customer: "Sneha Paul",
    email: "sneha@example.com",
    products: 1,
    amount: 1299,
    payment: "Paid",
    status: "Pending",
    date: "28 Sep 2026",
  },
  {
    id: "ORD-1005",
    customer: "Arjun Singh",
    email: "arjun@example.com",
    products: 2,
    amount: 3199,
    payment: "Paid",
    status: "Delivered",
    date: "27 Sep 2026",
  },
  {
    id: "ORD-1006",
    customer: "Neha Kapoor",
    email: "neha@example.com",
    products: 1,
    amount: 749,
    payment: "Failed",
    status: "Cancelled",
    date: "26 Sep 2026",
  },
  {
    id: "ORD-1007",
    customer: "Sourav Ghosh",
    email: "sourav@example.com",
    products: 4,
    amount: 5699,
    payment: "Paid",
    status: "Processing",
    date: "25 Sep 2026",
  },
  {
    id: "ORD-1008",
    customer: "Ananya Sen",
    email: "ananya@example.com",
    products: 2,
    amount: 2199,
    payment: "Paid",
    status: "Shipped",
    date: "24 Sep 2026",
  },
];

function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  const totals = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((order) => order.status === "Pending").length,
      processing: orders.filter((order) => order.status === "Processing").length,
      delivered: orders.filter((order) => order.status === "Delivered").length,
    }),
    [orders]
  );

  const filteredOrders = orders.filter((order) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      !searchValue ||
      order.id.toLowerCase().includes(searchValue) ||
      order.customer.toLowerCase().includes(searchValue) ||
      order.email.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    const matchesPayment =
      paymentFilter === "All" || order.payment === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const updateOrderStatus = (id, newStatus) => {
    setOrders((previous) =>
      previous.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const handleViewOrder = (order) => {
    console.log("View order:", order);
  };

  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <section className="orders-page">
      {/* Header */}
      <div className="orders-header">
        <div className="orders-heading">
          <div className="orders-heading-icon">
            <ClipboardList size={18} strokeWidth={1.8} />
          </div>

          <div>
            <h1>Orders</h1>
            <p>Manage and track customer orders</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="orders-summary-grid">
        <div className="orders-summary-card">
          <div className="orders-summary-info">
            <span>Total Orders</span>
            <strong>{totals.total}</strong>
          </div>

          <div className="orders-summary-icon">
            <ClipboardList size={16} />
          </div>
        </div>

        <div className="orders-summary-card">
          <div className="orders-summary-info">
            <span>Pending</span>
            <strong>{totals.pending}</strong>
          </div>

          <div className="orders-summary-icon">
            <PackageCheck size={16} />
          </div>
        </div>

        <div className="orders-summary-card">
          <div className="orders-summary-info">
            <span>Processing</span>
            <strong>{totals.processing}</strong>
          </div>

          <div className="orders-summary-icon">
            <PackageCheck size={16} />
          </div>
        </div>

        <div className="orders-summary-card">
          <div className="orders-summary-info">
            <span>Delivered</span>
            <strong>{totals.delivered}</strong>
          </div>

          <div className="orders-summary-icon">
            <Truck size={16} />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="orders-toolbar">
        <div className="orders-search">
          <Search size={15} strokeWidth={1.8} />

          <input
            type="text"
            placeholder="Search order, customer..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="orders-filters">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(event) => setPaymentFilter(event.target.value)}
          >
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order.id}>
                <td className="order-index">
                  {String(index + 1).padStart(2, "0")}
                </td>

                <td>
                  <span className="order-id">
                    {order.id}
                  </span>
                </td>

                <td>
                  <div className="order-customer">
                    <strong>{order.customer}</strong>
                    <span>{order.email}</span>
                  </div>
                </td>

                <td>
                  <span className="order-products">
                    {order.products}{" "}
                    {order.products === 1 ? "Item" : "Items"}
                  </span>
                </td>

                <td>
                  <span className="order-amount">
                    {formatAmount(order.amount)}
                  </span>
                </td>

                <td>
                  <span
                    className={`order-payment ${order.payment
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    <span className="payment-dot"></span>
                    {order.payment}
                  </span>
                </td>

                <td>
                  <select
                    className={`order-status-select ${order.status
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                    value={order.status}
                    onChange={(event) =>
                      updateOrderStatus(order.id, event.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                <td>
                  <span className="order-date">
                    {order.date}
                  </span>
                </td>

                <td>
                  <button
                    type="button"
                    className="order-view-button"
                    onClick={() => handleViewOrder(order)}
                    title="View Order"
                  >
                    <Eye size={15} />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="orders-empty">
          <XCircle size={30} strokeWidth={1.4} />
          <h3>No orders found</h3>
          <p>Try changing your search or filters.</p>
        </div>
      )}
    </section>
  );
}

export default Orders;