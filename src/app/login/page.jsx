'use client';

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const LoginPage = () => {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const handleLoginFunc = async (data) => {
        try {
            const { data: res, error } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
                callbackURL: "/", 
            });

            if (error) {
                toast.error(error.message || "Invalid email or password");
                return;
            }

            toast.success("Login successful! Welcome back.", {
                duration: 5000,
                position: "top-center",
            });
            router.push("/"); 

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("Google login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-zinc-800 to-gray-700 px-4">

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome Back
                    </h1>
                    <p className="text-gray-300 mt-2 text-sm">
                        Login to access your premium tile collection
                    </p>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 mb-6 px-6 py-3.5 rounded-2xl bg-white text-black font-medium hover:bg-gray-100 transition-all border border-gray-300"
                >
                    <span>Continue with Google</span>
                </button>

                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(handleLoginFunc)}>

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
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="flex justify-end">
                        <Link href="/forgot-password" className="text-sm text-[#FFD700] hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-[#FFD700] text-black font-semibold hover:scale-[1.02] hover:bg-[#ffdf32] transition-all duration-300 disabled:opacity-70"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center text-sm text-gray-300 mt-6">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-[#FFD700] hover:underline">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default LoginPage;