import React from 'react';

const SignUpPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-zinc-800 to-gray-700 px-4 py-10">

            <div
                className="
                    w-full max-w-5xl
                    rounded-3xl
                    border border-white/10
                    bg-white/10
                    backdrop-blur-2xl
                    shadow-[0_8px_40px_rgba(0,0,0,0.35)]
                    p-8 md:p-10
                "
            >

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-gray-300 mt-2 text-sm">
                        Join us and explore premium marble & tile collections
                    </p>
                </div>

                {/* Form */}
                <form>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Left Column */}
                        <div className="space-y-5">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="
                                        w-full
                                        px-4 py-3
                                        rounded-xl
                                        bg-white/10
                                        border border-white/10
                                        text-white
                                        placeholder:text-gray-400
                                        outline-none
                                        focus:border-[#FFD700]
                                        focus:ring-2
                                        focus:ring-[#FFD700]/30
                                        transition
                                    "
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="
                                        w-full
                                        px-4 py-3
                                        rounded-xl
                                        bg-white/10
                                        border border-white/10
                                        text-white
                                        placeholder:text-gray-400
                                        outline-none
                                        focus:border-[#FFD700]
                                        focus:ring-2
                                        focus:ring-[#FFD700]/30
                                        transition
                                    "
                                />
                            </div>

                            {/* Photo URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Photo URL
                                </label>

                                <input
                                    type="url"
                                    placeholder="Enter your photo URL"
                                    className="
                                        w-full
                                        px-4 py-3
                                        rounded-xl
                                        bg-white/10
                                        border border-white/10
                                        text-white
                                        placeholder:text-gray-400
                                        outline-none
                                        focus:border-[#FFD700]
                                        focus:ring-2
                                        focus:ring-[#FFD700]/30
                                        transition
                                    "
                                />
                            </div>

                        </div>

                        {/* Right Column */}
                        <div className="space-y-5">

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    className="
                                        w-full
                                        px-4 py-3
                                        rounded-xl
                                        bg-white/10
                                        border border-white/10
                                        text-white
                                        placeholder:text-gray-400
                                        outline-none
                                        focus:border-[#FFD700]
                                        focus:ring-2
                                        focus:ring-[#FFD700]/30
                                        transition
                                    "
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="
                                        w-full
                                        px-4 py-3
                                        rounded-xl
                                        bg-white/10
                                        border border-white/10
                                        text-white
                                        placeholder:text-gray-400
                                        outline-none
                                        focus:border-[#FFD700]
                                        focus:ring-2
                                        focus:ring-[#FFD700]/30
                                        transition
                                    "
                                />
                            </div>

                        </div>

                    </div>

                    {/* Button */}
                    <div className="flex justify-center mt-10">
                        <button
                            type="submit"
                            className="
                                px-20
                                py-3
                                rounded-xl
                                bg-[#FFD700]
                                text-black
                                font-semibold
                                hover:scale-[1.03]
                                hover:bg-[#ffdf32]
                                transition-all
                                duration-300
                            "
                        >
                            Create Account
                        </button>
                    </div>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-300 mt-6">
                    Already have an account?{" "}
                    <span className="text-[#FFD700] cursor-pointer hover:underline">
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
};

export default SignUpPage;