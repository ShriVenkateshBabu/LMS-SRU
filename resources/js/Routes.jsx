import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "../pages/Login/Login.jsx";
import Signup from "../pages/Signup/signup.jsx";
import Dashboard from "../pages/Dashboard/dashboard.jsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}
