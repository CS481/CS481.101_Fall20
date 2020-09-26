import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Tabs, Tab, TextField } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import TabPanel from "../components/TabPanel";

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

function Factorypage(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const container =
    window !== undefined ? () => window().document.body : undefined;
  
  return (
    <div className={classes.root}>
      <Topbar message="Simulation Builder"/>
      <Navbar/> {/* This is necessary for some styling reason I'm too backend to understand */}

      <main className={classes.content}>
        <div className={classes.toolbar} /> {/* Why is this necessary */}
        <Grid container spacing={3} justify="center">
          <Grid container spacing={1} justify="center">
            <Grid item xs={12} sm={1}>
              <Button variant="contained" color="primary" size="medium">
                  Add event
              </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button variant="contained" color="primary" size="medium">
                  Add prompt
              </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button variant="contained" color="primary" size="medium">
                  Add response
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
              <Tab label="Event 1"/>
              <Tab label="Response 1"/>?
            </Tabs>
            <TabPanel index={0} value={value}>
              <Card className={classes.root}>
                <CardActions>
                  <form>
                    <TextField id="standard-basic" label="Title" />
                    <br/>
                    <Select style={{padding: theme.spacing(2)}}>
                      <MenuItem value={10}>Player 1 Cash</MenuItem>
                      <MenuItem value={20}>Player 2 Cash</MenuItem>
                      <MenuItem value={30}>Shared Resource</MenuItem>
                    </Select>
                    <TextField id="standard-basic" label="Change" />
                    <div style={{color: "blue"}}>
                      + add an effect
                    </div>
                    <TextField id="standard-basic" label="Rounds" />
                  </form>
                </CardActions>
              </Card>
            </TabPanel>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default Factorypage;
