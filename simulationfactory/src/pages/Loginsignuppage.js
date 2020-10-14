import React from 'react';
import CreateStyles from "../util/Stylesheet";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import Navigation from "../components/Navigation";

import {RegisterRoutes} from "../util/RouteBuilder";


function Loginsignuppage() {

    const Styles = CreateStyles();

    return (
        <div className={Styles.root}>
            <Navigation TopbarMessage="Login/Signup!" Styles={Styles}/>
            <main className={Styles.content}>
                <div className={Styles.toolbar} />
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Card className={Styles.root}>
                            <CardContent>
                                <Typography className={Styles.title} variant="h2">
                                    Login
                                </Typography>
                                <div ClassName={Styles.list}>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary="User ID: " />
                                                <form className={Styles.root} noValidate autoComplete="off">
                                                    <TextField id="outlined-login-user-id" label="User ID" variant="outlined" />
                                                </form>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Password: " />
                                                <form className={Styles.root} noValidate autoComplete="off">
                                                    <TextField id="outlined-login-user-password" label="Password" variant="outlined" />
                                                </form>
                                        </ListItem>
                                    </List>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className={Styles.root}>
                            <CardContent>
                                <Typography className={Styles.title} variant="h2">
                                    Signup
                                </Typography>
                                <div ClassName={Styles.list}>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary="User ID: " />
                                                <form className={Styles.root} noValidate autoComplete="off">
                                                    <TextField id="outlined-signup-user-id" label="User ID" variant="outlined" />
                                                </form>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Password: " />
                                                <form className={Styles.root} noValidate autoComplete="off">
                                                    <TextField id="outlined-signup-user-password" label="Password" variant="outlined" />
                                                </form>
                                        </ListItem>
                                    </List>
                                </div>
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
