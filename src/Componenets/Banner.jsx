import React from 'react';

const Banner = () => {
    return (
        <div className='flex flex-col gap-4 justify-center items-center mt-12'>
            <h1 className='text-5xl font-bold'>Deal Your Products In A Smart Way!</h1>
            <p className='text-2xl font-semibold'>KmsDeals helps you to sell,resell and shop from trusted local sellers - all in one place!</p>


            <label className="input">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
    >
           <circle cx="11" cy="11" r="8"></circle>
           <path d="m21 21-4.3-4.3"></path>
           </g>
           </svg>
           <input type="search" required placeholder="Search for products,categories..." />
</label>

           <div className='flex gap-3'>
            <button className="btn btn-soft btn-primary">Watch All products</button>
            <button className="btn btn-soft btn-primary">Post an product</button>
           </div>
        </div>
    );
};

export default Banner;