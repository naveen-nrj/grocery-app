import React from 'react';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useStateValue } from "core-application/services/utils/context/context";
import "./header.css";
import { Button } from '@mui/material';
import * as AlertService from "core-application/services/utils/alert-service/alert-service"

const Header = () => {
    const [
        {
            login: {
                userName,
                isLoggedIn

            },
            config: {
                search,
            },
            cart
        },
        dispatch,
    ] = useStateValue();

    const handleChange = ({ target: { name, value } }) => {
        dispatch({
            type: "updateConfigState",
            name: name,
            payload: value
        });
    }
    const handleLogin = () => {
        if (isLoggedIn) {
            dispatch({
                type: "revertLoginState",
            });
            dispatch({
                type: "updateConfigState",
                name: "store",
                payload: {}
            });
            AlertService.Success("Successfully Logged out");
        }
    }

    return (

        <div className="header">
            <Link to={"/home"}>
                <span className="header__optionLineTwo">
                    Grocery Shopping
                </span>
            </Link>

            {
                isLoggedIn &&
                <>

                    <div className="header__search">
                        <input name="search" className="header__searchInput" type="search" onChange={handleChange} placeholder="Search for groceries..." />
                        <SearchIcon className="header__searchIcon" />
                    </div>

                    <div className="header__nav">
                        <Link to={"/login"}>
                            <div onClick={handleLogin} className="header__option">
                                <span className="header__optionLineOne">
                                    Hello {isLoggedIn ? userName : "Guest"}
                                </span>
                                <span className="header__optionLineTwo">
                                    {isLoggedIn ? "Sign Out" : "Sign In"}
                                </span>
                            </div>
                        </Link>
                        <Link to="/orders">
                            <div className="header__option">
                                <span className="header__optionLineOne">Returns</span>
                                <span className="header__optionLineTwo">& Orders</span>
                            </div>
                        </Link>
                        <Link to="/cart">
                            <div className="header__optionBasket">
                                <ShoppingCartRoundedIcon />
                                <span className="header__optionLineTwo header__basketCount">
                                    {cart?.length
                                    }
                                </span>
                            </div>
                        </Link>
                    </div>
                </>

            }

        </div>

    );
};

export default Header;