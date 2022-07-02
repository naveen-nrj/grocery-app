import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateValue } from 'core-application/services/utils/context/context';
import { Link, useNavigate } from "react-router-dom";
import CartProduct from 'components/cart/cart-product/cart-product';
import CurrencyFormat from 'react-currency-format';
import * as PaymentController from "components/payment/payment-controller"
import * as AlertService from "core-application/services/utils/alert-service/alert-service"
import "./payment.css"
const Payment = () => {
    const [
        {
            login: {
                userName,
                isLoggedIn,
            },
            config: {
                orders,
                items,
            },
            cart,
        },
        dispatch,
    ] = useStateValue();
    const navigate = useNavigate();

    const getCartTotal = () => {
        let total = 0;
        cart.map((item) => {
            total += Number(item.discountedSellingPrice);
        });
        return total;
    }
    const handleBuy = () => {
        let total = getCartTotal();
        let data = PaymentController.getOrderData(cart, total);
        let filteredItems = PaymentController.filterItems(items, cart);
        dispatch({
            type: "updateConfigState",
            name: "items",
            payload: filteredItems
        });
        dispatch({
            type: "revertCartState",
        });
        let payload = [...orders, data];
        dispatch({
            type: "updateConfigState",
            name: "orders",
            payload: payload,
        });
        let stringifiedOrders = JSON.stringify(payload);
        sessionStorage.setItem("orderData", stringifiedOrders);
        AlertService.Success("Order Placed Successfully");
        navigate(`/orders`);
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{cart?.length} items</Link>){" "}
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{userName}</p>
                        <p>Bengaluru</p>
                        <p>Karnataka, India</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {cart.map((item) => (
                            <CartProduct
                                key={item.id}
                                id={item.id}
                                title={item.name}
                                //image={item.image}
                                price={item.discountedSellingPrice}
                                rating={5}
                            />
                        ))}
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Methods</h3>
                    </div>
                    <div className="payment__details">
                        <div className="payment__priceContainer">
                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                        <h3>Order Total: {value}</h3>
                                    </>
                                )}
                                decimalScale={2}
                                value={getCartTotal(cart)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₹"}
                            />
                            <button onClick={handleBuy}>
                                <span>{"Buy Now"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Payment;