import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import palette from "./palette.json"
export const Theme = createMuiTheme(palette);
const drawerWidth = 240;

function CreateStyles() {
  const styles = makeStyles((Theme) => ({
    root: {
      flexGrow: 1,
      display: "flex",
    },
    title: {
      color: Theme.palette.primary.main,
    },
    card: {
      padding: Theme.spacing(2),
      textAlign: "center",
    },
    drawer: {
      [Theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [Theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: Theme.spacing(2),
      [Theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: Theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: Theme.spacing(3),
    },
    defaultButton: {
      variant: "contained",
      size: "medium"
    },
  }))
  return styles()
};

export default CreateStyles
