import { Grid } from '@mui/material';
import Product from 'components/product/product';
import * as HomeController from "components/home/home-controller";
import { useStateValue } from 'core-application/services/utils/context/context';

import { Navigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import "./home.css";
import StoreCard from './store-card/store-card';

const Home = () => {
    const [
        {
            login: {
                latitude,
                longitude,
                isLoggedIn
            },
            config: {
                items,
                orders,
                search,
                store,
            },
        },
        dispatch,
    ] = useStateValue();
    const [filteredItems, setFilteredItems] = useState([]);


    useEffect(() => {
        if (!orders.length) {
            let data = JSON.parse(sessionStorage.getItem("orderData"));
            if (data) {
                dispatch({
                    type: "updateConfigState",
                    name: "orders",
                    payload: data
                });
            }
        }
    }, [])

    useEffect(() => {
        if (!items.length) {
            let data = HomeController.getItems();
            dispatch({
                type: "updateConfigState",
                name: "items",
                payload: data
            });
            setFilteredItems(data);

        }
    }, [items]);


    useEffect(() => {
        const handleSearch = () => {
            if (items.length) {
                return items.filter((item) =>
                (
                    item.name.toLowerCase().includes(search.toLowerCase())
                ));
            } else {
                return [];
            }
        }
        let data = handleSearch();
        setFilteredItems(data);

    }, [search, items]);

    useEffect(() => {
        if (!Object.keys(store).length) {
            getStore();
        }
    }, []);

    const getStore = () => {
        let store = HomeController.getStore(latitude, longitude);
        dispatch({
            type: "updateConfigState",
            name: "store",
            payload: store,
        });
    }
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <div className="home">
                {
                    Object.keys(store).length ? (
                        <>
                            <div className="home_store_details">
                                <Grid container xs={12}>
                                    <Grid item xs={12}>
                                        <StoreCard store={store} />
                                    </Grid>

                                </Grid>
                            </div>
                            <div className="home__container">
                                <div className="home__row">

                                    <Grid container xs={12}>
                                        {
                                            filteredItems.length ? filteredItems.map((item) => {
                                                return (
                                                    <Grid item xs={3}>
                                                        <Product
                                                            id={item.id}
                                                            title={item.name}
                                                            price={item.discountedSellingPrice}
                                                            //image={img7}
                                                            rating={5}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                            ) : null

                                        }
                                    </Grid>
                                </div>
                            </div>
                        </>
                    )
                        : null}

            </div>
        </>
    );
};

export default Home;