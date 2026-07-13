'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

const SignUpPage = () => {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState("buyer");

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    const password = watch("password");

    const handleSignUpFunc = async (data) => {
        try {
            const { error } = await authClient.signUp.email({
                name: data.fullName,
                email: data.email,
                password: data.password,
                image: data.photoURL?.trim() || null,
                role: selectedRole,
                callbackURL: "/login",
            });

            if (error) {
                toast.error(error.message || "Failed to create account", { duration: 5000 });
                return;
            }

            toast.success("Account created successfully! Please login.", { 
                duration: 5000 
            });

            setTimeout(() => {
                router.push("/login");
            }, 1500);

        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Something went wrong. Please try again.", { duration: 5000 });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",           
            });
        } catch (error) {
            toast.error("Google sign up failed", { duration: 4000 });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-zinc-800 to-gray-700 px-4 py-10">

            <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-8 md:p-10">

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white">Create Account</h1>
                    <p className="text-gray-300 mt-2 text-sm">
                        Join us and explore premium marble & tile collections
                    </p>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit(handleSignUpFunc)}>

                    {/* Attractively Designed Role Cards Selector - Centered */}
                    <div className="max-w-md mx-auto mb-8 border-b border-white/10 pb-8">
                        <label className="block text-sm font-medium text-gray-200 mb-3 text-center">Register as</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setSelectedRole("buyer")}
                                className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer h-28 outline-none ${
                                    selectedRole === "buyer"
                                        ? "border-[#FFD700] bg-[#FFD700]/10 text-white shadow-lg shadow-[#FFD700]/5"
                                        : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                                }`}
                            >
                                <span className="text-2xl">🛍️</span>
                                <div>
                                    <h3 className="font-semibold text-sm text-white">Buyer</h3>
                                    <p className="text-[10px] text-gray-400 mt-0.5">Browse & purchase tiles</p>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedRole("shop_owner")}
                                className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer h-28 outline-none ${
                                    selectedRole === "shop_owner"
                                        ? "border-[#FFD700] bg-[#FFD700]/10 text-white shadow-lg shadow-[#FFD700]/5"
                                        : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                                }`}
                            >
                                <span className="text-2xl">🏬</span>
                                <div>
                                    <h3 className="font-semibold text-sm text-white">Shop Owner</h3>
                                    <p className="text-[10px] text-gray-400 mt-0.5">Manage & sell products</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    {...register("fullName", { required: "Full name is required" })}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:border-[#FFD700] outline-none"
                                />
                                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:border-[#FFD700] outline-none"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Photo URL (Optional)</label>
                                <input
                                    type="url"
                                    {...register("photoURL")}
                                    placeholder="https://example.com/your-photo.jpg"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:border-[#FFD700] outline-none"
                                />
                                <p className="text-xs text-gray-400 mt-1">Leave empty if you do not have one</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                                    })}
                                    placeholder="Create a password"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:border-[#FFD700] outline-none"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: (value) => value === password || "Passwords do not match"
                                    })}
                                    placeholder="Confirm your password"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:border-[#FFD700] outline-none"
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-10">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-20 py-3 rounded-xl bg-[#FFD700] text-black font-semibold hover:scale-[1.03] hover:bg-[#ffdf32] transition-all duration-300 disabled:opacity-70 cursor-pointer"
                        >
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </button>
                    </div>
                </form>

                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                {/* Google Button */}
                <div className="mb-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-black font-medium hover:bg-gray-100 transition-all border border-gray-300 cursor-pointer"
                    >
                        <FcGoogle className="w-5 h-5" />
                        Continue with Google
                    </button>
                </div>

                <p className="text-center text-sm text-gray-300 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#FFD700] hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>

            <Toaster position="top-center" />
        </div>
    );
};

export default SignUpPage;