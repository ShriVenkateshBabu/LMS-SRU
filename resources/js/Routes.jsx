import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "../pages/Login/Login.jsx";
import Signup from "../pages/Signup/signup.jsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}
