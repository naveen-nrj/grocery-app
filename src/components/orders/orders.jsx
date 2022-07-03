import React from 'react';
import Order from "components/orders/order/order";
import { Navigate } from 'react-router-dom';
import { useStateValue } from 'core-application/services/utils/context/context';
import "./orders.css";
const Orders = () => {
    const [
        {
            login: {
                isLoggedIn
            },
            config: {
                orders,
            },
        },

    ] = useStateValue();
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div className="orders">
            <h1>Your orders history</h1>
            <div className="orders__order">
                {
                    orders?.map((order, index) => (
                        <Order index={index + 1} key={index} order={order} />
                    ))
                }
            </div>
        </div>
    );
};

export default Orders;