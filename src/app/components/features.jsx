"use client";

import React from "react";
import { FaGem, FaShippingFast, FaCheckDouble, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

const Features = () => {
    const featuresList = [
        {
            icon: <FaGem className="w-8 h-8 text-[#FFD700]" />,
            title: "Premium Quality Material",
            description: "Directly sourced from the finest quarries in Italy, Spain, and Brazil, ensuring peak durability and peerless aesthetics."
        },
        {
            icon: <FaShippingFast className="w-8 h-8 text-[#FFD700]" />,
            title: "Secure Global Shipping",
            description: "Custom protective packaging and tracked container transit ensure your premium tiles arrive in pristine condition."
        },
        {
            icon: <FaCheckDouble className="w-8 h-8 text-[#FFD700]" />,
            title: "Architect Grade Quality",
            description: "Every batch passes strict laser dimensional validation and optical calibration to ensure seamless installation."
        },
        {
            icon: <FaLeaf className="w-8 h-8 text-[#FFD700]" />,
            title: "Sustainable Sourcing",
            description: "We partner exclusively with certified eco-friendly quarries committed to carbon footprint reduction."
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.6, 
                ease: "easeOut" 
            } 
        }
    };

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
                        Our Standards
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        Designed for Perfection
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        Discover the engineering excellence and artistry behind every slab and tile in the Tilux catalogue.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {featuresList.map((feat, idx) => (
                        <motion.div 
                            key={idx}
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 shadow-xl group flex flex-col justify-between cursor-pointer"
                        >
                            <div className="mb-6 p-4 w-fit rounded-2xl bg-white/5 group-hover:scale-110 transition duration-300">
                                {feat.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                                <p className="text-zinc-300 text-sm leading-relaxed">{feat.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
