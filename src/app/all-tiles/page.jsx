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
        <div className="min-h-screen bg-[#09090b] text-white px-4 sm:px-6 lg:px-12 py-16">
            <div className="max-w-[1600px] mx-auto mb-10">
                <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.25em]">
                        Surface Portfolio
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                        Architectural Slabs & Tiles
                    </h1>
                    <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
                        Filter, inspect, and calculate quantities across our curated directory of marble and porcelain finishes.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md mx-auto mb-10">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                        <FaSearch className="h-4 w-4" />
                    </div>

                    <input
                        type="text"
                        placeholder="Search surfaces by name, finish, or price..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/60 
                                   text-white placeholder-zinc-500 rounded-full py-3 pl-11 pr-10 
                                   focus:outline-none transition-all
                                   text-xs sm:text-sm backdrop-blur-xl"
                    />

                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute inset-y-0 right-4 flex items-center text-zinc-500 hover:text-white transition cursor-pointer text-xs"
                        >
                            <FaTimes className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                {/* Filters & Control Toolbar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121215]/80 p-2.5 sm:p-3 rounded-2xl border border-white/[0.08] backdrop-blur-md">
                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap cursor-pointer border ${
                                    selectedCategory === cat
                                        ? "bg-white text-zinc-950 border-white font-semibold shadow-sm"
                                        : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sorting & Layout View Toggle */}
                    <div className="flex items-center gap-3 justify-between md:justify-end">
                        <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-zinc-300">
                            <BiSort className="text-amber-400 w-3.5 h-3.5" />
                            <span className="hidden sm:inline text-zinc-500">Sort:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-zinc-200 focus:outline-none cursor-pointer text-xs"
                            >
                                <option value="default" className="bg-[#121215] text-white">Default</option>
                                <option value="price-low" className="bg-[#121215] text-white">Price: Low to High</option>
                                <option value="price-high" className="bg-[#121215] text-white">Price: High to Low</option>
                                <option value="title" className="bg-[#121215] text-white">Name: A to Z</option>
                            </select>
                        </div>

                        {/* View Switcher */}
                        <div className="flex items-center bg-white/[0.03] border border-white/[0.08] rounded-xl p-1">
                            <button
                                onClick={() => setViewMode("grid")}
                                title="Grid View"
                                className={`p-1.5 rounded-lg transition cursor-pointer ${
                                    viewMode === "grid" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-500 hover:text-white"
                                }`}
                            >
                                <FaThLarge className="w-3 h-3" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                title="List View"
                                className={`p-1.5 rounded-lg transition cursor-pointer ${
                                    viewMode === "list" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-500 hover:text-white"
                                }`}
                            >
                                <FaList className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-3 text-xs text-zinc-500 text-right font-light">
                    Showing <span className="text-zinc-200 font-medium">{filteredAndSortedTiles.length}</span> items
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
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-[1600px] mx-auto"
                            : "flex flex-col gap-4 w-full max-w-[1600px] mx-auto"
                    }
                >
                    {filteredAndSortedTiles.length > 0 ? (
                        filteredAndSortedTiles.map((tile) => (
                            <motion.div
                                key={tile.id}
                                variants={cardVariants}
                                whileHover={{ y: viewMode === "grid" ? -4 : 0 }}
                                className={`group rounded-2xl border border-white/[0.08] bg-[#121215]/80 hover:bg-[#18181c] hover:border-white/20 backdrop-blur-xl overflow-hidden transition-all duration-300 shadow-md ${
                                    viewMode === "list" ? "flex flex-col sm:flex-row items-center p-4 gap-6" : "flex flex-col"
                                }`}
                            >
                                <div className={`relative overflow-hidden bg-zinc-950 ${viewMode === "list" ? "w-full sm:w-56 h-44 rounded-xl flex-shrink-0" : "w-full h-60"}`}>
                                    <Link href={`/all-tiles/${tile.id}`} className="block w-full h-full relative">
                                        <Image
                                            id={tile.id}
                                            src={tile.image}
                                            alt={tile.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                                            className="card-img object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                                            style={{ viewTransitionName: tile.id }}
                                        />
                                    </Link>
                                    {/* Quick View Hover Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setQuickViewTile(tile);
                                        }}
                                        className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-white px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center gap-1.5 font-medium text-[11px] backdrop-blur-md cursor-pointer border border-white/10 z-10"
                                    >
                                        <FaEye className="w-3 h-3 text-amber-300" /> Quick Preview
                                    </button>
                                </div>

                                <div className={`flex flex-col flex-grow ${viewMode === "list" ? "w-full" : "p-6"}`}>
                                    <div className="flex justify-between items-start mb-2 gap-2">
                                        <Link href={`/all-tiles/${tile.id}`}>
                                            <h2 className="text-base font-semibold text-white group-hover:text-amber-200 transition line-clamp-1">
                                                {tile.title}
                                            </h2>
                                        </Link>
                                        <span
                                            className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border ${
                                                tile.inStock
                                                    ? "bg-emerald-950/60 text-emerald-300 border-emerald-500/30"
                                                    : "bg-zinc-900/70 text-zinc-400 border-zinc-700/50"
                                            }`}
                                        >
                                            {tile.inStock ? "In Stock" : "Limited"}
                                        </span>
                                    </div>

                                    <p className="text-xs text-zinc-400 line-clamp-2 mb-4 font-light leading-relaxed">
                                        {tile.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.06]">
                                        <div>
                                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Rate / Sq Ft</span>
                                            <span className="text-base font-semibold text-amber-300">
                                                ${tile.price}
                                            </span>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <button
                                                onClick={() => setQuickViewTile(tile)}
                                                className="p-2 rounded-full border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/20 transition cursor-pointer"
                                                title="Quick View"
                                            >
                                                <FaEye className="w-3 h-3" />
                                            </button>
                                            <Link href={`/all-tiles/${tile.id}`}>
                                                <button className="px-4 py-2 rounded-full bg-white hover:bg-amber-300 text-zinc-950 font-semibold text-xs tracking-wider uppercase transition cursor-pointer shadow-sm">
                                                    Details &rarr;
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
                            initial={{ scale: 0.96, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 15 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#121215]/95 border border-white/[0.08] rounded-3xl max-w-2xl w-full p-6 md:p-8 overflow-hidden shadow-2xl relative backdrop-blur-2xl"
                        >
                            <button
                                onClick={() => setQuickViewTile(null)}
                                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition cursor-pointer text-xs"
                            >
                                <FaTimes className="w-3.5 h-3.5" />
                            </button>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                                <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/[0.08] bg-zinc-950">
                                    <Image
                                        id={quickViewTile.id}
                                        src={quickViewTile.image}
                                        alt={quickViewTile.title}
                                        fill
                                        className="card-img object-cover"
                                        style={{ viewTransitionName: quickViewTile.id }}
                                    />
                                </div>

                                <div className="space-y-3 text-left">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
                                        Surface Preview
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">{quickViewTile.title}</h3>
                                    <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">{quickViewTile.description}</p>

                                    <div className="space-y-1.5 text-xs text-zinc-400 pt-2 font-light">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${quickViewTile.inStock ? "bg-emerald-400" : "bg-red-400"}`}></span>
                                            <span>{quickViewTile.inStock ? "Available for order" : "Limited stock"}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 mt-4">
                                        <div>
                                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Price / Sq Ft</span>
                                            <span className="text-xl font-semibold text-amber-300">${quickViewTile.price}</span>
                                        </div>

                                        <Link href={`/all-tiles/${quickViewTile.id}`}>
                                            <button
                                                onClick={() => setQuickViewTile(null)}
                                                className="px-5 py-2.5 rounded-full bg-white hover:bg-amber-300 text-zinc-950 font-semibold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm"
                                            >
                                                Full Details &rarr;
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