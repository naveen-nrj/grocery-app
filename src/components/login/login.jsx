import React, { useEffect, useState } from 'react';
//import Avatar from '@mui/material/Avatar';
//import CssBaseline from '@mui/material/CssBaseline';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import * as AlertService from "core-application/services/utils/alert-service/alert-service"
//import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStateValue } from "core-application/services/utils/context/context";
import * as AuthenticationService from "core-application/services/authentication/authentication"

const Login = () => {

    const [
        {
            login,
            login: {
                userName,
                password,
                latitude,
                longitude,
            }
        },
        dispatch,
    ] = useStateValue();
    const navigate = useNavigate();


    useEffect(() => {
        console.log(login);
    }, [login]);

    const handleLogin = () => {
        if (!latitude || !longitude) {
            AlertService.Error("Location is mandatory");
        } else {
            if (userName === "naveen" && password === "1234") {
                AuthenticationService.registerLogin(userName, password);
                dispatch({
                    type: "updateLoginState",
                    name: "isLoggedIn",
                    payload: true,

                });
                AlertService.Success("Successfully Logged in");
                navigate(`/home`);
            } else {
                AlertService.Error("Invalid Credentials");

            }
        }

    };
    const getLocation = () => {
        if (!navigator.geolocation) {
            AlertService.Error("Cannot Retrieve Location");
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                dispatch({
                    type: "updateLoginState",
                    name: "latitude",
                    payload: position.coords.latitude,

                });
                dispatch({
                    type: "updateLoginState",
                    name: "longitude",
                    payload: position.coords.longitude

                })
            }, () => {
                AlertService.Error("Cannot Retrieve Location");
            });
        }
    }

    const handleChange = ({ target: { name, value } }) => {
        dispatch({
            type: "updateLoginState",
            name: name,
            payload: value

        });
    }


    return (
        <div className='login'>
            <Container component="main" maxWidth="xs">

                <Box
                    pb={9}
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar> */}
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            value={userName}
                            onChange={handleChange}
                            name="userName"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            value={password}
                            onChange={handleChange}
                            type="password"
                            id="password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="latitude"
                            label="Latitude"
                            value={latitude}
                            // onChange={handleChange}
                            id="password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="latitude"
                            label="Longitude"
                            value={longitude}
                            // onChange={handleChange}
                            id="password"
                        />
                        <Button

                            variant="contained"
                            color={"success"}
                            sx={{ mt: 3, mb: 2 }}
                            onClick={getLocation}
                        >
                            Get Location
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogin}
                        >
                            Sign In
                        </Button>
                        {/* <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogin}
                        >
                            Sign Up
                        </Button> */}
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Login;