import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = Cookies.get("token");

            if (!token) {
                setAuthorized(false);
                setLoading(false);
                return;
            }

            try {
                const res = await axios.post(
                    "http://localhost:8080/identity/auth/introspect",
                    { token },
                    { withCredentials: true }
                );

                const { valid, role } = res.data.result;

                // chỉ cho phép role admin
                if (valid && role === "admin") {
                    setAuthorized(true);
                } else {
                    Cookies.remove("token");
                    setAuthorized(false);
                }
            } catch (err) {
                Cookies.remove("token");
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    if (loading) {
        return <div>Checking permissions...</div>; // trạng thái loading
    }

    if (!authorized) {
        return <Navigate to="/adminlogin" replace />;
    }

    return children;
};

export default ProtectedRoute;
