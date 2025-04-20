import { useContext } from "react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointments from "./pages/admin/AllAppointments";
import AddCar from "./pages/admin/AddCar";
import CarList from "./pages/admin/CarList";
import Login from "./pages/admin/Login";


const App = () => {

  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className="bg-[#f8f9fd]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">         
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/car-list" element={<CarList />} />
        </Routes>
      </div>                        
    </div>

  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App