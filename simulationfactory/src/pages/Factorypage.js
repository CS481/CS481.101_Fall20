import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {
  Tabs,
  Tab,
  TextField,
  CardContent,
  Typography,
} from "@material-ui/core";
import CreateStyles from "../util/Stylesheet";
import Navigation from "../components/Navigation";
import TabPanel from "../components/TabPanel";
import { RegisterRoutes } from "../util/RouteBuilder";
import Close from "@material-ui/icons/Close";

function Factorypage(props) {
  const [inputList, setInputList] = useState([]);
    const onAddResponseClick = event => {
      setInputList(inputList.concat(<TextField id="prompt" label="Prompt" variant="filled" key={inputList.length} />));
    };

  const Styles = CreateStyles();
  const [value, setValue] = React.useState(0);

  const [tabList, setTabList] = useState([
    {
      key: 0,
      id: 0,
      type: 0,
    },
  ]);

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                <TextField id="prompt" label="Prompt" variant="filled"/>
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
      <Navigation TopbarMessage="Simulation Builder" Styles={Styles} />

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
