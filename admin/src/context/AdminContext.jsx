import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [cars, setCars] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);

    const getCarList = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/car-list`, {}, {
                headers: { aToken }
            });

            if (data.success) {
                setCars(data.cars);    

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const changeStatus = async (carId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-status`, { carId }, {
                headers: { aToken }
            });

            if (data.success) {
                toast.success(data.message);
                await getCarList();

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointment-list`, {
                headers: { aToken }
            });

            if (data.success) {
                setAppointments(data.appointments);

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, { appointmentId }, {
                headers: { aToken }
            });

            if (data.success) {
                toast.success(data.message);
                await getAllAppointments();
                await getDashboardData();

            } else {
                toast.error(data.message);   
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getDashboardData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/dashboard-data`, {
                headers: { aToken }
            });

            if (data.success) {
                setDashData(data.dashData);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const value = {
        aToken, setAToken,
        backendUrl,
        cars, setCars,
        getCarList,
        changeStatus,
        appointments, setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData, getDashboardData
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
};

export default AdminContextProvider;