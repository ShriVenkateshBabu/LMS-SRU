import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signupUser } from "../../store/slices/signupslice";

import SRUlogo from "../../../public/images/sru_logo_new.png";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* =========================
        Redux State
    ========================= */
    const { loading, error, success, validationErrors } = useSelector(
        (state) => state.auth,
    );
   
    /* =========================
        Form State
    ========================= */
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    /* =========================
        Field Errors
    ========================= */
    const [fieldErrors, setFieldErrors] = useState({});

    /* =========================
        Clear Redux Status
    ========================= */
   
    /* =========================
        Backend Errors → UI
    ========================= */
    useEffect(() => {
        if (validationErrors) {
            setFieldErrors(validationErrors);
        }
    }, [validationErrors]);

    /* =========================
        Redirect on Success
    ========================= */
    useEffect(() => {
        console.log("Redux success:", success);
        if (success) {
            navigate("/login", {
                replace: true,
                state: {
                    email,
                    message: "Registration successful! Please login.",
                },
            });
        }
    }, [success, navigate, email]);
    /* =========================
        Submit Handler
    ========================= */
    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = {};

        if (!name.trim()) {
            errors.name = "Full name is required";
        }

        if (!email.trim()) {
            errors.email = "Email is required";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Confirm your password";
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});

        dispatch(
            signupUser({
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            }),
        );
    };

    /* =========================
        UI
    ========================= */
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-3 sm:px-6">
            {/* Card */}
            <div className="w-full max-w-sm sm:max-w-md md:max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* Left Image */}
                <div className="hidden md:flex items-center justify-center bg-indigo-100 p-6">
                    <img
                        src={SRUlogo}
                        alt="SRU Logo"
                        className="max-w-[220px] lg:max-w-xs w-full h-auto"
                    />
                </div>

                {/* Right Form */}
                <div className="p-5 sm:p-8">
                    {/* Mobile Logo */}
                    <div className="md:hidden flex justify-center mb-4">
                        <img
                            src={SRUlogo}
                            alt="SRU Logo"
                            className="w-24 sm:w-28"
                        />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-1">
                        Create Account
                    </h2>

                    <p className="text-center text-gray-500 mb-4">
                        Sign up to get started
                    </p>

                    {/* Global Error */}
                    {error && (
                        <p className="text-red-500 text-sm text-center mb-3">
                            {error}
                        </p>
                    )}

                    {/* Success */}
                    {success && (
                        <p className="text-green-600 text-sm text-center mb-3">
                            Registration successful! Redirecting to login...
                        </p>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />

                            {fieldErrors.name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {fieldErrors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />

                            {fieldErrors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {fieldErrors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />

                            {fieldErrors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {fieldErrors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />

                            {fieldErrors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {fieldErrors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <input type="checkbox" required />

                            <span>
                                I agree to{" "}
                                <a href="#" className="text-indigo-600">
                                    Terms & Conditions
                                </a>
                            </span>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-600 mt-5">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-indigo-600 font-semibold"
                        >
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
