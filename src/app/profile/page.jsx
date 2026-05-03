"use client";

import React, { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

const ProfilePage = () => {
    const { data: session, isPending } = useSession();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        image: "",
    });

    // DEFAULT AVATAR
    const getDefaultAvatar = (name) =>
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name || "User"
        )}&background=FFD700&color=000000&size=128`;

    // SAFE IMAGE SOURCE
    const safeImageSrc =
        formData.image?.trim() ||
        session?.user?.image?.trim() ||
        getDefaultAvatar(formData.name || session?.user?.name);

    useEffect(() => {
        if (session?.user) {
            setFormData({
                name: session.user.name || "",
                image: session.user.image || "",
            });
        }
    }, [session]);

    // INPUT CHANGE
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // SAVE PROFILE
    const handleSave = async () => {
        if (!formData.name?.trim()) {
            toast.error("Name is required");
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.updateUser({
                name: formData.name,
                image: formData.image?.trim() || null,
            });

            if (error) {
                toast.error(
                    error.message || "Failed to update profile"
                );
            } else {
                toast.success("Profile updated successfully!");

                setIsEditing(false);

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleImageError = (e) => {
        e.currentTarget.src = getDefaultAvatar(
            formData.name || session?.user?.name
        );
    };

    // ==================== NOT LOGGED IN ====================
    if (!isPending && !session?.user) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 flex items-center justify-center px-4">

                <div className="max-w-md w-full text-center">

                    <div className="mb-8">
                        <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7"
                                />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-4">
                        Access Denied
                    </h1>

                    <p className="text-gray-400 text-lg mb-10">
                        You need to be logged in to view your profile.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">

                        <Link
                            href="/login"
                            className="px-8 py-4 bg-[#FFD700] text-black font-bold rounded-2xl hover:bg-yellow-400 transition"
                        >
                            Login Now
                        </Link>

                        <Link
                            href="/signup"
                            className="px-8 py-4 bg-white/10 text-white font-medium rounded-2xl hover:bg-white/20 transition"
                        >
                            Create Account
                        </Link>
                    </div>

                    <p className="text-gray-500 mt-8 text-sm">
                        Don&apos;t have an account? Sign up to get started.
                    </p>
                </div>
            </div>
        );
    }

    // ==================== LOADING ====================
    if (isPending) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 flex items-center justify-center text-white">
                Loading profile...
            </div>
        );
    }

    // ==================== PROFILE PAGE ====================
    return (
        <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 py-12 px-4">

            <div className="max-w-3xl mx-auto">

                <h1 className="text-4xl font-bold text-white text-center mb-10">
                    My Profile
                </h1>

                <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

                    <div className="flex flex-col items-center mb-10">

                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#FFD700]">

                            <Image
                                src={safeImageSrc}
                                alt={session.user.name || "User"}
                                fill
                                className="object-cover"
                                onError={handleImageError}
                                unoptimized
                            />
                        </div>

                        {isEditing && (
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Enter photo URL (optional)"
                                className="mt-4 w-full max-w-xs px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:border-[#FFD700] outline-none"
                            />
                        )}
                    </div>

                    {/* USER INFO */}
                    <div className="space-y-6 max-w-md mx-auto">

                        {/* NAME */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Full Name
                            </label>

                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:border-[#FFD700] outline-none"
                                />
                            ) : (
                                <p className="text-2xl font-semibold text-white">
                                    {session.user.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Email Address
                            </label>

                            <p className="text-lg text-gray-300 bg-white/5 px-5 py-3 rounded-2xl">
                                {session.user.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-12 max-w-md mx-auto">

                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex-1 py-4 bg-[#FFD700] text-black font-bold rounded-2xl hover:bg-yellow-400 transition disabled:opacity-70"
                                >
                                    {loading
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>

                                <button
                                    onClick={() =>
                                        setIsEditing(false)
                                    }
                                    className="flex-1 py-4 bg-white/10 text-white font-medium rounded-2xl hover:bg-white/20 transition"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() =>
                                    setIsEditing(true)
                                }
                                className="flex-1 py-4 bg-[#FFD700] text-black font-bold rounded-2xl hover:bg-yellow-400 transition"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <Toaster position="top-center" />
        </div>
    );
};

export default ProfilePage;