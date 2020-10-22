import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
  const { window } = props;
  const Styles = CreateStyles();
  const [value, setValue] = React.useState(0);

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [tabList, setTabList] = useState([
    {
      key: 0,
      id: 0,
    },
  ]);

  const [tabValue, setTabValue] = useState(0);

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addTab = () => {
    let id = tabList[tabList.length - 1].id + 1;
    setTabList([...tabList, { key: id, id: id }]);
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
                onClick={addTab}
              >
                Add event
              </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={addTab}
              >
                Add prompt
              </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={addTab}
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
                  <Card className={Styles.root}>
                    <CardContent>
                      <Typography>
                        This is Card {tab.key}
                      </Typography>
                    </CardContent>
                  </Card>
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
