import { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");               
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [cars, setCars] = useState([]);

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

    const value = {
        aToken, setAToken,       
        backendUrl,
        cars, setCars,
        getCarList,
        changeStatus
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
};

export default AdminContextProvider;