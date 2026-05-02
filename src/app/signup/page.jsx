'use client';

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

const SignUpPage = () => {
    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    const password = watch("password");

    const handleSignUpFunc = async (data) => {
        try {
            const { error } = await authClient.signUp.email({
                name: data.fullName,
                email: data.email,
                password: data.password,
                image: data.photoURL?.trim() || null,   // Send as is, let backend handle
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

                {/* Google Button */}
                <div className="mb-8">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-black font-medium hover:bg-gray-100 transition-all border border-gray-300"
                    >
                        <FcGoogle className="w-5 h-5" />
                        Continue with Google
                    </button>
                </div>

                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit(handleSignUpFunc)}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    {...register("fullName", { required: "Full name is required" })}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:border-[#FFD700]"
                                />
                                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:border-[#FFD700]"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Photo URL (Optional)</label>
                                <input
                                    type="url"
                                    {...register("photoURL")}
                                    placeholder="https://example.com/your-photo.jpg"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:border-[#FFD700]"
                                />
                                <p className="text-xs text-gray-400 mt-1">Leave empty if you don't have one</p>
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
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:border-[#FFD700]"
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
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:border-[#FFD700]"
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-10">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-20 py-3 rounded-xl bg-[#FFD700] text-black font-semibold hover:scale-[1.03] hover:bg-[#ffdf32] transition-all duration-300 disabled:opacity-70"
                        >
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-300 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#FFD700] hover:underline">
                        Login
                    </Link>
                </p>
            </div>

            <Toaster position="top-center" />
        </div>
    );
};

export default SignUpPage;