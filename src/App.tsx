import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //router

// pages
import LoginPage from "./pages/auth/Login";
// import RegisterPage from "./pages/auth/Register";
import GetBranches from "./pages/auth/get_branches";
import DashboardPage from "./pages/Dashboard";
import DataPage from "./pages/Data";
import UsersPage from "./pages/Users";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/get_branches" element={<GetBranches />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
