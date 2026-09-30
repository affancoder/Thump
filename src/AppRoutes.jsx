import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layout/AdminLayout";

import CustomerList from "./pages/CustomerList";
import AddProducts from "./pages/AddProducts";
import ViewProducts from "./pages/ViewProducts";
import ManageStocks from "./pages/ManageStocks";
import Orders from "./pages/Orders";
import Categories from "./pages/Categories";
import PurchaseReturns from "./pages/PurchaseReturns";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================================
            ADMIN
        ========================================= */}

        <Route path="/admin" element={<AdminLayout />}>
          {/* /admin → /admin/customer-list */}
          <Route
            index
            element={<Navigate to="/admin/customer-list" replace />}
          />

          {/* Customer List */}
          <Route path="customer-list" element={<CustomerList />} />

          {/* Add Products */}
          <Route path="add-products" element={<AddProducts />} />

          {/* View Products */}
          <Route path="view-products" element={<ViewProducts />} />

          {/* Mange Stocks */}
          <Route path="manage-stocks" element={<ManageStocks />} />

          {/* Order */}
          <Route path="orders" element={<Orders />} />

          {/* Categories */}
          <Route path="categories" element={<Categories />} />

          {/* Purchase Return */}
          <Route path="purchase-returns" element={<PurchaseReturns />} />
        </Route>

        {/* =========================================
            INVALID ROUTES
        ========================================= */}

        <Route
          path="*"
          element={<Navigate to="/admin/customer-list" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
