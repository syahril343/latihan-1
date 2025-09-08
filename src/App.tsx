import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //router

// pages
import LoginPage from "./pages/auth/Login";
import GetBranches from "./pages/auth/get_branches";
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
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/get_branches"
          element={
            <ProtectedRoute>
              <GetBranches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data"
          element={
            <ProtectedRoute>
              <DataPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
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
