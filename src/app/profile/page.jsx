"use client";

import React, { useState, useEffect } from "react";
import { useSession, authClient, API_BASE_URL } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";


const ProfilePage = () => {
    const { data: session, isPending } = useSession();

    // Profile state
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
    });

    // Product Management state (Shop Owner)
    const [tiles, setTiles] = useState([]);
    const [tilesLoading, setTilesLoading] = useState(false);
    const [showTileModal, setShowTileModal] = useState(false);
    const [editingTile, setEditingTile] = useState(null);
    const [tileFormData, setTileFormData] = useState({
        title: "",
        description: "",
        image: "",
        category: "",
        price: "",
        dimensions: "",
        material: "",
        inStock: true
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

            // Fetch tiles for management if Shop Owner
            if (session.user.role === "shop_owner") {
                fetchTiles();
            }
        }
    }, [session]);

    const fetchTiles = async () => {
        setTilesLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/tiles`);
            if (res.ok) {
                const data = await res.json();
                setTiles(data);
            }
        } catch (err) {
            console.error("Error fetching tiles:", err);
        } finally {
            setTilesLoading(false);
        }
    };

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
                toast.error(error.message || "Failed to update profile");
            } else {
                toast.success("Profile updated successfully!");
                setIsEditing(false);
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // ==================== TILE CRUD OPERATIONS ====================
    const handleTileInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTileFormData({
            ...tileFormData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleOpenAddTileModal = () => {
        setEditingTile(null);
        setTileFormData({
            title: "",
            description: "",
            image: "",
            category: "",
            price: "",
            dimensions: "",
            material: "",
            inStock: true
        });
        setShowTileModal(true);
    };

    const handleOpenEditTileModal = (tile) => {
        setEditingTile(tile);
        setTileFormData({
            title: tile.title || "",
            description: tile.description || "",
            image: tile.image || "",
            category: tile.category || "",
            price: tile.price || "",
            dimensions: tile.dimensions || "",
            material: tile.material || "",
            inStock: tile.inStock !== undefined ? tile.inStock : true
        });
        setShowTileModal(true);
    };

    const handleSaveTile = async (e) => {
        e.preventDefault();
        if (!tileFormData.title || !tileFormData.image || !tileFormData.price) {
            toast.error("Title, Image URL, and Price are required.");
            return;
        }

        const token = localStorage.getItem("tilux_token");
        const method = editingTile ? "PUT" : "POST";
        const url = editingTile 
            ? `${API_BASE_URL}/api/tiles/${editingTile.id}` 
            : `${API_BASE_URL}/api/tiles`;

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(tileFormData)
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(editingTile ? "Tile updated successfully!" : "Tile created successfully!");
                setShowTileModal(false);
                fetchTiles();
            } else {
                toast.error(data.message || "Failed to save tile");
            }
        } catch (err) {
            toast.error("Network error saving tile");
        }
    };

    const handleDeleteTile = async (tileId) => {
        if (!confirm("Are you sure you want to delete this tile?")) return;

        const token = localStorage.getItem("tilux_token");
        try {
            const res = await fetch(`${API_BASE_URL}/api/tiles/${tileId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.ok) {
                toast.success("Tile deleted successfully!");
                fetchTiles();
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to delete tile");
            }
        } catch (err) {
            toast.error("Network error deleting tile");
        }
    };

    // ==================== NOT LOGGED IN ====================
    if (!isPending && !session?.user) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="mb-8">
                        <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
                    <p className="text-gray-400 text-lg mb-10">You need to be logged in to view your dashboard.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/login" className="px-8 py-4 bg-[#FFD700] text-black font-bold rounded-2xl hover:bg-yellow-400 transition">
                            Login Now
                        </Link>
                        <Link href="/signup" className="px-8 py-4 bg-white/10 text-white font-medium rounded-2xl hover:bg-white/20 transition">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // ==================== LOADING ====================
    if (isPending) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 flex items-center justify-center text-white">
                Loading profile dashboard...
            </div>
        );
    }

    const isShopOwner = session.user.role === "shop_owner";

    // ==================== PROFILE DASHBOARD PAGE ====================
    return (
        <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 py-12 px-4 md:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto space-y-12"
            >
                <h1 className="text-4xl font-bold text-white text-center mb-6">
                    {isShopOwner ? "Shop Owner Dashboard" : "Buyer Dashboard"}
                </h1>

                {/* Profile Card & Info */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar Column */}
                        <div className="flex flex-col items-center">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#FFD700] shadow-lg">
                                <Image
                                    src={safeImageSrc}
                                    alt={session.user.name || "User"}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            
                            <span className="mt-3 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30">
                                {isShopOwner ? "Shop Owner" : "Buyer"}
                            </span>

                            {isEditing && (
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="Photo URL"
                                    className="mt-4 w-full max-w-xs px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:border-[#FFD700] outline-none text-xs"
                                />
                            )}
                        </div>

                        {/* Details Column */}
                        <div className="flex-1 space-y-6 w-full">
                            <div>
                                <label className="block text-sm text-gray-300 mb-1.5">Full Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:border-[#FFD700] outline-none"
                                    />
                                ) : (
                                    <p className="text-2xl font-bold text-white">{session.user.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-1.5">Email Address</label>
                                <p className="text-lg text-gray-200 bg-white/5 px-4 py-2.5 rounded-xl border border-white/5">
                                    {session.user.email}
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            disabled={loading}
                                            className="px-6 py-2.5 bg-[#FFD700] text-black font-bold rounded-xl hover:bg-yellow-400 transition disabled:opacity-70"
                                        >
                                            {loading ? "Saving..." : "Save"}
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-2.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-2.5 bg-[#FFD700] text-black font-bold rounded-xl hover:bg-yellow-400 transition"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* PRODUCT MANAGEMENT SECTION (SHOP OWNER ONLY) */}
                {isShopOwner && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl space-y-6"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Manage Tile Products</h2>
                                <p className="text-gray-300 text-sm">Add, update, or remove tiles available in the shop.</p>
                            </div>
                            <button
                                onClick={handleOpenAddTileModal}
                                className="px-6 py-3 bg-[#FFD700] text-black font-bold rounded-xl hover:scale-105 transition shadow-lg"
                            >
                                + Add New Tile
                            </button>
                        </div>

                        {tilesLoading ? (
                            <div className="text-center text-white py-10">Loading products list...</div>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-zinc-300 text-sm font-semibold">
                                            <th className="p-4">Image</th>
                                            <th className="p-4">Title</th>
                                            <th className="p-4">Category</th>
                                            <th className="p-4">Price</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-white">
                                        {tiles.map((tile) => (
                                            <tr key={tile.id} className="hover:bg-white/5 transition">
                                                <td className="p-4">
                                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10">
                                                        <Image
                                                            src={tile.image}
                                                            alt={tile.title}
                                                            fill
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    </div>
                                                </td>
                                                <td className="p-4 font-medium">{tile.title}</td>
                                                <td className="p-4 text-sm text-zinc-300">{tile.category || "N/A"}</td>
                                                <td className="p-4">${tile.price}</td>
                                                <td className="p-4">
                                                    <span className={`text-xs px-2 py-1 rounded-full border ${tile.inStock ? "bg-green-500/10 text-green-300 border-green-400/20" : "bg-red-500/10 text-red-300 border-red-400/20"}`}>
                                                        {tile.inStock ? "In Stock" : "Out of Stock"}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => handleOpenEditTileModal(tile)}
                                                            className="px-3 py-1.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-lg text-xs font-semibold hover:bg-blue-500/40 transition"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteTile(tile.id)}
                                                            className="px-3 py-1.5 bg-red-500/20 text-red-300 border border-red-400/30 rounded-lg text-xs font-semibold hover:bg-red-500/40 transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {tiles.length === 0 && (
                                    <div className="text-center py-8 text-zinc-400">No tile products available. Click &quot;Add New Tile&quot; to begin.</div>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </motion.div>

            {/* ADD/EDIT TILE MODAL (SHOP OWNER ONLY) */}
            {showTileModal && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-3xl max-w-2xl w-full p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowTileModal(false)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                        >
                            ✕
                        </button>
                        
                        <h3 className="text-2xl font-bold text-white mb-6">
                            {editingTile ? "Edit Tile Product" : "Add New Tile Product"}
                        </h3>

                        <form onSubmit={handleSaveTile} className="space-y-5 text-white">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={tileFormData.title}
                                        onChange={handleTileInputChange}
                                        placeholder="e.g. Carrara Marble"
                                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#FFD700] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Price ($) *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        required
                                        value={tileFormData.price}
                                        onChange={handleTileInputChange}
                                        placeholder="49.99"
                                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#FFD700] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Image URL *</label>
                                    <input
                                        type="url"
                                        name="image"
                                        required
                                        value={tileFormData.image}
                                        onChange={handleTileInputChange}
                                        placeholder="https://images..."
                                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#FFD700] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={tileFormData.category}
                                        onChange={handleTileInputChange}
                                        placeholder="e.g. marble, granite"
                                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#FFD700] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Dimensions</label>
                                    <input
                                        type="text"
                                        name="dimensions"
                                        value={tileFormData.dimensions}
                                        onChange={handleTileInputChange}
                                        placeholder="e.g. 60x60 cm"
                                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#FFD700] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Material</label>
                                    <input
                                        type="text"
                                        name="material"
                                        value={tileFormData.material}
                                        onChange={handleTileInputChange}
                                        placeholder="e.g. Natural Stone"
                                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#FFD700] outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    value={tileFormData.description}
                                    onChange={handleTileInputChange}
                                    placeholder="Enter tile details and description..."
                                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#FFD700] outline-none resize-none"
                                ></textarea>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="inStock"
                                    name="inStock"
                                    checked={tileFormData.inStock}
                                    onChange={handleTileInputChange}
                                    className="w-5 h-5 accent-[#FFD700]"
                                />
                                <label htmlFor="inStock" className="text-sm font-medium text-gray-300 select-none">Product is In Stock</label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setShowTileModal(false)}
                                    className="px-6 py-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-2.5 bg-[#FFD700] text-black font-bold rounded-xl hover:bg-yellow-400 transition"
                                >
                                    Save Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Toaster position="top-center" />
        </div>
    );
};

export default ProfilePage;