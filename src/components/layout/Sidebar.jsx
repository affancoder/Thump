import { NavLink } from "react-router-dom";
import {
  UsersRound,
  PackagePlus,
  Package,
  Boxes,
  ClipboardList,
  Tags,
  RotateCcw,
  CircleAlert,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

import "../../styles/sidebar.css";

function Sidebar({ mobileOpen, setMobileOpen }) {
  const menuItems = [
    {
      label: "Customer List",
      path: "/admin/customer-list",
      icon: UsersRound,
      hasArrow: true,
    },
    {
      label: "Add Products",
      path: "/admin/add-products",
      icon: PackagePlus,
      hasArrow: true,
    },
    {
      label: "View Products",
      path: "/admin/view-products",
      icon: Package,
      hasArrow: true,
    },
    {
      label: "Manage Stocks",
      path: "/admin/manage-stocks",
      icon: Boxes,
      hasArrow: true,
    },
    {
      label: "Orders",
      path: "/admin/orders",
      icon: ClipboardList,
      hasArrow: true,
    },
    {
      label: "Categories",
      path: "/admin/categories",
      icon: Tags,
      hasArrow: true,
    },
    {
      label: "Purchase Returns",
      path: "/admin/purchase-returns",
      icon: RotateCcw,
      hasArrow: true,
    },
    {
      label: "Complaints",
      path: "/admin/complaints",
      icon: CircleAlert,
      hasArrow: true,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: Settings,
      hasArrow: true,
    },
  ];

  const handleNavigation = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    // Logout logic will be added later
    console.log("Logout");
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar ${
          mobileOpen ? "sidebar-mobile-open" : ""
        }`}
      >
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            thump
          </div>

          <div className="sidebar-brand-text">
            <span className="sidebar-admin-title">
              ADMIN PANEL
            </span>

            <span className="sidebar-company-name">
              Thump Beyond Limits
            </span>
          </div>
        </div>

        <div className="sidebar-divider" />

        {/* Navigation */}
        <nav className="sidebar-navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `sidebar-nav-item ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <Icon
                  className="sidebar-nav-icon"
                  size={16}
                  strokeWidth={1.7}
                />

                <span className="sidebar-nav-label">
                  {item.label}
                </span>

                {item.hasArrow && (
                  <ChevronRight
                    className="sidebar-nav-arrow"
                    size={15}
                    strokeWidth={1.7}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="sidebar-logout-container">
          <div className="sidebar-divider" />

          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut
              size={16}
              strokeWidth={1.7}
            />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;