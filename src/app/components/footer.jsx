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
        <footer className="bg-gradient-to-b from-zinc-900 to-black text-white relative border-t border-zinc-800/80">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* TOP GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 mb-12">
                    {/* BRAND */}
                    <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
                        <Link href="/" className="text-3xl font-extrabold text-white tracking-wider flex items-center gap-2">
                            <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">TILUX</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase font-semibold">Premium</span>
                        </Link>

                        <p className="text-gray-400 mt-4 text-sm leading-relaxed max-w-sm">
                            We manufacture and curate high-grade porcelain, ceramic, and natural marble tiles using advanced precision technology for modern residential and architectural projects.
                        </p>

                        {/* SOCIAL LINKS */}
                        <div className="mt-6">
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                                Connect With Us
                            </h2>
                            <div className="flex flex-row gap-3">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-gray-300 hover:text-amber-400 hover:border-amber-400/50 transition">
                                    <FaInstagram className="w-5 h-5" />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-gray-300 hover:text-amber-400 hover:border-amber-400/50 transition">
                                    <FaFacebook className="w-5 h-5" />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-gray-300 hover:text-amber-400 hover:border-amber-400/50 transition">
                                    <FaXTwitter className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">
                            Catalog
                        </h3>
                        <ul className="text-gray-400 text-sm space-y-2.5">
                            <li><Link href="/all-tiles" className="hover:text-white transition">All Tiles</Link></li>
                            <li><Link href="/all-tiles" className="hover:text-white transition">Marble Series</Link></li>
                            <li><Link href="/all-tiles" className="hover:text-white transition">Ceramic Collection</Link></li>
                            <li><Link href="/all-tiles" className="hover:text-white transition">Outdoor Pavers</Link></li>
                        </ul>
                    </div>

                    {/* ACCOUNT */}
                    <div>
                        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">
                            Account
                        </h3>
                        <ul className="text-gray-400 text-sm space-y-2.5">
                            <li><Link href="/profile" className="hover:text-white transition">My Profile</Link></li>
                            <li><Link href="/my-orders" className="hover:text-white transition">My Orders</Link></li>
                            <li><Link href="/manage-orders" className="hover:text-white transition">Shop Owner Portal</Link></li>
                            <li><Link href="/login" className="hover:text-white transition">Sign In</Link></li>
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="text-gray-400 text-sm space-y-2.5">
                            <li><span className="hover:text-white cursor-pointer transition">About Us</span></li>
                            <li><span className="hover:text-white cursor-pointer transition">Careers</span></li>
                            <li><span className="hover:text-white cursor-pointer transition">Press & Media</span></li>
                            <li><span className="hover:text-white cursor-pointer transition">Privacy Policy</span></li>
                        </ul>
                    </div>

                    {/* CONTACT INFO */}
                    <div>
                        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">
                            Contact
                        </h3>
                        <div className="space-y-3 text-xs text-gray-400">
                            <div className="flex items-start gap-2.5">
                                <MdEmail className="text-amber-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div>
                                    <span className="text-white font-medium block">Support Email</span>
                                    <span>support@tilux.com</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <MdPhone className="text-amber-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div>
                                    <span className="text-white font-medium block">Phone Helpline</span>
                                    <span>+880 1234-567890</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <MdLocationOn className="text-amber-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div>
                                    <span className="text-white font-medium block">HQ Address</span>
                                    <span>Dhaka, Bangladesh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DIVIDER */}
                <hr className="border-zinc-800" />

                {/* BOTTOM BAR */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                    <div className="text-gray-500 text-xs text-center sm:text-left">
                        © 2026 Tilux Inc. All rights reserved. Crafted for modern architecture.
                    </div>

                    {/* Back to Top Button */}
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-800 hover:bg-amber-500 hover:text-black border border-zinc-700 transition text-gray-300"
                    >
                        <span>Back to top</span>
                        <FaArrowUp className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;