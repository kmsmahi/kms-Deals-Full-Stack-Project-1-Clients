import React, { useEffect, useState } from 'react';
import ProductCard from '../Componenets/ProductCard';
import SingleCard from '../Componenets/SingleCard';

const AllProducts = () => {
    const[allProducts,setAllProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        fetch('http://localhost:3000/all-products')
        .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching home products:", err);
        setLoading(false);
    })
    })
    return (
        <div className='mt-12'>
            <h1 className='text-center text-5xl font-bold'>All products</h1>

            <div className='grid grid-cols-3'>
                {
                    allProducts.map((singleProduct)=>(
                        <SingleCard key={singleProduct._id} singleProduct={singleProduct}></SingleCard>
                    ))
                }
            </div>
        </div>
    );
};

export default AllProducts;