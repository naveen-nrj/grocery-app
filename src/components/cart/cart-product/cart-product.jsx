import React from 'react';
import "./cart-product.css";
import { useStateValue } from 'core-application/services/utils/context/context';
import { Button } from '@mui/material';


const CartProduct = ({ id, title, price, rating, hiddenButton = false }) => {
    const [
        { },
        dispatch,
    ] = useStateValue();
    const removeFromBasket = () => {
        dispatch({
            type: "removeFromCartState",
            id: id,
        })
    }

    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={"./logo.png"}
                alt='' />
            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className='checkoutProduct__price'>
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className='checkoutProduct__rating'>
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>⭐</p>
                        ))
                    }

                </div>
                {
                    !hiddenButton ? <Button className="remove__button" onClick={removeFromBasket}>Remove from Basket</Button> : null

                }

            </div>
        </div>
    );
};

export default CartProduct;