"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "@/lib/auth-client";
import { FaSearch, FaEye, FaThLarge, FaList, FaTimes, FaCheck, FaTimesCircle } from "react-icons/fa";
import { BiSort } from "react-icons/bi";

const AllTiles = () => {
    const [tiles, setTiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
    const [quickViewTile, setQuickViewTile] = useState(null);

    const categories = ["All", "Ceramic", "Porcelain", "Marble", "Mosaic", "Wood-Look"];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.06
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.4, ease: "easeOut" } 
        }
    };

    useEffect(() => {
        const getTiles = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API_BASE_URL}/api/tiles`, {
                    cache: "no-store",
                });

                if (!res.ok) throw new Error("Failed to load tiles");

                const data = await res.json();
                setTiles(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getTiles();
    }, []);

    const filteredAndSortedTiles = useMemo(() => {
        let result = [...tiles];

        // Search filter
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter((tile) =>
                tile.title?.toLowerCase().includes(term) ||
                tile.description?.toLowerCase().includes(term) ||
                tile.price?.toString().includes(term)
            );
        }

        // Category filter
        if (selectedCategory !== "All") {
            result = result.filter((tile) =>
                tile.title?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                tile.description?.toLowerCase().includes(selectedCategory.toLowerCase())
            );
        }

        // Sorting
        if (sortBy === "price-low") {
            result.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
        } else if (sortBy === "price-high") {
            result.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
        } else if (sortBy === "title") {
            result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        }

        return result;
    }, [tiles, searchTerm, selectedCategory, sortBy]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-zinc-900 via-gray-900 to-black text-white px-4 md:px-8 py-12">
            <div className="max-w-7xl mx-auto mb-10">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent mb-4">
                        Premium Tile Collection
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg">
                        Explore hand-crafted floor, wall, and accent tiles designed for modern architectural spaces.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto mb-8">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                        <FaSearch className="h-5 w-5" />
                    </div>

                    <input
                        type="text"
                        placeholder="Search tiles by name, finish, or price..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-800/80 border border-zinc-700/80 focus:border-amber-400 
                                   text-white placeholder-zinc-400 rounded-2xl py-3.5 pl-12 pr-10 
                                   focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all
                                   text-base backdrop-blur-xl shadow-lg"
                    />

                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute inset-y-0 right-4 flex items-center text-zinc-400 hover:text-white transition"
                        >
                            <FaTimes className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Filters & Control Toolbar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/40 backdrop-blur-md">
                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition whitespace-nowrap ${
                                    selectedCategory === cat
                                        ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20"
                                        : "bg-zinc-800 text-gray-300 hover:bg-zinc-700 hover:text-white"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sorting & Layout View Toggle */}
                    <div className="flex items-center gap-3 justify-between md:justify-end">
                        <div className="flex items-center gap-2 bg-zinc-800/80 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-gray-300">
                            <BiSort className="text-amber-400 w-4 h-4" />
                            <span className="hidden sm:inline">Sort:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-white focus:outline-none cursor-pointer"
                            >
                                <option value="default" className="bg-zinc-900 text-white">Default</option>
                                <option value="price-low" className="bg-zinc-900 text-white">Price: Low to High</option>
                                <option value="price-high" className="bg-zinc-900 text-white">Price: High to Low</option>
                                <option value="title" className="bg-zinc-900 text-white">Name: A to Z</option>
                            </select>
                        </div>

                        {/* View Switcher */}
                        <div className="flex items-center bg-zinc-800/80 border border-zinc-700 rounded-xl p-1">
                            <button
                                onClick={() => setViewMode("grid")}
                                title="Grid View"
                                className={`p-2 rounded-lg transition ${
                                    viewMode === "grid" ? "bg-amber-500 text-black font-bold" : "text-gray-400 hover:text-white"
                                }`}
                            >
                                <FaThLarge className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                title="List View"
                                className={`p-2 rounded-lg transition ${
                                    viewMode === "list" ? "bg-amber-500 text-black font-bold" : "text-gray-400 hover:text-white"
                                }`}
                            >
                                <FaList className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-3 text-xs text-gray-400 text-right">
                    Showing <span className="text-amber-400 font-bold">{filteredAndSortedTiles.length}</span> items
                </div>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative w-16 h-16">
                        <div className="absolute w-full h-full border-4 border-amber-500/20 rounded-full"></div>
                        <div className="absolute w-full h-full border-4 border-t-amber-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="mt-6 text-zinc-300 text-base font-medium animate-pulse">
                        Loading tiles catalog...
                    </p>
                </div>
            )}

            {error && (
                <p className="text-center text-red-400 text-lg py-12">{error}</p>
            )}

            {!loading && !error && (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={
                        viewMode === "grid"
                            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
                            : "flex flex-col gap-4 max-w-5xl mx-auto"
                    }
                >
                    {filteredAndSortedTiles.length > 0 ? (
                        filteredAndSortedTiles.map((tile) => (
                            <motion.div
                                key={tile.id}
                                variants={cardVariants}
                                whileHover={{ y: viewMode === "grid" ? -4 : 0 }}
                                className={`group rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl overflow-hidden transition hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 ${
                                    viewMode === "list" ? "flex flex-col sm:flex-row items-center p-4 gap-6" : "flex flex-col"
                                }`}
                            >
                                <div className={`relative overflow-hidden ${viewMode === "list" ? "w-full sm:w-48 h-40 rounded-xl flex-shrink-0" : "w-full h-48"}`}>
                                    <Image
                                        src={tile.image}
                                        alt={tile.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    {/* Quick View Hover Button */}
                                    <button
                                        onClick={() => setQuickViewTile(tile)}
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white gap-2 font-medium text-xs backdrop-blur-xs"
                                    >
                                        <FaEye className="w-4 h-4 text-amber-400" /> Quick Preview
                                    </button>
                                </div>

                                <div className={`flex flex-col flex-grow ${viewMode === "list" ? "w-full" : "p-5"}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                                            {tile.title}
                                        </h2>
                                        <span
                                            className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                                                tile.inStock
                                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                            }`}
                                        >
                                            {tile.inStock ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                                        {tile.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-800/80">
                                        <div>
                                            <span className="text-xs text-gray-500 block">Price / sq ft</span>
                                            <span className="text-xl font-extrabold text-amber-400">
                                                ${tile.price}
                                            </span>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setQuickViewTile(tile)}
                                                className="p-2.5 rounded-xl border border-zinc-700 bg-zinc-800 text-gray-300 hover:text-white hover:border-gray-500 transition text-xs"
                                                title="Quick View"
                                            >
                                                <FaEye />
                                            </button>
                                            <Link href={`/all-tiles/${tile.id}`}>
                                                <button className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition shadow-md shadow-amber-500/20">
                                                    View Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800">
                            <p className="text-gray-400 text-lg">No tiles found matching your current filter.</p>
                            <button
                                onClick={() => { setSearchTerm(""); setSelectedCategory("All"); setSortBy("default"); }}
                                className="mt-4 px-6 py-2.5 bg-amber-500 text-black font-bold text-sm rounded-xl hover:bg-amber-400 transition"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                </motion.div>
            )}

            {/* Quick View Modal */}
            <AnimatePresence>
                {quickViewTile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setQuickViewTile(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setQuickViewTile(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full bg-zinc-800 border border-zinc-700 transition"
                            >
                                <FaTimes className="w-4 h-4" />
                            </button>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                                <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-zinc-800">
                                    <Image
                                        src={quickViewTile.image}
                                        alt={quickViewTile.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div>
                                    <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
                                        Quick Preview
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-white mb-2">{quickViewTile.title}</h3>
                                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{quickViewTile.description}</p>

                                    <div className="space-y-2 mb-6 text-xs text-gray-400">
                                        <div className="flex items-center gap-2">
                                            {quickViewTile.inStock ? (
                                                <FaCheck className="text-green-400" />
                                            ) : (
                                                <FaTimesCircle className="text-red-400" />
                                            )}
                                            <span>{quickViewTile.inStock ? "Available in Stock" : "Currently Out of Stock"}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                                        <div>
                                            <span className="text-xs text-gray-500 block">Unit Price</span>
                                            <span className="text-2xl font-extrabold text-amber-400">${quickViewTile.price}</span>
                                        </div>

                                        <Link href={`/all-tiles/${quickViewTile.id}`}>
                                            <button
                                                onClick={() => setQuickViewTile(null)}
                                                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition shadow-lg shadow-amber-500/20"
                                            >
                                                Full Details & Order
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AllTiles;