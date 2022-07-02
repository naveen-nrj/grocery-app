import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from 'core-application/services/utils/context/context';
import "./price-total-tab.css";
import { useNavigate } from 'react-router-dom';

const PriceTotal = () => {
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
    const navigate = useNavigate();

    const getBasketTotal = () => {
        let total = 0;
        cart.map((item) => {
            total += Number(item.discountedSellingPrice);
        });
        return total;
    }
    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>Subtotal ({cart?.length} items):
                            <strong> {value}</strong>
                        </p>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(cart)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'₹'}
            />
            <button onClick={e => navigate('/payment')}>Proceed to checkout</button>
        </div>
    );
};

export default PriceTotal;