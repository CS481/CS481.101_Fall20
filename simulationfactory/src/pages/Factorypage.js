import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Table from '../components/Table'

import {
  Menu, 
  MenuItem,
  Tabs,
  Tab,
  TextField,
  Tooltip,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText
} from "@material-ui/core";

import CreateStyles from "../util/Stylesheet";
import Navigation from "../components/Navigation";
import TabPanel from "../components/TabPanel";
import { RegisterRoutes } from "../util/RouteBuilder";
import {
  InitializeSimulation,
  InitializeFrame
} from "../util/Backend";
import Close from "@material-ui/icons/Close";

function Factorypage(props) {

  const [inputList, setInputList] = React.useState([]);
  const onAddResponseClick = event => {
    setInputList(inputList.concat(<TextField id="prompt" label="Prompt" variant="filled" key={inputList.length} />));
  };

  const Styles = CreateStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [tabList, setTabList] = React.useState([]);

  const [tabValue, setTabValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openPlayerAdd, setOpenPlayerAdd] = React.useState(false);
  const [openResourceAdd, setOpenResourceAdd] = React.useState(false);

  // Information for backend
  const [simulationId, setSimulationId] = React.useState('');
  const [user, setUser] = React.useState({username: '', password: ''});
  
  function handleChange(event, newValue) {
    setValue(newValue);
  };
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
    setAnchorEl(null);;
  };
  function handlePlayerAddClose(event) {
    setOpenPlayerAdd(false);
  };
  function handleResourceAddOpen(event) {
    setOpenResourceAdd(true);
    setAnchorEl(null);
  };
  function handleResourceAddClose(event) {
    setOpenResourceAdd(false);
  };
  function addPrompt() {
    InitializeFrame({user: user, id: simulationId}, (r) => {
      setTabList([...tabList, { key: r.id, id: r.id, type: 0 }]);
    })
  };

  function addResponse() {
    InitializeFrame({user: user, id: simulationId}, (r) => {
      setTabList([...tabList, { key: r.id, id: r.id, type: 1 }]);
    })
  };

  function addEvent() {
    InitializeFrame({user: user, id: simulationId}, (r) => {
      setTabList([...tabList, { key: r.id, id: r.id, type: 2 }]);
    })
  };

  function deleteTab(e) {
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
                  <Table x={25} y={25} />
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
              <Grid item xs={12} sm={1}>
                <Tooltip title="Participants need this id to run your simulation. Save it somewhere you won't lose it!">
                  <div>Your simulation id is {simulationId}</div>
                </Tooltip>
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
