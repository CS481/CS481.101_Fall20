import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Topbar from "../components/Topbar"
import Navbar from "../components/Navbar"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  card: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <Topbar message="York College of Pennsylvania Simulation Tool"/>
      <Navbar/> {/* This is necessary for some styling reason I'm too backend to understand */}

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} variant="h2">
                  Simulation Factory
                </Typography>
                <div className={classes.list}>
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
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} variant="h2">
                  Join Simulation
                </Typography>
                <div className={classes.list}>
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

export default ResponsiveDrawer;
