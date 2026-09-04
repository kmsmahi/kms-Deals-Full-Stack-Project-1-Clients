import React from 'react';
import Navbar from '../Componenets/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Componenets/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;