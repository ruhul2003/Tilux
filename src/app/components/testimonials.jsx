"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Testimonials = () => {
    const reviews = [
        {
            name: "Sophia Carter",
            role: "Principal Interior Architect",
            company: "Studio Luxe",
            quote: "The quality of marble sourced from Tilux is spectacular. The laser precision calibration meant zero cutting waste on site. My clients are absolutely in love with the Carrara finishes.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        },
        {
            name: "Marcus Vance",
            role: "Chief Developer",
            company: "Vance & Co Builders",
            quote: "As developers, we look for strength and reliability. Tilux granite collections provide exactly that. Ordering bulk container shipments is streamlined, and customer support is world-class.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
        }
    ];

    return (
        <section className="bg-gradient-to-r from-zinc-800 to-gray-700 py-20 px-6 md:px-12 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16 space-y-3"
                >
                    <span className="text-[#FFD700] text-xs font-bold uppercase tracking-widest bg-[#FFD700]/10 px-4 py-1.5 rounded-full border border-[#FFD700]/20">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        Trusted by Professionals
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        Read how interior designers, custom home builders, and architectural studios elevate spaces using Tilux materials.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {reviews.map((rev, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: idx === 0 ? -60 : 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col justify-between space-y-8 cursor-pointer"
                        >
                            <p className="text-zinc-200 text-lg italic leading-relaxed">
                                &ldquo;{rev.quote}&rdquo;
                            </p>
                            
                            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/25">
                                    <Image 
                                        src={rev.avatar}
                                        alt={rev.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base">{rev.name}</h4>
                                    <p className="text-zinc-400 text-xs">{rev.role}, <span className="text-[#FFD700]">{rev.company}</span></p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
