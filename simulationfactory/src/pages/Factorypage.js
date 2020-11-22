import React, { useState } from "react";

import { 
  Grid,
  Card,
  CardActions,
  Button,
  AppBar,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";

import CreateStyles from "../util/Stylesheet";
import Navigation from "../components/Navigation";
import TabPanel from "../components/TabPanel";
import { RegisterRoutes } from "../util/RouteBuilder";
import Close from "@material-ui/icons/Close";
import MyDropzone from "../util/MyDropzone";

function Factorypage(props) {
  
  const { window } = props;
  const { useState } = React;

  const [inputList, setInputList] = useState([]);
  const onAddResponseClick = event => {
    setInputList(inputList.concat(<TextField id="prompt" label="Prompt" variant="filled" key={inputList.length} />));
  };

  const Styles = CreateStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [frameList, setFrameList] = useState([
    {
      key: 0,
      id: 0,
      type: 0,
    },
  ]);

    /**
   * Array of player names/ids
   * NOT FUNCTIONAL
   */
  const players = {};
  /**
   * Array of player resources
   */
  const resources = {
    player1_money: 0,
    player2_money: 0,
    env_money: 0,
  };

  /**
   * Sets which frame is active
   */
  const [tabValue, setFrameValue] = useState(0);

  /**
   * Handles lookup table dialog box
   */
  const [openLookupTable, setOpenLookupTable] = React.useState(false);

  /**
   * Handles player dialog box
   */
  const [openPlayerAdd, setOpenPlayerAdd] = React.useState(false);
  /**
   * Handles resource dialog box
   */
  const [openResourceAdd, setOpenResourceAdd] = React.useState(false);

  /**
   * Handles changing of frame tabs
   * @param {*} event button click
   * @param {int} newValue tab number
   */
  const handleFrameChange = (event, newValue) => {
    setValue(newValue);
  };

  /**
   * Handles when user selects option in settings menu
   * @param {*} event button click
   */
  const handleSettingsMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handles when closes setting menu
   */
  const handleSettingMenuClose = () => {
    setAnchorEl(null);
  };

  /**
   * Lookup sheet open
   * @param {*} event click button
   */
  const handleSheetOpen = (event) => {
    setOpenLookupTable(true);
  };

  /**
   * Lookup sheet close
   * @param {*} event 
   */
  const handleSheetClose = (event) => {
    setOpenLookupTable(false);
  };

  const handlePlayerAddOpen = (event) => {
    setOpenPlayerAdd(true);
    setAnchorEl(null);
  };
  const handlePlayerAddClose = (event) => {
    setOpenPlayerAdd(false);
  };
  const handleResourceAddOpen = (event) => {
    setOpenResourceAdd(true);
    setAnchorEl(null);
  };
  const handleResourceAddClose = (event) => {
    setOpenResourceAdd(false);
  };

  /**
   * for addPrompt addResponse, addEvent
   * adding new frame, given frame type
   */
  const addPrompt = () => {
    let id = frameList[frameList.length - 1].id + 1;
    setFrameList([...frameList, { key: id, id: id, type: 0 }]);
  };
  const addResponse = () => {
    let id = frameList[frameList.length - 1].id + 1;
    setFrameList([...frameList, { key: id, id: id, type: 1 }]);
  };
  const addEvent = () => {
    let id = frameList[frameList.length - 1].id + 1;
    setFrameList([...frameList, { key: id, id: id, type: 2 }]);
  };

  const deleteFrame = (e) => {
    e.stopPropagation();

    if (frameList.length === 1) {
      return;
    }
    let tabId = parseInt(e.target.id);
    let tabIDIndex = 0;

    let tabs = frameList.filter((value, index) => {
      if (value.id === tabId) {
        tabIDIndex = index;
      }
      return value.id !== tabId;
    });

    let curValue = parseInt(tabValue);
    if (curValue === tabId) {
      if (tabIDIndex === 0) {
        curValue = frameList[tabIDIndex + 1].id;
      } else {
        curValue = frameList[tabIDIndex - 1].id;
      }
    }
    setFrameValue(curValue);
    setFrameList(tabs);
  };

  function renderCard(tab) {

    switch (tab.type) {
      default:
        return (
          <Card className={Styles.root}>
            <CardContent>
              <Typography>
                Enter User Prompt:
              </Typography>
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
              <Typography>
                Enter Response:
              </Typography>
            </CardContent>
            <CardActions>
              <Grid>
                <form>
                  <TextField id="Response1" label="Response 1" variant="filled"/>
                </form>
                <div>
                  <Button onClick={onAddResponseClick}>Add Response</Button>
                </div>
                <div>
                {inputList}
                </div>
              </Grid>
            </CardActions>
          </Card>
        );

      case 2:
        return (
          <Card className={Styles.root}>
            <CardContent>
              <Typography>
                Enter Event:
              </Typography>
            </CardContent>
            <CardActions>
              <form>
                <TextField id="prompt" label="Prompt" variant="filled"/>
              </form>
            </CardActions>
          </Card>
        );
    }
  }

  return (
    <div className={Styles.root}>
      <script src="xlsx.full.min.js"></script>
      <Navigation TopbarMessage="Simulation Builder" Styles={Styles}>
        <Button
          className="SimMenuButton"
          aria-controls="sim-menu"
          aria-haspopup="true"
          onClick={handleSettingsMenuClick}
        >
          Simulation Settings
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleSettingMenuClose}
        >
          <MenuItem onClick={handleSheetOpen}>Import Lookup Table</MenuItem>
          <Dialog
            onClose={handleSheetClose}
            aria-labeledby="lookup-table-dialog"
            open={openLookupTable}
          >
            <DialogTitle id="lookup-table-title" onClose={handleSheetClose}>
              Lookup Table Entry
            </DialogTitle>
            <DialogContent dividers>
              <div style={{ width: "max-content" }}>
              <MyDropzone dropzone></MyDropzone>
              </div>
            </DialogContent>
          </Dialog>
          <MenuItem onClick={handlePlayerAddOpen}>Add Player</MenuItem>
          <Dialog open={openPlayerAdd} onClose={handlePlayerAddClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add a Player</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter the name of the player.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name of Player to add"
                  fullWidth
                />
              </DialogContent>
            <DialogActions>
              <Button onClick={handlePlayerAddClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handlePlayerAddClose} color="primary">
                Add Player
              </Button>
            </DialogActions>
          </Dialog>
          <MenuItem onClick={handleResourceAddOpen}>Add Resource</MenuItem>
          <Dialog open={openResourceAdd} onClose={handleResourceAddClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add a Resource</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter the name of the resource.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name of resource to add"
                  fullWidth
                />
              </DialogContent>
            <DialogActions>
              <Button onClick={handleResourceAddClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleResourceAddClose} color="primary">
                Add Resource
              </Button>
            </DialogActions>
          </Dialog>
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
                onChange={handleFrameChange}
                className={Styles.tabs}
              >
                {frameList.map((tab) => (
                  <Tab
                    key={tab.key.toString()}
                    value={tab.id}
                    label={"Node " + tab.id}
                    icon={<Close id={tab.id} onClick={deleteFrame} />}
                    className="mytab"
                  />
                ))}
              </Tabs>
              {frameList.map((tab) => (
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
