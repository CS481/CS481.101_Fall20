import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

function CreateStyles() {
  const theme = useTheme();
  let styles = makeStyles((theme) => ({
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
    blue: {
      color: "blue",
    }
  }))
  return styles()
};

export default CreateStyles
