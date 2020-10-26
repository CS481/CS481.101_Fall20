import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

import Table from '../components/Table'


import {
  Tabs,
  Tab,
  TextField,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import CreateStyles from "../util/Stylesheet";
import Navigation from "../components/Navigation";
import TabPanel from "../components/TabPanel";
import { RegisterRoutes } from "../util/RouteBuilder";
import Close from "@material-ui/icons/Close";

function Factorypage(props) {
  const { window } = props;
  const { useState } = React;
  const Styles = CreateStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [tabList, setTabList] = useState([
    {
      key: 0,
      id: 0,
      type: 0,
    },
  ]);

  const players = {};
  const resources = {
    player1_money: 0,
    player2_money: 0,
    env_money: 0,
  };

  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSheetOpen = (event) => {
    setOpen(true);
  };
  const handleSheetClose = (event) => {
    setOpen(false);
  };
  const addPrompt = () => {
    let id = tabList[tabList.length - 1].id + 1;
    setTabList([...tabList, { key: id, id: id, type: 0 }]);
  };

  const addResponse = () => {
    let id = tabList[tabList.length - 1].id + 1;
    setTabList([...tabList, { key: id, id: id, type: 1 }]);
  };

  const addEvent = () => {
    let id = tabList[tabList.length - 1].id + 1;
    setTabList([...tabList, { key: id, id: id, type: 2 }]);
  };

  const deleteTab = (e) => {
    e.stopPropagation();

    if (tabList.length === 1) {
      return;
    }
    let tabId = parseInt(e.target.id);
    let tabIDIndex = 0;

    let tabs = tabList.filter((value, index) => {
      if (value.id === tabId) {
        tabIDIndex = index;
      }
      return value.id !== tabId;
    });

    let curValue = parseInt(tabValue);
    if (curValue === tabId) {
      if (tabIDIndex === 0) {
        curValue = tabList[tabIDIndex + 1].id;
      } else {
        curValue = tabList[tabIDIndex - 1].id;
      }
    }
    setTabValue(curValue);
    setTabList(tabs);
  };

  function renderCard(tab) {
    switch (tab.type) {
      case 0:
        return (
          <Card className={Styles.root}>
            <CardContent>
              <Typography>Enter User Prompt:</Typography>
            </CardContent>
            <CardActions>
              <form>
                <TextField id="prompt" label="Prompt" variant="filled" />
              </form>
            </CardActions>
          </Card>
        );
      case 1:
        return (
          <Card className={Styles.root}>
            <CardContent>
              <Typography>Enter User Response Options:</Typography>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card className={Styles.root}>
            <CardContent>
              <Typography>Event</Typography>
            </CardContent>
          </Card>
        );
    }
  }

  const [columns, setColumns] = useState([
    { title: "Name", field: "name" },
    {
      title: "Surname",
      field: "surname",
      initialEditValue: "initial edit value",
    },
    { title: "Birth Year", field: "birthYear", type: "numeric" },
    {
      title: "Birth Place",
      field: "birthCity",
      lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
    },
  ]);

  const [data, setData] = useState([
    { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
    { name: "Zerya Betül", surname: "Baran", birthYear: 2017, birthCity: 34 },
  ]);

  return (
    <div className={Styles.root}>
      <script src="xlsx.full.min.js"></script>
      <Navigation TopbarMessage="Simulation Builder" Styles={Styles}>
        <Button
          className="SimMenuButton"
          aria-controls="sim-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          Simulation Settings
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleSheetOpen}>Import Lookup Table</MenuItem>
          <Dialog
            onClose={handleSheetClose}
            aria-labeledby="lookup-table-dialog"
            open={open}
          >
            <DialogTitle id="lookup-table-title" onClose={handleSheetClose}>
              Lookup Table Entry
            </DialogTitle>
            <DialogContent dividers>
              <div style={{ width: "max-content" }}>
                <Table x={25} y={25} />
                
              </div>
            </DialogContent>
          </Dialog>
          <MenuItem onClick={handleMenuClose}>Add Player</MenuItem>
          <MenuItem onClick={handleMenuClose}>Add Resource</MenuItem>
        </Menu>
      </Navigation>
      <main className={Styles.content}>
        <div className={Styles.toolbar} /> {/* Why is this necessary */}
        <Grid container spacing={3} justify="center">
          <Grid container spacing={1} justify="center">
            <Grid item xs={12} sm={1}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={addEvent}
              >
                Add event
              </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={addPrompt}
              >
                Add prompt
              </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={addResponse}
              >
                Add response
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={Styles.root}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                className={Styles.tabs}
              >
                {tabList.map((tab) => (
                  <Tab
                    key={tab.key.toString()}
                    value={tab.id}
                    label={"Node " + tab.id}
                    icon={<Close id={tab.id} onClick={deleteTab} />}
                    className="mytab"
                  />
                ))}
              </Tabs>
              {tabList.map((tab) => (
                <TabPanel value={value} index={tab.key}>
                  {renderCard(tab)}
                </TabPanel>
              ))}
            </div>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
RegisterRoutes(
  Factorypage,
  "/factory",
  "/Factory",
  "/factoryPage",
  "/FactoryPage"
);

export default Factorypage;
