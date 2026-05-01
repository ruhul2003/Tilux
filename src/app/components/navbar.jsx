"use client";

import React from "react";
import logo from "../../assets/logo-white.svg";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Tiles", path: "/all-tiles" },
    { name: "My Profile", path: "/profile" },
  ];

  return (
    // Added the same background color as the banner to prevent white space
    <header className="w-full bg-gradient-to-r from-zinc-800 to-gray-700 pt-3 px-4 lg:px-8">
      <nav
        className="
                max-w-7xl mx-auto
                flex items-center justify-between
                px-6 lg:px-10 py-4
                rounded-full
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                shadow-lg
            "
      >
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-4 w-64 rounded-2xl border border-white/20 bg-black/80 backdrop-blur-2xl p-4 shadow-2xl space-y-2"
            >
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-white rounded-xl px-4 py-3 hover:bg-white/10 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/">
            <Image
              src={logo}
              alt="Tilux Logo"
              width={100}
              height={40}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="relative text-white text-[16px] font-medium tracking-wide transition hover:text-[#FFD700] group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2 rounded-full bg-[#FFD700] text-black font-bold hover:scale-105 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 rounded-full bg-[#FFD700] text-black font-bold hover:scale-105 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;