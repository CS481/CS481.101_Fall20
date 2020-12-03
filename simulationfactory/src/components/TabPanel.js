import React from "react";
import { Box } from "@material-ui/core";

function TabPanel(props) {
    const {value, index, children, other} = props;

    return (
        <div {...other}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

export default TabPanel;