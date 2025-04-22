import { useContext } from "react";
import Login from "./pages/admin/Login";
import { AdminContext } from "./context/AdminContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointments from "./pages/admin/AllAppointments";
import AddCar from "./pages/admin/AddCar";
import CarList from "./pages/admin/CarList";
import { CarContext } from "./context/CarContext";
import CarAppointments from "./pages/car/CarAppointments";
import CarDashboard from "./pages/car/CarDashboard";
import CarProfile from "./pages/car/CarProfile";

const App = () => {

  const { aToken } = useContext(AdminContext);
  const { cToken } = useContext(CarContext);

  return aToken || cToken ? (
    <div className="bg-[#f8f9fd]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/car-list" element={<CarList />} />

          {/* Car Routes */}
          <Route path="/" element={<></>} />
          <Route path="/car-appointments" element={<CarAppointments />} />
          <Route path="/car-dashboard" element={<CarDashboard />} />
          <Route path="/car-profile" element={<CarProfile />} />
        </Routes>
      </div>
    </div>

  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App
