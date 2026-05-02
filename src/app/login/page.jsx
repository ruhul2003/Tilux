'use client';

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

const LoginPage = () => {

    const {register, handleSubmit,watch ,formState:{errors}} = useForm(); 
    const handleLoginFunc = (data) => {
       console.log(data,"data");
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-zinc-800 to-gray-700 px-4">

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-8">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome Back
                    </h1>
                    <p className="text-gray-300 mt-2 text-sm">
                        Login to access your premium tile collection
                    </p>
                </div>

                {/* Form Design Only */}
                <form className="space-y-5" onSubmit={handleSubmit(handleLoginFunc)}>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <Link href="#" className="text-sm text-[#FFD700] hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#FFD700] text-black font-semibold hover:scale-[1.02] hover:bg-[#ffdf32] transition-all duration-300"
                    >
                        Login
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-300 mt-6">
                    Don’t have an account?{" "}
                    <Link href="/signup" className="text-[#FFD700] hover:underline">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default LoginPage;