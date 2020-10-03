import React from "react";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import CreateStyles from "../util/Stylesheet";

function Topbar(props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const Styles = CreateStyles();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };
    return (
        
        <AppBar position="fixed" className={Styles.appBar}>
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={Styles.menuButton}
            >
                <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap>{props.message}</Typography>
        </Toolbar>
      </AppBar>
    );
}

export default Topbar;
