import Cart from 'components/cart/cart';
import Footer from 'components/footer/footer';
import Header from 'components/header/header';
import Home from 'components/home/home';
import Login from 'components/login/login';
import Orders from 'components/orders/orders';
import Payment from 'components/payment/payment';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const CoreApplication = () => {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
};

export default CoreApplication;