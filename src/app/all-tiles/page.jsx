"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

const AllTiles = () => {
    const [tiles, setTiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getTiles = async () => {
            try {
                setLoading(true);
                const res = await fetch("https://tilux-server.onrender.com/tiles", {
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


    const filteredTiles = useMemo(() => {
        if (!searchTerm.trim()) return tiles;

        const term = searchTerm.toLowerCase().trim();

        return tiles.filter((tile) =>
            tile.title?.toLowerCase().includes(term) ||
            tile.description?.toLowerCase().includes(term) ||
            tile.price?.toString().includes(term)
        );
    }, [tiles, searchTerm]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 px-6 py-12">


            <div className="max-w-7xl mx-auto mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
                    All Premium Tiles
                </h1>

                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-zinc-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 01-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    <input
                        type="text"
                        placeholder="Search tiles by name, description, or price..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/10 border border-white/10 focus:border-white/30 
                                   text-white placeholder-zinc-400 rounded-2xl py-4 pl-12 pr-6 
                                   focus:outline-none focus:ring-2 focus:ring-white/20 transition-all
                                   text-lg backdrop-blur-xl"
                    />

                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute inset-y-0 right-4 flex items-center text-zinc-400 hover:text-white transition"
                        >
                        </button>
                    )}
                </div>

                {searchTerm && (
                    <p className="text-center text-zinc-400 text-sm mt-3">
                        Showing {filteredTiles.length} results for `{searchTerm}`
                    </p>
                )}
            </div>


            {loading && (
                <p className="text-center text-zinc-300 text-lg">Loading tiles...</p>
            )}


            {error && (
                <p className="text-center text-red-300 text-lg">{error}</p>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {filteredTiles.length > 0 ? (
                        filteredTiles.map((tile) => (
                            <div
                                key={tile.id}
                                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-xl overflow-hidden flex flex-col transition hover:bg-white/10 hover:shadow-2xl"
                            >
                                <div className="relative w-full h-44 overflow-hidden">
                                    <Image
                                        src={tile.image}
                                        alt={tile.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-500"
                                    />
                                </div>

                                <div className="p-4 flex flex-col flex-grow text-white">
                                    <h2 className="text-lg font-semibold">{tile.title}</h2>

                                    <p className="text-sm text-zinc-300 mt-1 line-clamp-2">
                                        {tile.description}
                                    </p>

                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-white font-bold text-lg">
                                            ${tile.price}
                                        </span>

                                        <span
                                            className={`text-xs px-3 py-1 rounded-full border ${
                                                tile.inStock
                                                    ? "bg-green-500/10 text-green-300 border-green-400/20"
                                                    : "bg-red-500/10 text-red-300 border-red-400/20"
                                            }`}
                                        >
                                            {tile.inStock ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </div>

                                    <Link href={`/all-tiles/${tile.id}`} className="mt-5">
                                        <button className="w-full py-2 rounded-xl border border-white/10 bg-white/10 text-white text-sm font-medium hover:bg-white hover:text-black transition">
                                            Show Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <p className="text-zinc-300 text-xl">No tiles found matching your search.</p>
                            <button
                                onClick={() => setSearchTerm("")}
                                className="mt-4 text-white underline hover:no-underline"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllTiles;