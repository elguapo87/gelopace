import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"
import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import { CarContext } from "../context/CarContext"

const Sidebar = () => {

  const { aToken } = useContext(AdminContext);
  const { cToken } = useContext(CarContext);

  return (
    <div className='min-h-screen bg-white border-r max-sm:min-w-[15%]'>
      {
        aToken
          &&
        <ul className='text-[#515151] mt-5'>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`} to="/admin-dashboard">
            <img src={assets.home_icon} alt="" />
            <p className="hidden sm:block">Dashboard</p>
          </NavLink>
  
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`} to="/all-appointments">
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden sm:block">Appointments</p>
          </NavLink>
  
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`} to="/add-car">
            <img src={assets.add_icon} alt="" />
            <p className="hidden sm:block">Add Car</p>
          </NavLink>
  
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`} to="/car-list">
            <img src={assets.people_icon} alt="" />
            <p className="hidden sm:block">Car List</p>
          </NavLink>
        </ul>
      }

      {
        cToken
          &&
        <ul className='text-[#515151] mt-5'>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`} to="/car-dashboard">
            <img src={assets.home_icon} alt="" />
            <p className="hidden sm:block">Dashboard</p>
          </NavLink>
  
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`} to="/car-appointments">
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden sm:block">Appointments</p>
          </NavLink>

          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`} to="/car-profile">
            <img className="w-6" src={assets.car_icon} alt="" />
            <p className="hidden sm:block">Car Info</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
