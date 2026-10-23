"use client";

import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaArrowUp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

function Footer() {
    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
    return (
        <footer className="bg-[#09090b] text-white relative border-t border-white/[0.08]">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
                {/* TOP GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
                    {/* BRAND */}
                    <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
                        <Link href="/" className="text-2xl font-light text-white tracking-widest flex items-center gap-2.5">
                            <span className="font-semibold bg-gradient-to-r from-white via-zinc-200 to-amber-200 bg-clip-text text-transparent">TILUX</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.08] uppercase tracking-wider font-light">Surfaces</span>
                        </Link>

                        <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                            Curated architectural surfaces, natural marbles, and engineered porcelain slabs crafted for modern residential and commercial design.
                        </p>

                        {/* SOCIAL LINKS */}
                        <div className="pt-2">
                            <div className="flex flex-row gap-2">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/[0.02] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20 transition">
                                    <FaInstagram className="w-4 h-4" />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/[0.02] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20 transition">
                                    <FaFacebook className="w-4 h-4" />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/[0.02] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20 transition">
                                    <FaXTwitter className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-[0.2em] mb-4">
                            Catalog
                        </h3>
                        <ul className="text-zinc-400 text-xs sm:text-sm space-y-2.5 font-light">
                            <li><Link href="/all-tiles" className="hover:text-white transition">All Surfaces</Link></li>
                            <li><Link href="/all-tiles" className="hover:text-white transition">Marble Series</Link></li>
                            <li><Link href="/all-tiles" className="hover:text-white transition">Porcelain Slabs</Link></li>
                            <li><Link href="/all-tiles" className="hover:text-white transition">Outdoor Pavers</Link></li>
                        </ul>
                    </div>

                    {/* ACCOUNT */}
                    <div>
                        <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-[0.2em] mb-4">
                            Portal
                        </h3>
                        <ul className="text-zinc-400 text-xs sm:text-sm space-y-2.5 font-light">
                            <li><Link href="/profile" className="hover:text-white transition">Client Profile</Link></li>
                            <li><Link href="/my-orders" className="hover:text-white transition">Order Tracking</Link></li>
                            <li><Link href="/manage-orders" className="hover:text-white transition">Trade Portal</Link></li>
                            <li><Link href="/login" className="hover:text-white transition">Sign In</Link></li>
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-[0.2em] mb-4">
                            Studio
                        </h3>
                        <ul className="text-zinc-400 text-xs sm:text-sm space-y-2.5 font-light">
                            <li><span className="hover:text-white cursor-pointer transition">Quarry Heritage</span></li>
                            <li><span className="hover:text-white cursor-pointer transition">Sustainability</span></li>
                            <li><span className="hover:text-white cursor-pointer transition">Press & BIM</span></li>
                            <li><span className="hover:text-white cursor-pointer transition">Terms & Privacy</span></li>
                        </ul>
                    </div>

                    {/* CONTACT INFO */}
                    <div>
                        <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-[0.2em] mb-4">
                            Inquiries
                        </h3>
                        <div className="space-y-3 text-xs text-zinc-400 font-light">
                            <div className="flex items-start gap-2.5">
                                <MdEmail className="text-amber-400/80 w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                <div>
                                    <span className="text-zinc-300 font-medium block">Studio Inquiries</span>
                                    <span>concierge@tilux.com</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <MdPhone className="text-amber-400/80 w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                <div>
                                    <span className="text-zinc-300 font-medium block">Client Concierge</span>
                                    <span>+1 (800) 845-8900</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <MdLocationOn className="text-amber-400/80 w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                <div>
                                    <span className="text-zinc-300 font-medium block">Global Logistics</span>
                                    <span>Carrara & Dhaka</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DIVIDER */}
                <hr className="border-white/[0.06]" />

                {/* BOTTOM BAR */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                    <div className="text-zinc-500 text-xs text-center sm:text-left font-light">
                        © {new Date().getFullYear()} Tilux Architectural Surfaces. All rights reserved.
                    </div>

                    {/* Back to Top Button */}
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 transition text-zinc-400 hover:text-white cursor-pointer"
                    >
                        <span>Back to top</span>
                        <FaArrowUp className="w-2.5 h-2.5" />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;