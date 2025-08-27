// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { StoreContext } from '../context/StoreContext';

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { token } = useContext(StoreContext);

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;



// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { StoreContext } from '../context/StoreContext';

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const context = useContext(StoreContext);

//   if (!context) {
//     return <Navigate to="/" replace />;
//   }

//   const { token } = context;

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;




import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// A simple loading spinner for a better user experience
const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div>Loading...</div>
  </div>
);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const context = useContext(StoreContext);

  // This check is important in case the context is not yet available
  if (!context) {
    return <LoadingSpinner />;
  }

  const { token, isLoading } = context;

  // NEW: While we are checking for the token, show a loading indicator.
  // This prevents the redirect from happening too early.
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // AFTER loading is finished, check for the token.
  // If there is no token, redirect to the login page.
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If loading is finished AND there is a token, render the protected component.
  return <>{children}</>;
};

export default ProtectedRoute;