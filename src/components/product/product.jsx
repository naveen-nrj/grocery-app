import React, { useEffect } from 'react';
import "./product.css";
import Button from '@mui/material/Button';
import { useStateValue } from 'core-application/services/utils/context/context';


const Product = ({ image, rating, price, title, id }) => {

    const [
        {
            login: {
                userName,
                isLoggedIn,
            },
            config: {
                items
            },
            cart,
        },
        dispatch,
    ] = useStateValue();


    const addToBasket = () => {
        let item = items.find((item) => item.id === id);
        dispatch({
            type: "updateCartState",
            payload: item
        })
    }
    return (
        <>
            <div className='product'>
                <div className='product__info'>
                    <p>{title}</p>
                    <p className='product__price'>
                        <small>₹</small>
                        <strong>{price}</strong>
                    </p>
                    <div className='product__rating'>
                        {Array(rating)
                            .fill()
                            .map((_, i) => (
                                <p key={i}>⭐</p>
                            ))
                        }

                    </div>
                </div>

                <img src={"/logo.png"}
                    alt='' />

                <Button onClick={addToBasket}>Add to Basket</Button>

            </div>
        </>
    );
};

export default Product;