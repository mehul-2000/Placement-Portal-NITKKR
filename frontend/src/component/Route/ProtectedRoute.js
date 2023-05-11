import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ isAdmin, isStudent }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    if(loading === false) {
        if(isAuthenticated === false) {
            return <Navigate to="/login" />;
        }
        if(isAdmin === true && (user.role !== "admin" && user.role !== "spc")) {
            return <Navigate to="/login" />;
        }
        if(isStudent === true && (user.role !== "student" && user.role !== "spc")) {
            return <Navigate to="/login" />;
        }
        return <Outlet />
    }
}

export default ProtectedRoute