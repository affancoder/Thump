import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layout/AdminLayout";
import CustomerList from "./pages/CustomerList";
import AddProducts from "./pages/AddProducts";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to="/admin/customer-list" replace />}
          />

          <Route path="customer-list" element={<CustomerList />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/admin/customer-list" replace />}
        />
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to="/admin/customer-list" replace />}
          />

          <Route path="customer-list" element={<CustomerList />} />

          <Route path="add-products" element={<AddProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
