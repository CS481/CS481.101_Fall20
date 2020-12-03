import React from "react";
import FrameModification from "../simulation-schema/js/FrameModification";

import { 
  Grid,
  Card,
  CardActions,
  Button,
  CardContent,
  Menu, 
  MenuItem,
  Tabs,
  Tab,
  Table,
  TextField,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";

import CreateStyles from "../util/Stylesheet";
import Navigation from "../components/Navigation";
import TabPanel from "../components/TabPanel";
import { RegisterRoutes } from "../util/RouteBuilder";
import {
  InitializeSimulation,
  InitializeFrame,
  ModifyFrame,
  ModifySimulation
} from "../util/Backend";
import Close from "@material-ui/icons/Close";
import FrameDropzone from "../util/FrameDropzone";

function Factorypage(props) {

  const [inputList, setInputList] = React.useState([]);
  function onAddResponseClick (event) {
    let frame = findActiveFrame();
    frame.responses.push("");
    setInputList(inputList.concat(<TextField id="response" label="Response" variant="filled" key={inputList.length}
                                   onChange={(t) => {
                                      frame.responses[inputList.length] = t.target.value;
                                      try {
                                        commitFrame(frame);
                                        setError("");
                                      } catch (e) {
                                        console.log(e);
                                        setError("One of the responses is invalid. Do you have duplicates?");
                                      }
                                   }} />));
  };

  const Styles = CreateStyles();
  const [selectedFrameKey, setSelectedFrameKey] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [error, setError] = React.useState("");

  const [frameList, setframeList] = React.useState([]);
  const [simulation, setSimulation] = React.useState({
    resources: {},
    response_timeout: 500000
  });

  const [resourceName, setResourceName] = React.useState("");
  const [resourceValue, setResourceValue] = React.useState("");

  const [tabValue, setTabValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openPlayerAdd, setOpenPlayerAdd] = React.useState(false);
  /**
   * Handles resource dialog box
   */
  const [openResourceAdd, setOpenResourceAdd] = React.useState(false);

  // Information for backend
  const [simulationId, setSimulationId] = React.useState('');
  const [user, setUser] = React.useState({username: '', password: ''});
  
  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  };
  function handleMenuClose() {
    setAnchorEl(null);
  };
  function handleSheetOpen(event) {
    setOpen(true);
  };
  function handleSheetClose(event) {
    setOpen(false);
  };
  function handlePlayerAddOpen(event) {
    setOpenPlayerAdd(true);
    setAnchorEl(null);
  };
  function handlePlayerAddClose(event) {
    setOpenPlayerAdd(false);
  };
  function handleResourceAddOpen(event) {
    setOpenResourceAdd(true);
    setAnchorEl(null);
  };

  // Returns a new frame with all of the values set to the default, and the given id and type
  function getDefaultFrame(id, type) {
    return { 
      key: id,
      id: id,
      type: type,
      default_action: "",
      responses: [],
      rounds: [],
      effects: [],
      firstRound: "",
      lastRound: ""
    }
  }

  function addPrompt() {
    InitializeFrame({user: user, id: simulationId}, (r) => {
      setframeList([...frameList, getDefaultFrame(r.id, 0)]);    
    })
  };

  function addResponse() {
    InitializeFrame({user: user, id: simulationId}, (r) => {
      setframeList([...frameList, getDefaultFrame(r.id, 1)]);
    })
  };

  function addEvent() {
    InitializeFrame({user: user, id: simulationId}, (r) => {
      setframeList([...frameList, getDefaultFrame(r.id, 2)]);    
    })
  };

  // Returns the frame that the user currently has selected
  function findActiveFrame() {
    for(let i = 0; i < frameList.length && frameList.length > 0; i++) {
      if (frameList[i].key == selectedFrameKey) {
        return frameList[i];
      }
    }
  }

  // Stores the given frame into the backend
  function commitFrame(frame) {
    // Validate by FrameModification, as a poor excuse for proper error checking
    ModifyFrame(FrameModification.Validate({
      user: user,
      frame_id: frame.id,
      default_action: frame.default_action,
      responses: frame.responses,
      rounds: frame.rounds,
      effects: frame.effects,
      prompt: frame.prompt
    }), () => {});
  }

  function commitSimulation() {
    ModifySimulation({user: user,
                      simulation_id: simulationId,
                      resources: simulation.resources,
                      response_timeout: simulation.response_timeout
    }, () => {});
  }

  function addResource() {
    if (resourceName != "" && resourceValue != "") {
      simulation.resources[resourceName] = resourceValue;
    }
    commitSimulation();
  }

  // Adds either the first or last round numbers to the frame
  function addRounds(number, isFirst) {
    let frame = findActiveFrame();
    if (isFirst) {
      frame.firstRound = number;
    } else {
      frame.lastRound = number;
    }

    frame.rounds = [];
    if (frame.firstRound != "" && frame.lastRound != "") {
      let firstRound = parseInt(frame.firstRound);
      let lastRound = parseInt(frame.lastRound);
      while (firstRound <= lastRound) {
        frame.rounds.push(firstRound);
        firstRound++;
      }
    }
    commitFrame(frame);
  }

  // TODO: THIS IS REALLY BROKEN
  function deleteTab(e) {
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

  function renderFrameCard() {
    return (
      <Card className={Styles.root}>
        <CardContent>
          <Typography>
            Enter User Prompt:
          </Typography>
        </CardContent>
        <CardActions>
          <form>
            <TextField id="prompt"
              label="Prompt"
              variant="filled"
              multiline
              onChange={(t) => {
                let frame = findActiveFrame();
                frame.prompt = t.target.value;
                commitFrame(frame);
              }}/>
          </form>
          <Grid>
                <div>
                  <Button onClick={onAddResponseClick}>Add Response</Button>
                </div>
                <div>
                {inputList}
                </div>
          </Grid>
          <Grid>
            <TextField
              id="firstRound"
              label="First Round"
              type="number"
              variant="filled"
              onChange={(t) => addRounds(t.target.value, true)}
            />
            <TextField
              id="lastRound"
              label="Last Round"
              type="number"
              variant="filled"
              onChange={(t) => addRounds(t.target.value, false)}
            />
          </Grid>
          <Grid>
            <Typography color="error">
              {error}
            </Typography>
          </Grid>
        </CardActions>
      </Card>
    )
  }

  //TODO: Different types of frame cards
  function renderCard(tab) {
    switch (tab.type) {
      default:
        return renderFrameCard();
      case 1:
        return renderFrameCard();
      case 2:
        return renderFrameCard();
    }
  };

  // Temporary code until login process is completed
  function renderLogin() {
    return (
      <main className={Styles.content}>
        <div className={Styles.toolbar} /> {/* Why is this necessary */}
        <Card className={Styles.root}>
          <CardContent>
            <TextField id="username_field" label="Username" variant="filled"
              onChange={(t) => setUser({username: t.target.value, password: user.password})}/>
            <TextField id="password_field" label="Password" variant="filled"
              onChange={(t) => setUser({password: t.target.value, username: user.username})}/>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            {renderSubmitButton()}
          </CardContent>
        </Card>
      </main>
    )
  };

  function renderSubmitButton() {
    return (
      <Button variant="contained" color="primary" size="medium" 
        onClick={() => InitializeSimulation(user, (r) => setSimulationId(r.id))}>
        Begin
      </Button>
    )
  };

  function renderFrames() {
    return (
      <div className={Styles.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={selectedFrameKey}
          onChange={(_, newValue) => setSelectedFrameKey(newValue)}
          className={Styles.tabs}
        >
          {frameList.map((tab) => (
            <Tab
              key={tab.key.toString()}
              value={tab.id}
              label={"Node " + tab.id}
              icon={<Close id={tab.id} onClick={deleteTab} />}
              className="mytab"
            />
          ))}
        </Tabs>
        {frameList.map((tab) => (
          <TabPanel value={selectedFrameKey} index={tab.key}>
            {renderCard(tab)}
          </TabPanel>
        ))}
      </div>
    )
  }

  function renderAddResource() {
    return (
      <Dialog open={openResourceAdd} onClose={() => setOpenResourceAdd(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a Resource</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the resource
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name of resource to add"
            fullWidth
            onChange={(t) => {setResourceName(t.target.value)}}
          />
          <DialogContentText>
            Enter the starting amount of the resource:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Starting amount"
            type="number"
            fullWidth
            onChange={(t) => {setResourceValue(t.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResourceAdd(false)} color="primary">
            Cancel
          </Button>
          <Button color="primary"
            onClick={() => {
              setOpenResourceAdd(false);
              addResource();
          }}>
            Add Resource
          </Button>
        </DialogActions>
    </Dialog>
    )
  }

  function renderFactoryPage() {
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
                  <FrameDropzone frame={findActiveFrame()} commit={commitFrame}/>
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
            {renderAddResource()}
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
              <Grid item xs={12} sm={1}>
                <Tooltip title="Participants need this id to run your simulation. Save it somewhere you won't lose it!">
                  <div>Your simulation id is {simulationId}</div>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderFrames()}
            </Grid>
          </Grid>
        </main>
      </div>
    );
  };

  if (simulationId == '') {
    return renderLogin();
  } else {
    return renderFactoryPage();
  }
}

RegisterRoutes(
  Factorypage,
  "/factory",
  "/Factory",
  "/factoryPage",
  "/FactoryPage"
);

export default Factorypage;
