import React from "react";
import {
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";

import Navigation from "../components/Navigation";
import CreateStyles from "../util/Stylesheet";
import { RegisterRoutes } from "../util/RouteBuilder";

function Aboutpage() {

    const Styles = CreateStyles();
    
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
                                        <ListItemText primary="Ralph Greaves" />
                                        <ListItemText><a href="https://github.com/regreaves">Github</a></ListItemText>
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
                                        <ListItemText primary="Alex Louderback" />
                                        <ListItemText><a href="https://github.com/alouderback">Github</a></ListItemText>
                                        <ListItemText><a href="https://www.linkedin.com/in/alex-louderback-a2a599149/">Linkedin</a></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Cayden Reynolds" />
                                        <ListItemText><a href="https://github.com/caydenreynolds">Github</a></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Brandon Miller" />
                                        <ListItemText><a href="https://github.com/ScratchnSniff0">Github</a></ListItemText>
                                        <ListItemText><a href="https://www.linkedin.com/in/brandon-m-miller">Linkedin</a></ListItemText>
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
