import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';




export default function StoreCard({ store }) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>

                        <Typography variant="subtitle1">
                            Nearest Store Name : {store.Store_Name}
                            <br />
                            Area: {store.Area}
                            <br />
                            Latitude : {store.Latitude}
                            <br />
                            Longitude: {store.Longitude}
                        </Typography>


                    </CardContent>
                </React.Fragment>
            </Card>
        </Box>
    );
}