import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./Components/Header/Header";
import {Routes, Route, useLocation } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SideBar from "./Components/SideBar/SideBar";
import Accounts from "./Pages/Accounts/Accounts";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Profile from "./Pages/Profile/Profile";
import MoneyTransfer from "./Pages/MoneyTransfer/MoneyTransfer";
import Support from "./Pages/Support/Support";

import TranslateComponent from "./Components/Google_Translate";
import Languages from "./Pages/Languages";
import Registration from "./Pages/Registration/Registration";
import CreditCard from "./Pages/CreditCard/CreditCard";
import FallBack from "./Pages/FallBack/FallBack";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ProtectedRoute from "./Services/ProtectedRoute";

function App() {
  
  const location = useLocation();

  const isLandingPage = location.pathname === "/"|| location.pathname==="/login" || location.pathname==="/register" ;
  return (
    <>
      <Header />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <div
          style={{ flex: "82%" }}
          className={isLandingPage ? "" : "Main_container"}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
            <Route path="/transfer" element={<ProtectedRoute><MoneyTransfer /></ProtectedRoute>} />
            <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/credit" element={<ProtectedRoute><CreditCard /></ProtectedRoute>} />
            <Route path="*" element={<FallBack />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
