"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaSlidersH, FaSun, FaMoon, FaCheck, FaArrowRight, FaMagic } from "react-icons/fa";
import { BiExpandAlt } from "react-icons/bi";

export default function RoomVisualizer() {
    const [selectedRoom, setSelectedRoom] = useState("bathroom");
    const [selectedTileStyle, setSelectedTileStyle] = useState("carrara");
    const [lighting, setLighting] = useState("daylight");

    const rooms = {
        bathroom: {
            name: "Luxury Spa Bathroom",
            description: "High-moisture resistance with slip-proof texture and polished marble aesthetics.",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
            recommendedTile: "Carrara White & Gold Calacatta"
        },
        living: {
            name: "Contemporary Living Room",
            description: "Large format porcelain tiles creating seamless, expansive open-concept floors.",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
            recommendedTile: "Nordic Slate & Concrete Gray"
        },
        kitchen: {
            name: "Modern Kitchen & Backsplash",
            description: "Stain-resistant glazed ceramic tiles that withstand heat, grease, and heavy spills.",
            image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
            recommendedTile: "Nero Marquina & Herringbone Mosaic"
        },
        terrace: {
            name: "Outdoor Terrace & Patio",
            description: "20mm extra-thick frost-resistant pavers with R11 anti-slip safety rating.",
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            recommendedTile: "Terracotta & Natural Stone Slate"
        }
    };

    const tileStyles = [
        { id: "carrara", name: "Carrara White Marble", color: "#E8E8E8", accent: "text-gray-200", badge: "Polished" },
        { id: "nero", name: "Nero Marquina Black", color: "#1A1A1A", accent: "text-amber-400", badge: "Matt Finish" },
        { id: "calacatta", name: "Calacatta Gold Vein", color: "#F4EAD3", accent: "text-amber-300", badge: "Glossy" },
        { id: "slate", name: "Nordic Slate Gray", color: "#4A5568", accent: "text-blue-300", badge: "Anti-Slip" }
    ];

    const currentRoom = rooms[selectedRoom];

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-3"
                    >
                        <FaMagic className="w-4 h-4" />
                        <span>Real-Time Style Simulator</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-amber-200 bg-clip-text text-transparent"
                    >
                        Interactive Room Visualizer
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 mt-3 text-base md:text-lg"
                    >
                        Experiment with room layouts, tile textures, and lighting moods to visualize your dream space.
                    </motion.p>
                </div>

                {/* Main Simulator Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl">
                    {/* Controls Sidebar */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* 1. Room Type Selector */}
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3 flex items-center gap-2">
                                <FaSlidersH className="text-amber-400" /> 1. Select Room Environment
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.keys(rooms).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedRoom(key)}
                                        className={`py-3 px-3 rounded-xl text-xs font-bold transition text-left border flex items-center justify-between ${
                                            selectedRoom === key
                                                ? "bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/20"
                                                : "bg-zinc-800/80 text-gray-300 border-zinc-700/60 hover:border-gray-500"
                                        }`}
                                    >
                                        <span className="capitalize">{key}</span>
                                        {selectedRoom === key && <FaCheck className="w-3 h-3 text-black" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Tile Finish Selector */}
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                                2. Choose Tile Finish & Texture
                            </label>
                            <div className="space-y-2">
                                {tileStyles.map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => setSelectedTileStyle(style.id)}
                                        className={`w-full p-3 rounded-xl text-xs font-medium transition border flex items-center justify-between ${
                                            selectedTileStyle === style.id
                                                ? "bg-zinc-800 border-amber-400 text-white shadow-lg"
                                                : "bg-zinc-900/60 border-zinc-800 text-gray-400 hover:border-zinc-700"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                                                style={{ backgroundColor: style.color }}
                                            />
                                            <span className="font-semibold text-white">{style.name}</span>
                                        </div>
                                        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-700 text-gray-300 font-semibold">
                                            {style.badge}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Lighting Presets */}
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                                3. Lighting Ambience Preset
                            </label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setLighting("daylight")}
                                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition ${
                                        lighting === "daylight"
                                            ? "bg-amber-400/20 text-amber-300 border-amber-400/50"
                                            : "bg-zinc-800/60 border-zinc-700/60 text-gray-400 hover:text-white"
                                    }`}
                                >
                                    <FaSun className="text-amber-400" /> Natural Daylight
                                </button>
                                <button
                                    onClick={() => setLighting("evening")}
                                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition ${
                                        lighting === "evening"
                                            ? "bg-blue-500/20 text-blue-300 border-blue-400/50"
                                            : "bg-zinc-800/60 border-zinc-700/60 text-gray-400 hover:text-white"
                                    }`}
                                >
                                    <FaMoon className="text-blue-400" /> Warm Ambient
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Live Preview Display */}
                    <div className="lg:col-span-7 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedRoom + selectedTileStyle + lighting}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4 }}
                                className={`relative h-[340px] md:h-[420px] rounded-2xl overflow-hidden border border-zinc-700/80 shadow-2xl ${
                                    lighting === "evening" ? "brightness-90 contrast-110 hue-rotate-15" : ""
                                }`}
                            >
                                <Image
                                    src={currentRoom.image}
                                    alt={currentRoom.name}
                                    fill
                                    className="object-cover"
                                />

                                {/* Overlay Gradient & Specs */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-black text-[10px] font-bold uppercase tracking-wider">
                                            Interactive Preview
                                        </span>
                                        <span className="text-xs text-amber-200 font-semibold flex items-center gap-1">
                                            <BiExpandAlt /> {currentRoom.name}
                                        </span>
                                    </div>
                                    <h4 className="text-xl md:text-2xl font-extrabold text-white mb-2">{currentRoom.name}</h4>
                                    <p className="text-gray-300 text-xs md:text-sm line-clamp-2 mb-4">{currentRoom.description}</p>

                                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                        <div>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Matching Collection</span>
                                            <span className="text-sm font-bold text-amber-400">{currentRoom.recommendedTile}</span>
                                        </div>

                                        <Link href="/all-tiles">
                                            <button className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition shadow-lg shadow-amber-500/20 flex items-center gap-2">
                                                <span>Shop This Look</span>
                                                <FaArrowRight className="w-3 h-3" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
