import { useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "../CSS/CustomerList.css";

function CustomerList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const customers = [
    {
      id: "CUS-0001",
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      phone: "+91 98765 43210",
      orders: 12,
      status: "Active",
      joined: "12 Sep 2026",
    },
    {
      id: "CUS-0002",
      name: "Priya Das",
      email: "priya.das@gmail.com",
      phone: "+91 98765 12345",
      orders: 8,
      status: "Active",
      joined: "10 Sep 2026",
    },
    {
      id: "CUS-0003",
      name: "Amit Roy",
      email: "amit.roy@gmail.com",
      phone: "+91 91234 56789",
      orders: 5,
      status: "Inactive",
      joined: "08 Sep 2026",
    },
    {
      id: "CUS-0004",
      name: "Sneha Paul",
      email: "sneha.paul@gmail.com",
      phone: "+91 99887 66554",
      orders: 16,
      status: "Active",
      joined: "05 Sep 2026",
    },
    {
      id: "CUS-0005",
      name: "Arjun Singh",
      email: "arjun.singh@gmail.com",
      phone: "+91 90000 11223",
      orders: 3,
      status: "Inactive",
      joined: "02 Sep 2026",
    },
  ];

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        !query ||
        customer.id.toLowerCase().includes(query) ||
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <section className="customer-list-page">
      {/* Page Header */}
      <div className="customer-list-header">
        <div>
          <h1>Customer List</h1>
          <p>Manage and view all your customers.</p>
        </div>

        <button
          type="button"
          className="customer-add-button"
        >
          <UserPlus size={17} />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="customer-list-card">
        {/* Toolbar */}
        <div className="customer-list-toolbar">
          <div className="customer-search">
            <Search size={17} />

            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            className="customer-status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Table */}
        <div className="customer-table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Status</th>
                <th>Joined</th>
                <th aria-label="Actions" />
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-info">
                        <div className="customer-avatar">
                          {customer.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="customer-name-wrapper">
                          <span className="customer-name">
                            {customer.name}
                          </span>

                          <span className="customer-id">
                            {customer.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="customer-contact">
                        <span>{customer.email}</span>
                        <span>{customer.phone}</span>
                      </div>
                    </td>

                    <td>
                      <span className="customer-orders">
                        {customer.orders}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`customer-status ${customer.status.toLowerCase()}`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    <td>
                      <span className="customer-joined">
                        {customer.joined}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="customer-action-button"
                        aria-label={`Actions for ${customer.name}`}
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="customer-empty"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="customer-pagination">
          <span>
            Showing {filteredCustomers.length} of{" "}
            {customers.length} customers
          </span>

          <div className="customer-pagination-buttons">
            <button
              type="button"
              aria-label="Previous page"
              disabled
            >
              <ChevronLeft size={17} />
            </button>

            <button
              type="button"
              className="current-page"
            >
              1
            </button>

            <button
              type="button"
              aria-label="Next page"
              disabled
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerList;