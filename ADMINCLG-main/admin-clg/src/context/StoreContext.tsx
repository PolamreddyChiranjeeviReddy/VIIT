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






// import { createContext, useEffect, useState, ReactNode } from "react";
// // import axios from "axios";

// interface StoreContextType {
//     url: string;
//     token: string;
//     setToken: React.Dispatch<React.SetStateAction<string>>;
//     render: boolean;
//     setRender: React.Dispatch<React.SetStateAction<boolean>>;
//     loginEmail: string;
//     setLoginEmail: React.Dispatch<React.SetStateAction<string>>;
// }

// interface StoreContextProviderProps {
//     children: ReactNode;
// }

// export const StoreContext = createContext<StoreContextType | null>(null);

// const StoreContextProvider = (props: StoreContextProviderProps) => {

//     // const url = "https://vignanadimbackend.onrender.com"
//     const url = import.meta.env.VITE_API_URL;
//     // const [food_list, setFoodList] = useState([]);
//     // const [cartItems, setCartItems] = useState({});
//     const [render,setRender] = useState(false);
//     const [token, setToken] = useState("");
//     const [loginEmail, setLoginEmail] = useState("");

//     useEffect(() => {
//             if (localStorage.getItem("token")) {
//                 setToken(localStorage.getItem("token") || "")
//                 setRender(false)
//             }
//     }, []);

//     const contextValue: StoreContextType = {
//         url,
//         token,
//         setToken,
//         render,
//         setRender,
//         loginEmail,
//         setLoginEmail,
//     };

//     return (
//         <StoreContext.Provider value={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//     )

// }

// export default StoreContextProvider;





// src/context/StoreContextProvider.tsx

// import { createContext, useEffect, useState, ReactNode } from "react";

// // NEW: Add isLoading to the context type
// interface StoreContextType {
//     url: string;
//     token: string;
//     setToken: React.Dispatch<React.SetStateAction<string>>;
//     render: boolean;
//     setRender: React.Dispatch<React.SetStateAction<boolean>>;
//     loginEmail: string;
//     setLoginEmail: React.Dispatch<React.SetStateAction<string>>;
//     isLoading: boolean; // Add this line
// }

// interface StoreContextProviderProps {
//     children: ReactNode;
// }

// export const StoreContext = createContext<StoreContextType | null>(null);

// const StoreContextProvider = (props: StoreContextProviderProps) => {
//     const url = import.meta.env.VITE_API_URL;
//     const [render, setRender] = useState(false);
//     const [token, setToken] = useState("");
//     const [loginEmail, setLoginEmail] = useState("");
    
//     // NEW: Add a loading state, initially true
//     const [isLoading, setIsLoading] = useState(true);

//     // NEW: We will combine the effects to handle the initial auth check
//     useEffect(() => {
//         const checkAuthStatus = async () => {
//             const storedToken = localStorage.getItem("token");
//             const storedEmail = localStorage.getItem("loginEmail");
//             if (storedEmail)
//             setLoginEmail(storedEmail);
//             if (storedToken) {
//                 setToken(storedToken);
//                 // If you need to verify the token with the backend, you would do it here.
//                 // For now, we'll assume if it exists, it's valid.
//             }
//             // CRITICAL: Set loading to false AFTER you have checked localStorage
//             setIsLoading(false); 
//         };

//         checkAuthStatus();
//     }, []); // This effect runs only once when the app starts

//     const contextValue: StoreContextType = {
//         url,
//         token,
//         setToken,
//         render,
//         setRender,
//         loginEmail,
//         setLoginEmail,
//         isLoading, // NEW: Pass the loading state through the context
//     };

//     return (
//         <StoreContext.Provider value={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//     )
// }

// export default StoreContextProvider;




// src/context/StoreContextProvider.tsx

import { createContext, useEffect, useState, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// COMBINED: The context type now includes everything we need.
interface StoreContextType {
    url: string;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    render: boolean;
    setRender: React.Dispatch<React.SetStateAction<boolean>>;
    loginEmail: string;
    setLoginEmail: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    logoutUser: () => void; // The logout function for manual and automatic logout
}

interface StoreContextProviderProps {
    children: ReactNode;
}

export const StoreContext = createContext<StoreContextType | null>(null);

// COMBINED: This component needs useNavigate, so we'll wrap it.
const StoreContextProvider = (props: StoreContextProviderProps) => {
    const url = import.meta.env.VITE_API_URL;
    const [render, setRender] = useState(false);
    const [token, setToken] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true); // From the refresh-fix
    
    const navigate = useNavigate();
    
    // COMBINED: Centralized logout function that cleans up everything.
    const logoutUser = useCallback(() => {
      console.log("Logging out...");
      setToken("");
      setLoginEmail("");
      localStorage.removeItem("token");
      localStorage.removeItem("loginEmail"); // Make sure to remove the email too
      navigate('/');
    }, [navigate]);

    // COMBINED: This useEffect handles the inactivity timer.
    useEffect(() => {
      let inactivityTimer: NodeJS.Timeout;

      const resetTimer = () => {
        clearTimeout(inactivityTimer);
        
        // Only run the timer logic if a token exists
        if (localStorage.getItem("token")) {
          inactivityTimer = setTimeout(() => {
            // alert("You have been logged out due to inactivity.");
            logoutUser();
          }, 5 * 60 * 1000); // 5 minutes
        }
      };

      const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
      events.forEach(event => window.addEventListener(event, resetTimer));
      
      resetTimer(); // Initialize the timer when the component loads or the token changes

      // Cleanup function to prevent memory leaks
      return () => {
        clearTimeout(inactivityTimer);
        events.forEach(event => window.removeEventListener(event, resetTimer));
      };
    }, [token, logoutUser]); // Re-run this effect if the token changes

    // COMBINED: This useEffect handles the initial loading of auth data.
    useEffect(() => {
        const checkAuthStatus = () => {
            const storedToken = localStorage.getItem("token");
            const storedEmail = localStorage.getItem("loginEmail");
            
            if (storedToken) {
                setToken(storedToken);
                if (storedEmail) {
                    setLoginEmail(storedEmail);
                }
            }
            // CRITICAL: Set loading to false after checking, so ProtectedRoute can proceed.
            setIsLoading(false); 
        };

        checkAuthStatus();
    }, []); // Runs only once on app startup

    const contextValue: StoreContextType = {
        url,
        token,
        setToken,
        render,
        setRender,
        loginEmail,
        setLoginEmail,
        isLoading,
        logoutUser,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

// This wrapper is necessary so that StoreContextProvider can use the `useNavigate` hook.
const StoreContextProviderWithRouter = (props: StoreContextProviderProps) => {
  return (
      <StoreContextProvider {...props} />
  );
};

export default StoreContextProviderWithRouter;