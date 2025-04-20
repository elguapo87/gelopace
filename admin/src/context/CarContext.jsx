import { createContext } from "react";

export const CarContext = createContext();

const CarContextProvider = (props) => {

    const value = {};

    return (
        <CarContext.Provider value={value}>
            {props.children}
        </CarContext.Provider>
    )
};

export default CarContextProvider;