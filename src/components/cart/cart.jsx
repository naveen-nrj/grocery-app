import { useStateValue } from 'core-application/services/utils/context/context';
import React, { useEffect } from 'react';
import CartProduct from './cart-product/cart-product';
import PriceTotal from './price-total-tab/price-total-tab';
import "./cart.css";
import { Grid } from '@mui/material';
import { Navigate } from 'react-router-dom';

const Cart = () => {
    const [
        {
            login: {
                userName,
                isLoggedIn,
            },
            cart,
        },
        dispatch,
    ] = useStateValue();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className='checkout'>

            <Grid container xs={12}>
                <Grid item xs={9} className="checkout__cart_list">
                    <div className='checkout__left'>
                        <div>
                            <h3>Hello {isLoggedIn ? userName : "Guest"}</h3>
                            <h2 className='checkout__title'>{cart?.length ? "Your shopping cart" : "Cart empty"}</h2>
                            {cart.map(item => (
                                <CartProduct key={item.id}
                                    id={item.id}
                                    title={item.name}
                                    //image={item.image}
                                    price={item.discountedSellingPrice}
                                    rating={5}
                                />
                            ))
                            }
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3} className="checkout__cart_list">
                    <div className='checkout__right'>
                        <PriceTotal />
                    </div>
                </Grid>

            </Grid>



        </div>
    )
};

export default Cart;