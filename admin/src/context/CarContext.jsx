import { useState } from "react";
import { createContext } from "react";

export const CarContext = createContext();

const CarContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [cToken, setCToken] = useState(localStorage.getItem("cToken") ? localStorage.getItem("cToken") : "");

    const value = {
        backendUrl,
        cToken, setCToken,
    };

    return (
        <CarContext.Provider value={value}>
            {props.children}
        </CarContext.Provider>
    )
};

export default CarContextProvider;