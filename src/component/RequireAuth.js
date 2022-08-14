import { useLocation, Outlet, Navigate } from "react-router-dom";

// CUSTOMER, ENGINEER, ADMIN
const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();

    return (
        localStorage.getItem("userTypes") === allowedRoles[0] ? 
            <Outlet /> : localStorage.getItem("userTypes") ? (<Navigate to="/unauthorised" state={{ from: location }} replace />) : (<Navigate to="/" state={{ from: location }} replace />)
    );
}

export default RequireAuth;


// admin
// customer : replace : => unauthorise 
