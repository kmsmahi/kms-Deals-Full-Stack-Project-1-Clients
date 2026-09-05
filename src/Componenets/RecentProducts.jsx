import React from 'react';
import ProductCard from './ProductCard';

const RecentProducts = ({product}) => {
    return (
        <div className='mt-12'>
            <h1 className='text-center text-4xl font-bold'>Recent Products</h1>
            {/* grid layout for recent products... */}

            <div className='w-11/12 mx-auto grid grid-cols-3'>
            {
                product.map(prod=>{
                    <ProductCard key={prod._id} prod={prod}></ProductCard>
                })
            }
            </div>
        </div>
    );
};

export default RecentProducts;