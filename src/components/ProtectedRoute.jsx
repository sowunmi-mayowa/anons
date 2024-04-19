import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../config/config";

const ProtectedRoute = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return auth.currentUser ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
