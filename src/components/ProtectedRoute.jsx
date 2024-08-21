import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../config/config";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false once the auth state is determined
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // While checking the auth state, show a loading indicator or nothing
    return <div>Loading...</div>; // You can replace this with a spinner or another UI element
  }

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />;
  }

  // Allow access to the route if the user is authenticated
  return children;
};

export default ProtectedRoute;
