import React, { useEffect, useState } from 'react';
import Banner from '../Componenets/Banner';
import RecentProducts from '../Componenets/RecentProducts';

const Home = () => {
    const[product,setProduct]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        fetch('http://localhost:3000/latest-products')
        .then(res=>res.json())
        .then(data=>{
            setProduct(data);
            setLoading(false);
        })
        .catch(err=>{
            console.error("Error fetching home products:", err);
        })
    },[])
    return (
        <div>
            <Banner></Banner>
            <div>
                <RecentProducts key={product._id} product={product}></RecentProducts>
            </div>
        </div>
    );
};

export default Home;