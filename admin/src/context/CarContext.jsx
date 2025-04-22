import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CarContext = createContext();

const CarContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [cToken, setCToken] = useState(localStorage.getItem("cToken") ? localStorage.getItem("cToken") : "");
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/cars/appointment-list`, {
                headers: { Authorization: `Bearer ${cToken}` }
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

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/cars/complete-appointment`, { appointmentId }, {
                headers: { Authorization: `Bearer ${cToken}` }
            });

            if (data.success) {
                toast.success(data.message);
                await getAppointments();

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
            const { data } = await axios.post(`${backendUrl}/api/cars/cancel-appointment`, { appointmentId }, {
                headers: { Authorization: `Bearer ${cToken}` }
            });

            if (data.success) {
                toast.success(data.message);
                await getAppointments();

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const value = {
        backendUrl,
        cToken, setCToken,
        appointments, setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
    };

    return (
        <CarContext.Provider value={value}>
            {props.children}
        </CarContext.Provider>
    )
};

export default CarContextProvider;