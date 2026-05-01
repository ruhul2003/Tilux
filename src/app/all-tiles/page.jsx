"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AllTiles = () => {
    const [tiles, setTiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 px-6 py-12">

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">
                All Premium Tiles
            </h1>

            {/* Loading */}
            {loading && (
                <p className="text-center text-zinc-300 text-lg">
                    Loading tiles...
                </p>
            )}

            {/* Error */}
            {error && (
                <p className="text-center text-red-300 text-lg">
                    {error}
                </p>
            )}

            {/* GRID */}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

                    {tiles.map((tile) => (
                        <div
                            key={tile.id}
                            className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-xl overflow-hidden flex flex-col transition hover:bg-white/10 hover:shadow-2xl"
                        >

                            {/* IMAGE */}
                            <div className="relative w-full h-44 overflow-hidden">
                                <Image
                                    src={tile.image}
                                    alt={tile.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="p-4 flex flex-col flex-grow text-white">

                                {/* TITLE */}
                                <h2 className="text-lg font-semibold">
                                    {tile.title}
                                </h2>

                                {/* DESCRIPTION */}
                                <p className="text-sm text-zinc-300 mt-1 line-clamp-2">
                                    {tile.description}
                                </p>

                                {/* PRICE + STOCK */}
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

                                {/* BUTTON */}
                                <Link href={`/all-tiles/${tile.id}`} className="mt-5">
                                    <button className="w-full py-2 rounded-xl border border-white/10 bg-white/10 text-white text-sm font-medium hover:bg-white hover:text-black transition">
                                        Show Details
                                    </button>
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllTiles;