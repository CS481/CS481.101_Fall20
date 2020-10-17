import React from 'react';
import CreateStyles from "../util/Stylesheet";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { List, ListItem, Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import Navigation from "../components/Navigation";
import Button from "@material-ui/core/Button";

import { RegisterRoutes } from "../util/RouteBuilder";


function Loginsignuppage() {

    const Styles = CreateStyles();

    return (
        <div className={Styles.root}>
            <Navigation TopbarMessage="Login/Signup!" Styles={Styles}/>
            <main className={Styles.content}>
                <div className={Styles.toolbar} />
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6} >
                        <Card className={Styles.card}>
                            <CardContent>
                                <Typography className={Styles.title} variant="h2">
                                    Login or Signup
                                </Typography>
                                <List>
                                    <ListItem>
                                            <TextField id="outlined-login-user-id" label="User ID" variant="outlined" />
                                    </ListItem>
                                    <ListItem>
                                            <TextField id="outlined-login-user-password" label="Password" variant="outlined" />
                                    </ListItem>
                                    <ListItem>
                                        <Button variant="contained" color="primary" size="medium">
                                            Submit
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button variant="contained" color="primary" size="medium">
                                            Signup
                                        </Button>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
}

RegisterRoutes(Loginsignuppage, "/loginsignup", "/Loginsignuppage", "LoginSignUpPage", "/loginsignupPage");
export default Loginsignuppage;
