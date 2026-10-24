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
            <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-zinc-400 font-light text-sm tracking-widest uppercase">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    Loading surface specifications...
                </div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#09090b] text-zinc-100 p-6">
                <p className="text-red-400 text-sm font-light mb-4">{error}</p>
                <Link href="/all-tiles" className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition">
                    &larr; Return to catalog
                </Link>
            </div>
        );

    if (!tile) return null;

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 py-12 sm:py-20 px-4 sm:px-8 lg:px-12 flex items-center justify-center">

            {/* ULTRA WIDE CONTAINER */}
            <div className="w-full max-w-[1550px] grid lg:grid-cols-12 gap-10 lg:gap-14 p-6 sm:p-10 lg:p-12 rounded-3xl border border-white/[0.08] bg-[#121215]/80 backdrop-blur-2xl shadow-2xl">

                {/* LEFT HERO IMAGE CANVAS */}
                <div className="lg:col-span-7 relative w-full h-[400px] sm:h-[520px] lg:h-[680px] rounded-2xl overflow-hidden border border-white/[0.08] bg-zinc-950 group">
                    <Image
                        id={tile.id}
                        src={tile.image}
                        alt={tile.title}
                        fill
                        className="card-img object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ viewTransitionName: tile.id }}
                        priority
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
                            {tile.category || "Collection"}
                        </span>
                    </div>
                </div>

                {/* RIGHT PRODUCT SPECIFICATIONS */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                        <Link
                            href="/all-tiles"
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition mb-6"
                        >
                            &larr; Back to collection
                        </Link>

                        <span className="text-[10px] font-semibold tracking-[0.25em] text-amber-300 uppercase block mb-2">
                            Architectural Porcelain
                        </span>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight leading-tight">
                            {tile.title}
                        </h1>

                        <p className="mt-4 text-zinc-400 text-sm font-light leading-relaxed">
                            {tile.description}
                        </p>

                        {/* SPECIFICATION TILES */}
                        <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-6">
                            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Material</span>
                                <span className="text-xs sm:text-sm font-light text-zinc-200 mt-0.5 block">{tile.material || "Refined Porcelain"}</span>
                            </div>
                            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Dimensions</span>
                                <span className="text-xs sm:text-sm font-light text-zinc-200 mt-0.5 block">{tile.dimensions || "Standard Sheet"}</span>
                            </div>
                            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Classification</span>
                                <span className="text-xs sm:text-sm font-light text-zinc-200 mt-0.5 block capitalize">{tile.category || "Interior / Exterior"}</span>
                            </div>
                            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Inventory</span>
                                <span className="text-xs sm:text-sm font-light text-zinc-200 mt-0.5 flex items-center gap-1.5">
                                    <span className={`w-1.5 h-1.5 rounded-full ${tile.inStock ? "bg-emerald-400" : "bg-red-400"}`}></span>
                                    {tile.inStock ? "Ready to ship" : "Temporarily reserve"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* PRICING & CALL TO ACTION */}
                    <div className="mt-10 pt-6 border-t border-white/[0.08] flex items-center justify-between gap-4">
                        <div>
                            <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Unit Investment</span>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                                <span className="text-2xl sm:text-3xl font-light text-amber-300">
                                    ${tile.price}
                                </span>
                                <span className="text-xs text-zinc-400">
                                    / sq ft
                                </span>
                            </div>
                        </div>

                        {isShopOwner ? (
                            <button
                                onClick={handleOpenEditModal}
                                className="px-6 sm:px-8 py-3 bg-white hover:bg-amber-300 text-zinc-950 font-semibold rounded-full text-xs uppercase tracking-wider transition cursor-pointer shadow-sm"
                            >
                                Edit Product
                            </button>
                        ) : (
                            <button
                                disabled={!tile.inStock || ordering}
                                onClick={handlePlaceOrder}
                                className={`px-6 sm:px-8 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition cursor-pointer border ${
                                    tile.inStock
                                        ? "bg-white text-zinc-950 hover:bg-amber-300 border-white shadow-sm"
                                        : "bg-white/[0.04] text-zinc-500 border-white/10 cursor-not-allowed"
                                }`}
                            >
                                {ordering ? "Placing Order..." : tile.inStock ? "Order Material" : "Out of Stock"}
                            </button>
                        )}
                    </div>

                </div>
            </div>

            {/* EDIT PRODUCT MODAL */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#121215] border border-white/[0.08] rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center transition text-sm cursor-pointer"
                        >
                            ✕
                        </button>
                        
                        <div className="mb-6">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">Shop Management</span>
                            <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mt-1">Edit Tile Specifications</h3>
                        </div>

                        <form onSubmit={handleSaveTile} className="space-y-4 text-white">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={tileFormData.title}
                                        onChange={handleTileInputChange}
                                        className="w-full px-3.5 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-white text-xs focus:border-amber-300/50 outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">Price ($) *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        required
                                        value={tileFormData.price}
                                        onChange={handleTileInputChange}
                                        className="w-full px-3.5 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-white text-xs focus:border-amber-300/50 outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">Image URL *</label>
                                    <input
                                        type="url"
                                        name="image"
                                        required
                                        value={tileFormData.image}
                                        onChange={handleTileInputChange}
                                        className="w-full px-3.5 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-white text-xs focus:border-amber-300/50 outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={tileFormData.category}
                                        onChange={handleTileInputChange}
                                        className="w-full px-3.5 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-white text-xs focus:border-amber-300/50 outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">Dimensions</label>
                                    <input
                                        type="text"
                                        name="dimensions"
                                        value={tileFormData.dimensions}
                                        onChange={handleTileInputChange}
                                        className="w-full px-3.5 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-white text-xs focus:border-amber-300/50 outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">Material</label>
                                    <input
                                        type="text"
                                        name="material"
                                        value={tileFormData.material}
                                        onChange={handleTileInputChange}
                                        className="w-full px-3.5 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-white text-xs focus:border-amber-300/50 outline-none transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">Description</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    value={tileFormData.description}
                                    onChange={handleTileInputChange}
                                    className="w-full px-3.5 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-white text-xs focus:border-amber-300/50 outline-none resize-none transition"
                                ></textarea>
                            </div>

                            <div className="flex items-center gap-3 py-1">
                                <input
                                    type="checkbox"
                                    id="inStock"
                                    name="inStock"
                                    checked={tileFormData.inStock}
                                    onChange={handleTileInputChange}
                                    className="w-4 h-4 accent-amber-300 rounded cursor-pointer"
                                />
                                <label htmlFor="inStock" className="text-xs font-light text-zinc-300 select-none cursor-pointer">Product is in stock and available for immediate shipping</label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-5 py-2 border border-white/10 bg-white/[0.02] text-zinc-300 text-xs uppercase tracking-wider rounded-full hover:bg-white/[0.06] transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-white hover:bg-amber-300 text-zinc-950 font-semibold text-xs uppercase tracking-wider rounded-full transition cursor-pointer shadow-sm"
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