import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import LoginPage from "./pages/auth/Login";
import GetBranches from "./pages/auth/Get_Branches";
import DashboardPage from "./pages/Dashboard";
import DataPage from "./pages/Data";
import Users from "./pages/Users";
import ContactPage from "./pages/Contact/ContactPage";

// utils
import ProtectedRoute from "./pages/auth/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login tetap di-wrap supaya dicegah akses setelah login */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />

        {/* Get Branches */}
        <Route
          path="/get_branches"
          element={
            <ProtectedRoute>
              <GetBranches />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Data */}
        <Route
          path="/data"
          element={
            <ProtectedRoute>
              <DataPage />
            </ProtectedRoute>
          }
        />

        {/* Users */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
