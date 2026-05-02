'use client';

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // Watch password for confirm password validation
    const password = watch("password");

    const handleSignUpFunc = async (data) => {
        console.log(data, "Signup Data");
        
        const { email, fullName, photoURL, password } = data;

        const { data: res, error } = await authClient.signUp.email({
            name: fullName,
            email: email,
            password: password,
            image: photoURL,
            callbackURL: "/",
        });
        
        console.log(res, error);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-zinc-800 to-gray-700 px-4 py-10">

            <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-8 md:p-10">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>
                    <p className="text-gray-300 mt-2 text-sm">
                        Join us and explore premium marble & tile collections
                    </p>
                </div>

                {/* Form with React Hook Form */}
                <form className="space-y-8" onSubmit={handleSubmit(handleSignUpFunc)}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Left Column */}
                        <div className="space-y-5">

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    {...register("fullName", { required: "Full name is required" })}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition"
                                />
                                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Please enter a valid email"
                                        }
                                    })}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Photo URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    {...register("photoURL")}
                                    placeholder="Enter your photo URL"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition"
                                />
                            </div>

                        </div>

                        {/* Right Column */}
                        <div className="space-y-5">

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    placeholder="Create a password"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: (value) =>
                                            value === password || "Passwords do not match"
                                    })}
                                    placeholder="Confirm your password"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition"
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                            </div>

                        </div>

                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-10">
                        <button
                            type="submit"
                            className="px-20 py-3 rounded-xl bg-[#FFD700] text-black font-semibold hover:scale-[1.03] hover:bg-[#ffdf32] transition-all duration-300"
                        >
                            Create Account
                        </button>
                    </div>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-300 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#FFD700] hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default SignUpPage;