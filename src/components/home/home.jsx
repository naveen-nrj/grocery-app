import { Box, Button, Grid } from '@mui/material';
import Product from 'components/product/product';
import * as HomeController from "components/home/home-controller";
import { useStateValue } from 'core-application/services/utils/context/context';
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api';
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
            cart,
        },
        dispatch,
    ] = useStateValue();
    const [filteredItems, setFilteredItems] = useState([]);
    // const { isLoaded } = useJsApiLoader({
    //     googleMapsApiKey: "AIzaSyDtTxs1otUR7Pmy5sVWOl0NLs6UmG_gcRQ",

    // })
    // const [map, setMap] = useState(/** @type google.maps.Map */(null))
    // const [directionsResponse, setDirectionsResponse] = useState(null)
    // const [distance, setDistance] = useState('')
    // const [duration, setDuration] = useState('')

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

                {/* <div className='home_get_button'>
                    <Button onClick={getStore} variant="contained">Get Nearest Store</Button>
                </div> */}
                {
                    Object.keys(store).length ? (
                        <>
                            <div className="home_store_details">
                                <Grid container xs={12}>
                                    <Grid item xs={12}>
                                        <StoreCard store={store} />
                                    </Grid>
                                    {/* <Grid item xs={4}>
                                        <Box position="absolute" left={0} top={0} h="100%" w="100%">
                                            <GoogleMap
                                                center={{ lat: store.Latitude, lng: store.Longitude }}
                                                zoom={15}
                                                mapContainerStyle={{ width: '100%', height: '100%' }}
                                                options={{
                                                    zoomControl: false,
                                                    streetViewControl: false,
                                                    mapTypeControl: false,
                                                    fullscreenControl: false,
                                                }}
                                                onLoad={map => setMap(map)}
                                            >
                                                <Marker position={{ lat: store.Latitude, lng: store.Longitude }} />
                                                {directionsResponse && (
                                                    <DirectionsRenderer directions={directionsResponse} />
                                                )}
                                            </GoogleMap>
                                        </Box>
                                    </Grid> */}
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