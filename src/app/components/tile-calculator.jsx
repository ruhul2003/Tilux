"use client";

import React, { useState, useId } from "react";
import { motion } from "framer-motion";
import { FaCalculator, FaLayerGroup, FaRulerCombined, FaCoins, FaCheckCircle } from "react-icons/fa";
import { BiSquareRounded } from "react-icons/bi";

export default function TileCalculator() {
    const lengthId = useId();
    const widthId = useId();
    const tileSizeId = useId();

    const [roomLength, setRoomLength] = useState(12); // in feet
    const [roomWidth, setRoomWidth] = useState(10);  // in feet
    const [tileSize, setTileSize] = useState("12x12"); // inches
    const [wastePercent, setWastePercent] = useState(10); // 10% default extra
    const [pricePerSqFt, setPricePerSqFt] = useState(4.5);

    // Calculate room area in sq ft
    const roomArea = (parseFloat(roomLength) || 0) * (parseFloat(roomWidth) || 0);

    // Tile dimensions in feet
    const getTileDimensions = (sizeStr) => {
        switch (sizeStr) {
            case "6x6": return { w: 0.5, h: 0.5, sqft: 0.25 };
            case "12x12": return { w: 1, h: 1, sqft: 1.0 };
            case "12x24": return { w: 1, h: 2, sqft: 2.0 };
            case "24x24": return { w: 2, h: 2, sqft: 4.0 };
            case "24x48": return { w: 2, h: 4, sqft: 8.0 };
            default: return { w: 1, h: 1, sqft: 1.0 };
        }
    };

    const tileInfo = getTileDimensions(tileSize);
    const totalAreaWithWaste = roomArea * (1 + wastePercent / 100);
    const tilesNeeded = Math.ceil(totalAreaWithWaste / tileInfo.sqft);
    const totalEstimatedCost = (totalAreaWithWaste * pricePerSqFt).toFixed(2);
    const boxesNeeded = Math.ceil(tilesNeeded / 10); // Assume 10 tiles per box

    return (
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-12 bg-[#0c0c0e] text-white relative overflow-hidden border-t border-white/[0.06]">
            {/* Background Accent Blur */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-[1600px] mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
                    <span className="text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase">
                        Estimation Engine
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                        Tile & Slab Calculator
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                        Calculate exact surface coverage, offcut buffer allowances, and material budgeting before placing orders.
                    </p>
                </div>

                {/* Main Interactive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Controls Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 bg-[#121215]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col justify-between"
                    >
                        <h3 className="text-lg font-light text-white mb-6 flex items-center gap-2.5">
                            <FaRulerCombined className="text-amber-400 w-4 h-4" />
                            <span>Room & Slab Dimensions</span>
                        </h3>


                        <div className="space-y-6">
                            {/* Room Dimensions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor={lengthId} className="block text-sm font-medium text-gray-300 mb-2">
                                        Room Length (ft)
                                    </label>
                                    <input
                                        id={lengthId}
                                        type="number"
                                        min="1"
                                        max="200"
                                        value={roomLength}
                                        onChange={(e) => setRoomLength(Math.max(1, parseFloat(e.target.value) || 0))}
                                        className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={widthId} className="block text-sm font-medium text-gray-300 mb-2">
                                        Room Width (ft)
                                    </label>
                                    <input
                                        id={widthId}
                                        type="number"
                                        min="1"
                                        max="200"
                                        value={roomWidth}
                                        onChange={(e) => setRoomWidth(Math.max(1, parseFloat(e.target.value) || 0))}
                                        className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition"
                                    />
                                </div>
                            </div>

                            {/* Tile Size Selection */}
                            <div>
                                <label htmlFor={tileSizeId} className="block text-sm font-medium text-gray-300 mb-2">
                                    Tile Size (Inches)
                                </label>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                    {["6x6", "12x12", "12x24", "24x24", "24x48"].map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => setTileSize(size)}
                                            className={`py-2.5 px-3 rounded-xl font-medium text-sm border transition text-center ${
                                                tileSize === size
                                                    ? "bg-amber-500 text-black border-amber-400 font-bold shadow-lg shadow-amber-500/20"
                                                    : "bg-zinc-800/60 border-zinc-700/60 text-gray-300 hover:border-gray-500"
                                            }`}
                                        >
                                            {size}&quot;
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Wastage Factor & Estimated Cost Per Sq Ft */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-300">Wastage Buffer</span>
                                        <span className="text-xs font-bold text-amber-400">{wastePercent}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="5"
                                        max="25"
                                        step="5"
                                        value={wastePercent}
                                        onChange={(e) => setWastePercent(parseInt(e.target.value))}
                                        className="w-full accent-amber-500 cursor-pointer"
                                    />
                                    <span className="text-[11px] text-gray-500 mt-1 block">
                                        Includes cuts, corners, and spare replacements.
                                    </span>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-300">Est. Price / sq ft</span>
                                        <span className="text-xs font-bold text-amber-400">${pricePerSqFt}</span>
                                    </div>
                                    <input
                                        type="number"
                                        step="0.5"
                                        min="1"
                                        max="100"
                                        value={pricePerSqFt}
                                        onChange={(e) => setPricePerSqFt(Math.max(0.5, parseFloat(e.target.value) || 0))}
                                        className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-950 border border-amber-500/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative"
                    >
                        <div>
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                                <h4 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                                    <FaCoins /> Calculation Summary
                                </h4>
                                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/20">
                                    Instant Estimate
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4">
                                    <span className="text-xs text-gray-400 block mb-1">Total Room Area</span>
                                    <span className="text-2xl font-extrabold text-white">{roomArea} <span className="text-sm font-normal text-gray-400">sq ft</span></span>
                                </div>
                                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4">
                                    <span className="text-xs text-gray-400 block mb-1">With {wastePercent}% Waste</span>
                                    <span className="text-2xl font-extrabold text-amber-300">{totalAreaWithWaste.toFixed(1)} <span className="text-sm font-normal text-gray-400">sq ft</span></span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6 text-sm">
                                <div className="flex justify-between items-center py-2 border-b border-zinc-800/60">
                                    <span className="text-gray-400 flex items-center gap-2">
                                        <BiSquareRounded className="text-amber-400" /> Total Tiles Needed:
                                    </span>
                                    <span className="font-bold text-white text-base">{tilesNeeded} pcs</span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-zinc-800/60">
                                    <span className="text-gray-400 flex items-center gap-2">
                                        <FaLayerGroup className="text-amber-400" /> Boxes Recommended (~10 pcs/box):
                                    </span>
                                    <span className="font-bold text-white text-base">{boxesNeeded} boxes</span>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-400 flex items-center gap-2">
                                        <FaCheckCircle className="text-green-400" /> Waste Allowance:
                                    </span>
                                    <span className="font-medium text-gray-300">{(totalAreaWithWaste - roomArea).toFixed(1)} sq ft</span>
                                </div>
                            </div>
                        </div>

                        {/* Estimated Price Footer Card */}
                        <div className="mt-4 p-5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-center">
                            <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold block mb-1">Estimated Total Material Cost</span>
                            <span className="text-4xl font-extrabold text-white">${totalEstimatedCost}</span>
                            <span className="text-[11px] text-amber-200/70 block mt-1">Excludes installation labor & adhesive materials</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
