import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Employee from "./pages/Employee";
import Department from "./pages/Department";
import Salary from "./pages/Salary";
import Reports from "./pages/Reports";

function Layout({ children }) {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED */}
          <Route path="/" element={
            <ProtectedRoute><Employee /></ProtectedRoute>
          } />
          <Route path="/department" element={
            <ProtectedRoute><Department /></ProtectedRoute>
          } />
          <Route path="/salary" element={
            <ProtectedRoute><Salary /></ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute><Reports /></ProtectedRoute>
          } />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;