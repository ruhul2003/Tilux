"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, API_BASE_URL } from "@/lib/auth-client";
import { toast, Toaster } from "react-hot-toast";

const TileDetails = ({ params: paramsPromise }) => {
    const params = use(paramsPromise);
    const { tileId } = params;

    const { data: session } = useSession();
    const isShopOwner = session?.user?.role === "shop_owner";

    const [tile, setTile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [ordering, setOrdering] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
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


    useEffect(() => {
        const fetchTile = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `${API_BASE_URL}/api/tiles/${tileId}`
                );

                if (!res.ok) {
                    throw new Error("Tile not found.");
                }

                const data = await res.json();
                setTile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (tileId) fetchTile();
    }, [tileId]);

    const handleTileInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTileFormData({
            ...tileFormData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleOpenEditModal = () => {
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
        setShowEditModal(true);
    };

    const handleSaveTile = async (e) => {
        e.preventDefault();
        if (!tileFormData.title || !tileFormData.image || !tileFormData.price) {
            toast.error("Title, Image URL, and Price are required.");
            return;
        }

        const token = localStorage.getItem("tilux_token");
        try {
            const res = await fetch(`${API_BASE_URL}/api/tiles/${tileId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(tileFormData)
            });

            if (res.ok) {
                toast.success("Tile updated successfully!");
                setShowEditModal(false);
                setTile({
                    ...tile,
                    ...tileFormData,
                    price: Number(tileFormData.price)
                });
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to update tile");
            }
        } catch (err) {
            toast.error("Network error updating tile");
        }
    };
    const handlePlaceOrder = async () => {
        if (!session?.user) {
            toast.error("Please login to place an order");
            return;
        }

        setOrdering(true);
        const token = localStorage.getItem("tilux_token");
        try {
            const res = await fetch(`${API_BASE_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ tileId, quantity: 1 })
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Order placed successfully! You can track it in My Orders.");
            } else {
                toast.error(data.message || "Failed to place order");
            }
        } catch (err) {
            toast.error("Network error placing order");
        } finally {
            setOrdering(false);
        }
    };


    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-zinc-800 to-gray-700 text-white">
                Loading...
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-zinc-800 to-gray-700 text-white">
                <p className="text-red-300 mb-4">{error}</p>
                <Link href="/all-tiles" className="text-sm text-zinc-300 hover:text-white">
                    Back
                </Link>
            </div>
        );

    if (!tile) return null;

    return (
        <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 flex items-center justify-center p-6 text-white">

            {/* GLASS CARD */}
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">

                <div className="relative w-full h-[420px] md:h-[600px] rounded-2xl overflow-hidden animate-fade-in">
                    <Image
                        src={tile.image}
                        alt={tile.title}
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
                </div>

                <div className="flex flex-col justify-center">

                    <Link
                        href="/all-tiles"
                        className="text-xs text-zinc-400 hover:text-white mb-6"
                    >
                        ← Back to Collection
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-semibold text-white">
                        {tile.title}
                    </h1>

                    <p className="text-sm text-zinc-300 mt-2">
                        Category: <span className="capitalize">{tile.category || "General"}</span>
                    </p>

                    <p className="mt-6 text-zinc-200 leading-relaxed">
                        {tile.description}
                    </p>

                    <div className="mt-8 text-sm text-zinc-300 space-y-1.5 border-t border-white/10 pt-6">
                        <p><span className="text-zinc-400">Material:</span> {tile.material || "N/A"}</p>
                        <p><span className="text-zinc-400">Dimensions:</span> {tile.dimensions || "N/A"}</p>
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                        <p className="text-2xl font-semibold text-white">
                            ${tile.price}{" "}
                            <span className="text-sm text-zinc-400">
                                {tile.currency || "USD"}
                            </span>
                        </p>

                        {isShopOwner ? (
                            <button
                                onClick={handleOpenEditModal}
                                className="px-8 py-3 bg-[#FFD700] text-black font-bold rounded-full hover:scale-105 hover:bg-yellow-400 transition cursor-pointer"
                            >
                                Edit Product
                            </button>
                        ) : (
                            <button
                                disabled={!tile.inStock || ordering}
                                onClick={handlePlaceOrder}
                                className={`px-8 py-3 rounded-full text-sm font-semibold transition border cursor-pointer ${
                                    tile.inStock
                                        ? "bg-white text-black hover:bg-zinc-200 border-white hover:scale-105"
                                        : "bg-white/10 text-zinc-500 border-white/10 cursor-not-allowed"
                                }`}
                            >
                                {ordering ? "Placing Order..." : tile.inStock ? "Order Now" : "Out of Stock"}
                            </button>
                        )}
                    </div>

                </div>
            </div>

            {/* EDIT PRODUCT MODAL */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-3xl max-w-2xl w-full p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                        >
                            ✕
                        </button>
                        
                        <h3 className="text-2xl font-bold text-white mb-6">Edit Tile Details</h3>

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
                                    onClick={() => setShowEditModal(false)}
                                    className="px-6 py-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-2.5 bg-[#FFD700] text-black font-bold rounded-xl hover:bg-yellow-400 transition"
                                >
                                    Save Changes
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

export default TileDetails;