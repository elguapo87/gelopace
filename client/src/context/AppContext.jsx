import { createContext } from "react";
import { cars } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const value = {
        cars
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;