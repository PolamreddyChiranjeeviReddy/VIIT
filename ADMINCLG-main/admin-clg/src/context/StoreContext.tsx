// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {

//     const url = "http://localhost:5000"
//     // const [food_list, setFoodList] = useState([]);
//     // const [cartItems, setCartItems] = useState({});
//     const [render,setRender] = useState(false);
//     const [token, setToken] = useState("");

//     useEffect(() => {
//             if (localStorage.getItem("token")) {
//                 setToken(localStorage.getItem("token"))
//                 setRender(false)
//             }
//     }, []);

//     const contextValue = {
//         url,
//         token,
//         setToken,
//         render,
//         setRender,
//     };

//     return (
//         <StoreContext.Provider value={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//     )

// }

// export default StoreContextProvider;






import { createContext, useEffect, useState, ReactNode } from "react";
// import axios from "axios";

interface StoreContextType {
    url: string;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    render: boolean;
    setRender: React.Dispatch<React.SetStateAction<boolean>>;
    loginEmail: string;
    setLoginEmail: React.Dispatch<React.SetStateAction<string>>;
}

interface StoreContextProviderProps {
    children: ReactNode;
}

export const StoreContext = createContext<StoreContextType | null>(null);

const StoreContextProvider = (props: StoreContextProviderProps) => {

    // const url = "https://vignanadimbackend.onrender.com"
    const url = import.meta.env.VITE_API_URL;
    // const [food_list, setFoodList] = useState([]);
    // const [cartItems, setCartItems] = useState({});
    const [render,setRender] = useState(false);
    const [token, setToken] = useState("");
    const [loginEmail, setLoginEmail] = useState("");

    useEffect(() => {
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token") || "")
                setRender(false)
            }
    }, []);

    const contextValue: StoreContextType = {
        url,
        token,
        setToken,
        render,
        setRender,
        loginEmail,
        setLoginEmail,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;