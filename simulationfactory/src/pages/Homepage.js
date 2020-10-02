import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import CreateStyles from "../util/stylesheet";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import {RegisterRoutes} from "../util/RouteBuilder";

function Homepage(props) {
  const { window } = props;
  const Styles = CreateStyles();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={Styles.root}>
      <Topbar message="York College of Pennsylvania Simulation Tool" />
      <Navbar />{/* This is necessary for some styling reason I'm too backend to understand */}
      <main className={Styles.content}>
        <div className={Styles.toolbar} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card className={Styles.root}>
              <CardContent>
                <Typography className={Styles.title} variant="h2">
                  Simulation Factory
                </Typography>
                <div className={Styles.list}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Create your simulation" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Run your simulation real-time or asyncronous" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Get analytics and feedback from participants" />
                    </ListItem>
                  </List>
                </div>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" size="medium">
                  Create Simulation
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={Styles.root}>
              <CardContent>
                <Typography className={Styles.title} variant="h2">
                  Join Simulation
                </Typography>
                <div className={Styles.list}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Participate in Simulation" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Join with partner or run by yourself" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Contribute to research studies" />
                    </ListItem>
                  </List>
                </div>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" size="medium">
                  Join Simulation
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

RegisterRoutes(Homepage, "/", "/home", "/Home", "/Homepage", "/homepage", "/HomePage", "/homePage");
export default Homepage;
