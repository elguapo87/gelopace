import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "$";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false);
    const [userData, setUserData] = useState(false);
    const [cars, setCars] = useState([]);

    const getCarsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/cars/car-list`);

            if (data.success) {
                setCars(data.allCars);
          
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };


    const getUserData = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/users/user-profile`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };


    useEffect(() => {
        getCarsData();
    }, []);

    useEffect(() => {
        if (token) {
            getUserData();
        } else {
            setUserData(false);
        }
    }, [token]);

    const value = {
        cars,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData,
        getUserData,
        getCarsData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;