import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Navigation from "../components/Navigation";
import styles from "../util/Stylesheet";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { RegisterRoutes } from "../util/RouteBuilder";

function Aboutpage() {

    const Styles = styles();
    
    return (
        <div className={Styles.root}>
            <Navigation TopbarMessage="About" Styles={Styles}/>
            <main className={Styles.content}>
                <div className={Styles.toolbar} />
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6} >
                        <Card className={Styles.card}>
                            <CardContent>
                                <Typography className={Styles.title} variant="h2">
                                    Back-End
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Person 1" />
                                        <ListItemText primary="Link to github" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Person 2" />
                                        <ListItemText primary="Link to gitlab" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Didn't want credited so delete this entry" />
                                        <ListItemText primary="Link to github" />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Card className={Styles.card}>
                            <CardContent>
                                <Typography className={Styles.title} variant="h2">
                                    Front-End
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Person 1" />
                                        <ListItemText primary="Link to github" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Person 2" />
                                        <ListItemText primary="Didn't want to link to github" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Brandon Miller" />
                                        <a href="https://www.ycp.edu">Brandon Millers Github</a>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Card className={Styles.card}>
                            <CardContent>
                                <Typography className={Styles.title} variant="h2">
                                    About
                                </Typography>
                                <Typography variant="h2">
                                    Made at York College of Pennsylvania by very hard working students.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
}

RegisterRoutes(Aboutpage, "/about", "/aboot", "/About");
export default Aboutpage;