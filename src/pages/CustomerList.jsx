import { useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  User,
} from "lucide-react";

import "../CSS/CustomerList.css";

function CustomerList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [customers, setCustomers] = useState([
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
  ]);

  /* =========================================
     ADD CUSTOMER MODAL
  ========================================= */

  const [showAddModal, setShowAddModal] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });

  /* =========================================
     FILTER CUSTOMERS
  ========================================= */

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
  }, [search, statusFilter, customers]);

  /* =========================================
     OPEN MODAL
  ========================================= */

  const handleAddCustomer = () => {
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      status: "Active",
    });

    setShowAddModal(true);
  };

  /* =========================================
     CLOSE MODAL
  ========================================= */

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  /* =========================================
     INPUT CHANGE
  ========================================= */

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setNewCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================
     CREATE CUSTOMER
  ========================================= */

  const handleCreateCustomer = (event) => {
    event.preventDefault();

    if (
      !newCustomer.name.trim() ||
      !newCustomer.email.trim() ||
      !newCustomer.phone.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const nextNumber =
      customers.length > 0
        ? Math.max(
            ...customers.map((customer) =>
              Number(customer.id.replace("CUS-", ""))
            )
          ) + 1
        : 1;

    const customerId = `CUS-${String(
      nextNumber
    ).padStart(4, "0")}`;

    const today = new Date();

    const joined = today.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const customer = {
      id: customerId,
      name: newCustomer.name.trim(),
      email: newCustomer.email.trim(),
      phone: newCustomer.phone.trim(),
      orders: 0,
      status: newCustomer.status,
      joined,
    };

    setCustomers((previousCustomers) => [
      customer,
      ...previousCustomers,
    ]);

    setShowAddModal(false);

    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      status: "Active",
    });
  };

  /* =========================================
     CUSTOMER ACTION
  ========================================= */

  const handleCustomerAction = (customer) => {
    console.log("Customer actions:", customer);
  };

  return (
    <section className="customer-list-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="customer-list-header">

        <div>
          <h1>
            Customer List
          </h1>

          <p>
            Manage and view all your customers.
          </p>
        </div>

        <button
          type="button"
          className="customer-add-button"
          onClick={handleAddCustomer}
        >
          <UserPlus
            size={17}
            strokeWidth={1.8}
          />

          <span>
            Add Customer
          </span>
        </button>

      </div>


      {/* =========================================
          MAIN CARD
      ========================================= */}

      <div className="customer-list-card">

        {/* =======================================
            TOOLBAR
        ======================================= */}

        <div className="customer-list-toolbar">

          <div className="customer-search">

            <Search
              size={17}
              strokeWidth={1.8}
            />

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
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

        </div>


        {/* =======================================
            TABLE
        ======================================= */}

        <div className="customer-table-wrapper">

          <table className="customer-table">

            <thead>
              <tr>

                <th>
                  Customer
                </th>

                <th>
                  Contact
                </th>

                <th>
                  Orders
                </th>

                <th>
                  Status
                </th>

                <th>
                  Joined
                </th>

                <th aria-label="Actions" />

              </tr>
            </thead>


            <tbody>

              {filteredCustomers.length > 0 ? (

                filteredCustomers.map((customer) => (

                  <tr key={customer.id}>

                    {/* CUSTOMER */}

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


                    {/* CONTACT */}

                    <td>

                      <div className="customer-contact">

                        <span>
                          {customer.email}
                        </span>

                        <span>
                          {customer.phone}
                        </span>

                      </div>

                    </td>


                    {/* ORDERS */}

                    <td>

                      <span className="customer-orders">
                        {customer.orders}
                      </span>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`customer-status ${customer.status.toLowerCase()}`}
                      >
                        {customer.status}
                      </span>

                    </td>


                    {/* JOINED */}

                    <td>

                      <span className="customer-joined">
                        {customer.joined}
                      </span>

                    </td>


                    {/* ACTION */}

                    <td>

                      <button
                        type="button"
                        className="customer-action-button"
                        aria-label={`Actions for ${customer.name}`}
                        onClick={() =>
                          handleCustomerAction(customer)
                        }
                      >
                        <MoreHorizontal
                          size={18}
                          strokeWidth={1.8}
                        />
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


        {/* =========================================
            PAGINATION
        ========================================= */}

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
              <ChevronLeft
                size={17}
                strokeWidth={1.8}
              />
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
              <ChevronRight
                size={17}
                strokeWidth={1.8}
              />
            </button>

          </div>

        </div>

      </div>


      {/* =========================================
          ADD CUSTOMER MODAL
      ========================================= */}

      {showAddModal && (

        <div
          className="customer-modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {
              handleCloseModal();
            }

          }}
        >

          <div className="customer-modal">

            {/* ===================================
                MODAL HEADER
            =================================== */}

            <div className="customer-modal-header">

              <div className="customer-modal-title">

                <div className="customer-modal-icon">

                  <User
                    size={18}
                    strokeWidth={1.8}
                  />

                </div>

                <div>

                  <h2>
                    Add New Customer
                  </h2>

                  <p>
                    Create a new customer account.
                  </p>

                </div>

              </div>


              <button
                type="button"
                className="customer-modal-close"
                onClick={handleCloseModal}
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
              className="customer-modal-form"
              onSubmit={handleCreateCustomer}
            >

              {/* CUSTOMER NAME */}

              <div className="customer-form-group">

                <label>
                  Customer Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter customer name"
                  value={newCustomer.name}
                  onChange={handleCustomerChange}
                  autoFocus
                />

              </div>


              {/* EMAIL */}

              <div className="customer-form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="customer@example.com"
                  value={newCustomer.email}
                  onChange={handleCustomerChange}
                />

              </div>


              {/* PHONE */}

              <div className="customer-form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={newCustomer.phone}
                  onChange={handleCustomerChange}
                />

              </div>


              {/* STATUS */}

              <div className="customer-form-group">

                <label>
                  Account Status
                </label>

                <select
                  name="status"
                  value={newCustomer.status}
                  onChange={handleCustomerChange}
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>


              {/* ACTIONS */}

              <div className="customer-modal-actions">

                <button
                  type="button"
                  className="customer-modal-cancel"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="customer-modal-create"
                >

                  <UserPlus
                    size={15}
                    strokeWidth={1.9}
                  />

                  Create Customer

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </section>
  );
}

export default CustomerList;