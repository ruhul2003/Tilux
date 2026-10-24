"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSession, API_BASE_URL } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { FaBoxOpen, FaShippingFast, FaCheckCircle, FaClock } from "react-icons/fa";

const MyOrdersPage = () => {
    const { data: session, isPending } = useSession();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        if (!isPending && !session?.user) return;

        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("tilux_token");
                const res = await fetch(`${API_BASE_URL}/api/orders`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!res.ok) throw new Error("Failed to load orders");
                const data = await res.json();
                setOrders(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [session, isPending]);

    const filteredOrders = useMemo(() => {
        if (statusFilter === "All") return orders;
        return orders.filter(order => order.status?.toLowerCase() === statusFilter.toLowerCase());
    }, [orders, statusFilter]);

    if (!isPending && !session?.user) {
        return (
            <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center p-10 rounded-3xl bg-[#121215] border border-white/[0.08] backdrop-blur-xl shadow-2xl">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-amber-300 block mb-3">Client Access</span>
                    <h1 className="text-2xl font-light text-white mb-3 tracking-tight">Authentication Required</h1>
                    <p className="text-zinc-400 text-xs sm:text-sm font-light mb-8 leading-relaxed">
                        Please authenticate with your client credentials to inspect your architectural order records.
                    </p>
                    <Link href="/login" className="px-8 py-3 bg-white hover:bg-amber-300 text-zinc-950 font-semibold text-xs uppercase tracking-wider rounded-full transition shadow-sm inline-block">
                        Sign In Now &rarr;
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] py-16 px-4 sm:px-8 lg:px-12 text-zinc-100">
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-[1550px] mx-auto space-y-10"
            >
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-300">
                        Client Portfolio
                    </span>
                    <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">
                        Order History
                    </h1>
                    <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                        Track dispatch progress, inspect product manifests, and review architectural surface orders.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center gap-2 overflow-x-auto pb-2">
                    {["All", "Pending", "Processing", "Shipped", "Delivered"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider transition cursor-pointer ${
                                statusFilter === status
                                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                                    : "bg-white/[0.02] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-24 space-y-3">
                        <div className="w-6 h-6 border-2 border-white/20 border-t-amber-300 rounded-full animate-spin mx-auto"></div>
                        <p className="text-zinc-400 text-xs uppercase tracking-widest font-light">Loading orders...</p>
                    </div>
                ) : error ? (
                    <div className="text-red-400 bg-red-500/5 border border-red-500/20 p-6 rounded-2xl text-center text-xs font-light max-w-xl mx-auto">
                        {error}
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="bg-[#121215]/60 border border-white/[0.08] rounded-3xl p-16 text-center text-zinc-400 max-w-2xl mx-auto shadow-2xl">
                        <FaBoxOpen className="w-12 h-12 text-zinc-600 mx-auto mb-4 stroke-1" />
                        <p className="text-lg text-white font-light tracking-tight mb-2">No Records Found</p>
                        <p className="text-xs text-zinc-400 font-light mb-6">
                            {statusFilter === "All" ? "No architectural orders have been initiated yet." : `No purchase orders matching status "${statusFilter}".`}
                        </p>
                        <Link href="/all-tiles" className="px-6 py-2.5 bg-white hover:bg-amber-300 text-zinc-950 font-semibold rounded-full text-xs uppercase tracking-wider transition shadow-sm inline-block">
                            Browse Collection &rarr;
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredOrders.map((order) => (
                            <motion.div 
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#121215]/80 border border-white/[0.08] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-white/20 transition group"
                            >
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/[0.08] flex-shrink-0 bg-zinc-950">
                                        <Image
                                            src={order.tileImage || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"}
                                            alt={order.tileTitle || "Tile Order"}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Recent Order"}
                                        </span>
                                        <h3 className="text-base font-light text-white tracking-tight">{order.tileTitle}</h3>
                                        <div className="text-xs text-zinc-400 font-light">
                                            ${order.tilePrice} &times; {order.quantity} units
                                        </div>
                                    </div>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-none border-white/[0.06] pt-4 sm:pt-0 gap-2">
                                    <span className="text-lg font-light text-amber-300">${order.totalPrice}</span>
                                    
                                    <span className={`text-[11px] px-3 py-1 rounded-full border uppercase tracking-wider font-medium flex items-center gap-1.5 ${
                                        order.status === 'Delivered' || order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                        order.status === 'Shipped' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' :
                                        'bg-amber-500/10 text-amber-300 border-amber-500/20'
                                    }`}>
                                        {order.status === 'Shipped' ? <FaShippingFast className="w-2.5 h-2.5" /> :
                                         order.status === 'Delivered' || order.status === 'Completed' ? <FaCheckCircle className="w-2.5 h-2.5" /> :
                                         <FaClock className="w-2.5 h-2.5" />}
                                        {order.status || "Pending"}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
            <Toaster position="top-center" />
        </div>
    );
};

export default MyOrdersPage;
