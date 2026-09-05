import React, { useEffect, useState } from 'react';
import Banner from '../Componenets/Banner';
import RecentProducts from '../Componenets/RecentProducts';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/latest-products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching home products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-12 pb-16">
      <Banner />
      <RecentProducts products={products} loading={loading} />
    </div>
  );
};

export default Home;