import React from "react";
import { IoMdRadioButtonOn } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

const Banner = () => {
    return (
        <div className="bg-[#1D1D1D] min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">

            {/* Top Badge */}
            <p className="flex items-center gap-2 font-semibold text-sm rounded-full bg-[#2F2F2F] px-4 py-2 text-white w-fit">
                <IoMdRadioButtonOn className="text-[#FFD700]" />
                Built On Quality And Trust
            </p>

            {/* Heading */}
            <h1 className="text-white mt-6 text-4xl md:text-6xl font-semibold leading-tight">
                Discover Your Perfect Aesthetic
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-400 mt-5 max-w-3xl leading-relaxed">
                We manufacture high-quality natural marble using advanced
                processing technology to deliver timeless beauty, strength,
                and precision for residential and commercial spaces.
            </p>

            {/* Features */}
            <ul className="flex flex-wrap justify-center gap-4 mt-8">
                <li className="flex items-center gap-2 font-medium text-sm rounded-full bg-[#2F2F2F] px-4 py-2 text-white">
                    <FaCheckCircle className="text-[#FFD700]" />
                    Premium Marble Quality
                </li>

                <li className="flex items-center gap-2 font-medium text-sm rounded-full bg-[#2F2F2F] px-4 py-2 text-white">
                    <FaCheckCircle className="text-[#FFD700]" />
                    Modern Elegant Designs
                </li>
            </ul>

            {/* Infinite Marquee */}
            <div className="w-full overflow-hidden border-y border-gray-800 bg-gradient-to-r from-black via-gray-900 to-black mt-14 py-4">

                <div className="flex whitespace-nowrap animate-marquee">

                    {/* Duplicate Content For Infinite Loop */}
                    {[1, 2].map((item) => (
                        <div key={item} className="flex items-center">

                            <span className="mx-8 text-sm md:text-base font-medium tracking-wide text-white">
                                <span className="text-yellow-400 font-semibold">
                                    New Arrivals:
                                </span>{" "}
                                Premium Tile Collection
                            </span>

                            <span className="text-gray-500">|</span>

                            <span className="mx-8 text-sm md:text-base font-medium text-white">
                                <span className="text-cyan-400 font-semibold">
                                    Weekly Feature:
                                </span>{" "}
                                Modern Geometric Patterns
                            </span>

                            <span className="text-gray-500">|</span>

                            <span className="mx-8 text-sm md:text-base font-medium text-white">
                                Free Delivery on Selected Orders
                            </span>

                            <span className="text-gray-500">|</span>

                            <span className="mx-8 text-sm md:text-base font-medium text-white">
                                Join Our Design Community
                            </span>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;