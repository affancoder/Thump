import { Menu } from "lucide-react";

import "../../styles/navbar.css";

function Navbar({ setMobileOpen }) {
  return (
    <header className="navbar">
      {/* Mobile menu */}
      <button
        type="button"
        className="navbar-menu-button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={22} />
      </button>

      {/* Right-side user section */}
      <div className="navbar-user">
        <div className="navbar-user-details">
          <span className="navbar-user-name">
            JholeSalers
          </span>

          <span className="navbar-user-email">
            tester@gmail.com
          </span>
        </div>

        <div className="navbar-user-avatar">
          J
        </div>
      </div>
    </header>
  );
}

export default Navbar;