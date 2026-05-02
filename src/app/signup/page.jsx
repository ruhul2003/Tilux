'use client';

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            console.log("Form Submitted:", data);
            
            // Placeholder - you can connect to your backend later
            toast.success("Account created successfully! (Demo Mode)");
            
            // Simulate delay then redirect
            setTimeout(() => {
                router.push("/login");
            }, 1500);

        } catch (err) {
            console.error("Error:", err);
            toast.error("Something went wrong. Please try again.");
        }
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

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Left Column */}
                        <div className="space-y-5">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    {...register("name", { required: "Name is required" })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition"
                                />
                                {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email", { required: "Email is required" })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition"
                                />
                                {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>}
                            </div>

                            {/* Photo URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Photo URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    placeholder="Enter your photo URL"
                                    {...register("photoURL")}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition"
                                />
                            </div>

                        </div>

                        {/* Right Column */}
                        <div className="space-y-5">

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                                    })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition"
                                />
                                {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password.message}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm your password"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: (value) => value === password || "Passwords do not match"
                                    })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition"
                                />
                                {errors.confirmPassword && <p className="text-red-400 text-sm mt-2">{errors.confirmPassword.message}</p>}
                            </div>

                        </div>

                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-10">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-20 py-3 rounded-xl bg-[#FFD700] text-black font-semibold hover:scale-[1.03] hover:bg-[#ffdf32] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Creating..." : "Create Account"}
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