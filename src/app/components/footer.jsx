import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <div className="bg-[#101727] text-white">
            <div className="w-full md:w-4/5 mx-auto px-6 py-16">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">

                    <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
                        <h1 className="text-3xl md:text-4xl font-bold">Tilux</h1>
                        <p className="text-[#777] mt-4 leading-relaxed max-w-sm">
                            We manufacture high-quality natural marble using advanced processing technology to deliver timeless beauty, strength, and precision for residential, commercial spaces.
                        </p>
                    </div>

                    <div>
                        <h1 className="text-[18px] font-semibold">Products</h1>
                        <ul className="text-[#777] mt-3 flex flex-col gap-2">
                            <li className="hover:text-white cursor-pointer transition-colors">Features</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Templates</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Integrations</li>
                        </ul>
                    </div>

                    <div>
                        <h1 className="text-[18px] font-semibold">Company</h1>
                        <ul className="text-[#777] mt-3 flex flex-col gap-2">
                            <li className="hover:text-white cursor-pointer transition-colors">About</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Press</li>
                        </ul>
                    </div>

                    <div>
                        <h1 className="text-[18px] font-semibold">Resources</h1>
                        <ul className="text-[#777] mt-3 flex flex-col gap-2">
                            <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Community</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-[18px] font-semibold">Social Links</h2>
                        <div className="flex flex-row gap-4 mt-4">
                            <FaInstagram size={38} className="text-black bg-white p-2 rounded-full hover:bg-purple-600 hover:text-white transition-all cursor-pointer" />
                            <FaFacebook size={38} className="text-black bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-all cursor-pointer" />
                            <FaXTwitter size={38} className="text-black bg-white p-2 rounded-full hover:bg-gray-800 hover:text-white transition-all cursor-pointer" />
                        </div>
                    </div>
                </div>

                <hr className="border-[#333]" />


                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
                    <div className="text-center md:text-left text-[#777] text-sm">
                        © 2026 Tilux Inc. All rights reserved.
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center text-sm text-[#777]">
                        <p className="hover:text-white cursor-pointer transition-colors">Privacy Policy</p>
                        <p className="hover:text-white cursor-pointer transition-colors">Terms of Service</p>
                        <p className="hover:text-white cursor-pointer transition-colors">Cookies</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;