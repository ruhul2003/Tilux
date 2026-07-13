"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Showcase = () => {
    const categories = [
        {
            title: "Royal Italian Marble",
            description: "Timeless luxury with pristine white surfaces and delicate organic veining.",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
            link: "/all-tiles"
        },
        {
            title: "Midnight Granite",
            description: "Ultra-durable polished slabs engineered for modern kitchens and patios.",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
            link: "/all-tiles"
        },
        {
            title: "Earthy Ceramic & Wood",
            description: "Warm organic textures combining natural beauty with waterproof utility.",
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            link: "/all-tiles"
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
            } 
        }
    };

    return (
        <section className="bg-gradient-to-r from-zinc-800 to-gray-700 py-20 px-6 md:px-12 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-3"
                    >
                        <span className="text-[#FFD700] text-xs font-bold uppercase tracking-widest bg-[#FFD700]/10 px-4 py-1.5 rounded-full border border-[#FFD700]/20">
                            The Collection
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            Architectural Finishes
                        </h2>
                        <p className="text-gray-300 text-sm md:text-base max-w-2xl">
                            Filter through premium textures meticulously polished and calibrated for residential and commercial spaces.
                        </p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/all-tiles">
                            <button className="px-8 py-3.5 bg-white text-black font-bold rounded-2xl hover:scale-105 hover:bg-zinc-200 transition shadow-lg cursor-pointer">
                                View All Tiles
                            </button>
                        </Link>
                    </motion.div>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {categories.map((cat, idx) => (
                        <motion.div 
                            key={idx}
                            variants={cardVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 h-[480px] flex flex-col justify-end p-8 shadow-2xl hover:border-white/20 transition-all duration-300 cursor-pointer"
                        >
                            {/* Background Image */}
                            <Image 
                                src={cat.image}
                                alt={cat.title}
                                fill
                                className="object-cover absolute inset-0 z-0 group-hover:scale-105 transition duration-700 opacity-60 group-hover:opacity-80"
                                unoptimized
                            />
                            
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>

                            {/* Content */}
                            <div className="relative z-20 space-y-4 translate-y-4 group-hover:translate-y-0 transition duration-500">
                                <h3 className="text-2xl font-bold text-white">{cat.title}</h3>
                                <p className="text-zinc-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {cat.description}
                                </p>
                                <Link href={cat.link} className="inline-block mt-2">
                                    <span className="text-[#FFD700] hover:text-white text-sm font-semibold transition flex items-center gap-1">
                                        Explore Details →
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Showcase;
