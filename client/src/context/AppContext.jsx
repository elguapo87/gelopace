import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "€";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
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

    useEffect(() => {
            getCarsData();
        }, []);

    const value = {
        cars,
        currencySymbol
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;