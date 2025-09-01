import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //router
import MainLayout from "./layouts/MainLayout"; //layout

// pages
import DashboardPage from "./pages/Dashboard";
import DataPage from "./pages/Data";
import UsersPage from "./pages/Users";

const App = () => {
  return (
    <>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </>
  );
};

export default App;
