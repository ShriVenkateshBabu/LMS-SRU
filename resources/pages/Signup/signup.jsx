import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearStatus } from "../../store/slices/signupslice";

import SRUlogo from "../../../public/images/sru_logo_new.png";

const Signup = () => {
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector((state) => state.auth);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    /* =========================
        Clear status on mount
    ========================= */
    useEffect(() => {
        dispatch(clearStatus());
    }, [dispatch]);

    /* =========================
        Submit Handler
    ========================= */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        dispatch(
            signupUser({
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            }),
        );
    };

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

                    <p className="text-center text-gray-500 mb-4 text-sm sm:text-base">
                        Sign up to get started
                    </p>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm text-center mb-3">
                            {error}
                        </p>
                    )}

                    {/* Success Message */}
                    {success && (
                        <p className="text-green-600 text-sm text-center mb-3">
                            Account created successfully!
                        </p>
                    )}

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 sm:space-y-5"
                    >
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                required
                                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
                            />
                        </div>

                        {/* Terms */}
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                            <input type="checkbox" required />

                            <span>
                                I agree to the{" "}
                                <a
                                    href="#"
                                    className="text-indigo-600 hover:underline"
                                >
                                    Terms & Conditions
                                </a>
                            </span>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold transition shadow-md text-sm sm:text-base disabled:opacity-60"
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-xs sm:text-sm text-gray-600 mt-5">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-indigo-600 font-semibold hover:underline"
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
