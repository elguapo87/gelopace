import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");               
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [cars, setCars] = useState([]);
    const [appointments, setAppointments] = useState([]);

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

    const value = {
        aToken, setAToken,       
        backendUrl,
        cars, setCars,
        getCarList,
        changeStatus,
        appointments, setAppointments,
        getAllAppointments
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
};

export default AdminContextProvider;