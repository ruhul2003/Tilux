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
            <div className="min-h-screen bg-gradient-to-r from-zinc-900 via-gray-900 to-black flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl">
                    <h1 className="text-3xl font-extrabold text-white mb-4">Authentication Required</h1>
                    <p className="text-gray-400 mb-8">Please log in to your account to view your order history.</p>
                    <Link href="/login" className="px-8 py-3.5 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 inline-block">
                        Sign In Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-zinc-900 via-gray-900 to-black py-12 px-4 md:px-8 text-white">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto space-y-8"
            >
                <div className="text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent mb-3">
                        My Order History
                    </h1>
                    <p className="text-gray-400 text-base">
                        Track shipment progress, view purchase details, and manage tile deliveries.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center gap-2 overflow-x-auto pb-2">
                    {["All", "Pending", "Processing", "Shipped", "Delivered"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                                statusFilter === status
                                    ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20"
                                    : "bg-zinc-800/80 text-gray-400 hover:text-white border border-zinc-700/60"
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="relative w-12 h-12 mx-auto mb-4">
                            <div className="w-full h-full border-4 border-amber-500/20 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-amber-400 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-400 animate-pulse">Loading your orders...</p>
                    </div>
                ) : error ? (
                    <div className="text-red-400 bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-center">{error}</div>
                ) : filteredOrders.length === 0 ? (
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-12 text-center text-gray-400 shadow-2xl">
                        <FaBoxOpen className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                        <p className="text-lg text-white font-semibold mb-2">No Orders Found</p>
                        <p className="text-sm text-gray-400 mb-6">
                            {statusFilter === "All" ? "You haven't placed any tile orders yet." : `No orders matching status "${statusFilter}".`}
                        </p>
                        <Link href="/all-tiles" className="px-6 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 inline-block text-sm">
                            Browse Collection
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => (
                            <motion.div 
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-zinc-700 transition"
                            >
                                <div className="flex items-center gap-5 w-full md:w-auto">
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-zinc-800 flex-shrink-0 bg-zinc-800">
                                        <Image
                                            src={order.tileImage || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"}
                                            alt={order.tileTitle || "Tile Order"}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{order.tileTitle}</h3>
                                        <p className="text-gray-400 text-xs">
                                            Order Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Recent"}
                                        </p>
                                        <div className="text-amber-400 text-sm font-semibold mt-2">
                                            ${order.tilePrice} &times; {order.quantity} units
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-none border-zinc-800 pt-4 md:pt-0 gap-3">
                                    <span className="text-xl font-extrabold text-white">${order.totalPrice}</span>
                                    
                                    <span className={`text-xs px-3 py-1 rounded-full border uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                                        order.status === 'Delivered' || order.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                    }`}>
                                        {order.status === 'Shipped' ? <FaShippingFast className="w-3 h-3" /> :
                                         order.status === 'Delivered' || order.status === 'Completed' ? <FaCheckCircle className="w-3 h-3" /> :
                                         <FaClock className="w-3 h-3" />}
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
