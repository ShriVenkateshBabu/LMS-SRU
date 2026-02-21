import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearStatus } from "../../store/slices/authslice";
import { useLocation, useNavigate } from "react-router-dom";

import SRUlogo from "../../../public/images/sru_logo_new.png";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, success, user, token } = useSelector(
        (state) => state.auth,
    );

    const [email, setEmail] = useState(location.state?.email || "");
    const [password, setPassword] = useState("");

    const successMessage = location.state?.message || "";

    useEffect(() => {
        dispatch(clearStatus());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            loginUser({
                email,
                password,
            }),
        );
    };

    useEffect(() => {
        if (token) {
            navigate("/dashboard", { replace: true });
        }
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-3 sm:px-6">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div className="hidden md:flex items-center justify-center bg-indigo-100 p-6">
                    <img
                        src={SRUlogo}
                        alt="SRU Logo"
                        className="max-w-[220px] lg:max-w-xs w-full h-auto"
                    />
                </div>

                <div className="p-5 sm:p-8">
                    <div className="md:hidden flex justify-center mb-4">
                        <img
                            src={SRUlogo}
                            alt="SRU Logo"
                            className="w-24 sm:w-28"
                        />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-1">
                        Welcome Back
                    </h2>
                    <p className="text-center text-gray-500 mb-5">
                        Login to continue
                    </p>

                    {successMessage && (
                        <p className="text-green-600 text-sm text-center mb-3">
                            {successMessage}
                        </p>
                    )}

                    {error && (
                        <p className="text-red-500 text-sm text-center mb-3">
                            {error}
                        </p>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 sm:space-y-5"
                    >
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2.5 border rounded-lg"
                        />
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2.5 border rounded-lg"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-5">
                        Don’t have an account?{" "}
                        <a
                            href="/register"
                            className="text-indigo-600 font-semibold"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
