import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../config/config";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (user === null) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />;
  }

  // Allow access to the route if the user is authenticated
  return children;
};

export default ProtectedRoute;
