import React from 'react';
import {Link} from "react-router-dom";
import { List, ListItem, ListItemText } from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import CreateStyles from "../util/Stylesheet";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

function Navbar(props) {
    const { window } = props;
    const Styles = CreateStyles();
    const theme = useTheme();
    const container = window !== undefined ? () => window().document.body : undefined;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={Styles.toolbar} />
            <Divider />
            <List>
                <ListItem>
                    <Link to = "/home" >Home</Link>
                </ListItem>
                <ListItem>
                    <Link to = "/factory" >Create Simulation</Link>
                </ListItem>
                <ListItem>
                    <Link to = "/player" >Join Simulation</Link>
                </ListItem>
                <ListItem>
                    <ListItemText primary="My Simulations" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="About" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <nav className={Styles.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    Styles={{
                        paper: Styles.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    Styles={{
                        paper: Styles.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );
}

export default Navbar;