"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";

const TileDetails = ({ params: paramsPromise }) => {
    const params = use(paramsPromise);
    const { tileId } = params;

    const [tile, setTile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTile = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `https://tilux-server.onrender.com/tiles/${tileId}`
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

                {/* IMAGE */}
                <div className="relative w-full h-[420px] md:h-[600px] rounded-2xl overflow-hidden">
                    <Image
                        src={tile.image}
                        alt={tile.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* DETAILS */}
                <div className="flex flex-col justify-center">

                    <Link
                        href="/all-tiles"
                        className="text-xs text-zinc-400 hover:text-white mb-6"
                    >
                        ← Back
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-semibold text-white">
                        {tile.title}
                    </h1>

                    <p className="text-sm text-zinc-300 mt-2">
                        by {tile.creator || "Unknown"}
                    </p>

                    <p className="mt-6 text-zinc-200 leading-relaxed">
                        {tile.description}
                    </p>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        {(tile.tags || [tile.category]).map((tag, i) => (
                            <span
                                key={i}
                                className="text-xs px-3 py-1 rounded-full bg-white/10 text-zinc-200 border border-white/10"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* INFO */}
                    <div className="mt-8 text-sm text-zinc-300 space-y-1">
                        <p>Material: {tile.material}</p>
                        <p>Dimensions: {tile.dimensions}</p>
                    </div>

                    {/* PRICE + CTA */}
                    <div className="mt-10 flex items-center justify-between">
                        <p className="text-2xl font-semibold text-white">
                            ${tile.price}{" "}
                            <span className="text-sm text-zinc-400">
                                {tile.currency}
                            </span>
                        </p>

                        <button
                            disabled={!tile.inStock}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition border ${
                                tile.inStock
                                    ? "bg-white text-black hover:bg-zinc-200 border-white"
                                    : "bg-white/10 text-zinc-500 border-white/10 cursor-not-allowed"
                            }`}
                        >
                            {tile.inStock ? "Buy Now" : "Out of Stock"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TileDetails;