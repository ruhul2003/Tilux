import React from 'react';
import { IoMdRadioButtonOn } from "react-icons/io";
import Image from 'next/image';
import heroImage from '../../assets/hero-image-silver.png';
import { TiInputChecked } from "react-icons/ti";


const banner = () => {
    return (
        <div className='flex flex-row gap-20 justify-center bg-[#1D1D1D] min-h-screen items-center'>
            {/* left side */}
            <div>
                <p className='flex items-center gap-2 font-semibold text-[14px] rounded-full bg-[#2F2F2F] px-3 py-[2px]  text-white w-fit'>{<IoMdRadioButtonOn />} Built On Quality And Trust</p>
                <h1 className='text-white text-6xl font-semibold'>Where natural marble <br /> meets precision</h1>
                <p className='text-lg text-gray-400 mt-4'>We manufacture high-quality natural marble using advanced processing technology to <br /> deliver timeless beauty, strength, and precision for residential and commercial spaces.</p>

                <ul className='flex flex-row gap-4 mt-6'>
                    <li><p className='flex  items-center gap-2 font-semibold text-[14px] rounded-full bg-[#2F2F2F] px-3 py-[2px]  text-white w-fit'>
                        {<TiInputChecked />} High-quality marble</p></li>
                    <li><p className='flex items-center gap-2 font-semibold text-[14px] rounded-full bg-[#2F2F2F] px-3 py-[2px]  text-white w-fit'>{<TiInputChecked />} High-quality marble</p></li>
                </ul>
            </div>

            {/* right side */}
            <div>
                <Image
                    src={heroImage}
                    alt="Hero Image"
                    width={500}
                    height={300}
                />
            </div>
        </div>
    );
};

export default banner;