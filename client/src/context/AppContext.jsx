import { createContext } from "react";
import { cars } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "€";

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