import { createMuiTheme, makeStyles, responsiveFontSizes } from "@material-ui/core/styles";
import palette from "./palette.json"
import 'handsontable/dist/handsontable.full.css';

const drawerWidth = 200;

function CreateStyles() {

  const styles = makeStyles((Theme) => ({
    root: {
      flexGrow: 1,
      display: "flex"
    },
    title: {
      color: Theme.palette.primary.main,
    },
    card: {
      //flexGrow: 1,
      //display: "flex",
      //padding: Theme.spacing(2),
      //textAlign: "center"
    },
    drawer: {
      [Theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    appBar: {
      [Theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      },
    },
    menuButton: {
      marginRight: Theme.spacing(2),
      [Theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    blue: {
      color: "blue",
    },
    // necessary for content to be below app bar
    toolbar: Theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: Theme.spacing(3)
    },
    noDecoration: {
      textDecoration: 'none'
    },
    tabs: {
      borderRight: `1px solid ${Theme.palette.divider}`,
    },
  }))
  return styles()
};

export const Theme = responsiveFontSizes(createMuiTheme(palette));
export default CreateStyles
