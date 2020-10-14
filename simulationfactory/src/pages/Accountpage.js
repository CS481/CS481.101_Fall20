import React from 'react';
import CreateStyles from "../util/Stylesheet";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import Navigation from "../components/Navigation";

import {RegisterRoutes} from "../util/RouteBuilder";


function Accountpage() {

    const Styles = CreateStyles();

    return (
        <div className={Styles.root}>
            <Navigation TopbarMessage="My Account" Styles={Styles}/>
            <main className={Styles.content}>
                <div className={Styles.toolbar} />
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Card className={Styles.root}>
                            <CardContent>
                                <Typography className={Styles.title} variant="h2">
                                    Account Info
                                </Typography>
                                <div ClassName={Styles.list}>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary="User ID: " />
                                            <ListItemText primary=" 123456789 " />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Email: " />
                                            <ListItemText primary=" thisperson@companydomain.com " />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Change Email: " />
                                                <form className={Styles.root} noValidate autoComplete="off">
                                                    <TextField id="outlined-account-new-email" label="New Email" variant="outlined" />
                                                    
                                                </form>
                                                </ListItem>
                                                    <ListItem>
                                                <ListItemText primary="Password: " />
                                                <form className={Styles.root} noValidate autoComplete="off">
                                                    <TextField id="outlined-account-password" label="Password" variant="outlined" />
                                                </form>
                                        </ListItem>
                                    </List>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className={Styles.root}>
                            <CardContent>
                                <Typography className={Styles.title} variant="h2">
                                    Change Password
                                </Typography>
                                <div ClassName={Styles.list}>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary="Original: " />
                                                <form className={Styles.root} noValidate autoComplete="off">
                                                    <TextField id="outlined-account-password-original" label="Original Password" variant="outlined" />
                                                </form>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="New Password: " />
                                                <form className={Styles.root} noValidate autoComplete="off">
                                                    <TextField id="outlined-account-password-new" label="New Password" variant="outlined" />
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

RegisterRoutes(Accountpage, "/account", "/Accountpage", "/AccountPage", "/accountpage");
export default Accountpage;
