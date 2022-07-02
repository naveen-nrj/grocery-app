import React from 'react';
import CartProduct from 'components/cart/cart-product/cart-product';
import CurrencyFormat from 'react-currency-format';
import "./order.css"
import moment from 'moment';
const order = ({ order, index }) => {
    return (
        (
            <div className="order">
                <div className="order__info">
                    <div>
                        <h2>Order {index}</h2>
                        <p> Ordered on : {moment(order.created_date).format('YYYY-MM-DD')}</p>
                    </div>
                </div>
                {order.cart?.map((item) => (
                    <CartProduct
                        key={item.id}
                        id={item.id}
                        title={item.name}
                        //image={item.image}
                        price={item.discountedSellingPrice}
                        rating={5}
                        hiddenButton={true}
                    />
                ))}
                <CurrencyFormat
                    renderText={(value) => (
                        <>
                            <h3>Order Total: {value}</h3>
                        </>
                    )}
                    decimalScale={2}
                    value={order.total}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                />
            </div>
        )
    );
};

export default order;