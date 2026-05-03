"use client";

import Link from "next/link";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 flex items-center justify-center px-4">

            <div className="max-w-2xl w-full text-center">

                {/* 404 */}
                <h1 className="text-8xl md:text-9xl font-black text-[#FFD700] drop-shadow-lg">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-bold text-white mt-6">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-base md:text-lg mt-5 leading-relaxed max-w-xl mx-auto">
                    The page you are looking for does not exist, has been removed,
                    or the link might be broken.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

                    {/* Home Button */}
                    <Link
                        href="/"
                        className="px-8 py-4 bg-[#FFD700] text-black font-bold rounded-2xl hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                        Go Home
                    </Link>

                    {/* Browse Tiles */}
                    <Link
                        href="/all-tiles"
                        className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/10 text-white font-medium rounded-2xl hover:bg-white/20 transition-all duration-300"
                    >
                        Browse Tiles
                    </Link>
                </div>

                {/* Decorative Glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">

                    <div className="absolute top-20 left-10 w-40 h-40 bg-[#FFD700]/10 rounded-full blur-3xl"></div>

                    <div className="absolute bottom-20 right-10 w-56 h-56 bg-white/5 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;