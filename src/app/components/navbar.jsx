import React from 'react';
import logo from '../../assets/logo-white.svg';
import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {

    const links = <>
        <ul className='flex flex-row gap-20'>
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/all-tiles" className="hover:text-primary transition-colors">All Tiles</Link></li>
            <li><Link href="/profile" className="hover:text-primary transition-colors">My Profile</Link></li>
        </ul>
    </>

    return (
        <div className="navbar bg-[#2F2F2F] text-[20px] text-white font-bold p-4 rounded xl xl:px-12 xl:py-6 w-full mx-auto shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link href="/">
                    <Image
                        src={logo}
                        alt="Tilux Logo"
                        width={100}
                        height={60}
                        priority
                    />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="flex flex-row gap-8 px-1 font-medium">
                    {links}
                </ul>
            </div>

            <div className="navbar-end flex gap-4">
                <Link href="/login" className=" bg-[#6D1731] text-white px-4 py-2 rounded text-[16px]">Login</Link>
                <Link href="/signup" className=" border border-[#6D1731] text-[#6D1731] px-4 py-2 rounded text-[16px]">SignUp</Link>
            </div>
        </div>
    );
};

export default NavBar;