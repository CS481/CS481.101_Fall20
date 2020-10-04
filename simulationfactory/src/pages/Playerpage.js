import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import {RegisterRoutes} from "../util/RouteBuilder";
import CreateStyles from "../util/Stylesheet";
import {GetState} from "../util/Backend";
import FormatString from "../util/FormatString";

class SimulationPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioValue: -1,
            simState: GetState({"instance_id": "1", "user_id": "player"})
        };
    }
    render() {
        let Styles = this.props.Styles;
        if (this.state.simState.user_waiting) {
            return this.renderUserWaiting();
        } else {
            return this.renderUserReady();
        }
    }
    renderUserWaiting() {
        throw new Error(`renderUserWaiting unimplemented`);
    }
    renderUserReady() {
        let Styles = this.props.Styles;
        return (
            <main className={Styles.content}>
                <div className={Styles.toolbar} /> {/* Why is this necessary */}
                <Card className={Styles.root}>
                    <CardContent>
                        <Typography variant="h2" component="p">
                            {FormatString(this.state.simState.active_frame.prompt, this.state.simState)}
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={Styles.root}>
                    <CardContent>
                        {this.renderResponses(Styles)}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Button variant="contained" color="primary" size="medium" 
                        onClick={() => this.submitResponse()}> {/* 'this' is undefined if you try to write the callback the obvious way */}
                            Submit
                        </Button>
                    </CardContent>
                </Card>
            </main>
        )
    }
    renderResponses() {
        return (
            <FormControl component="fieldset">
                <RadioGroup aria-label="options" name="options1" value={this.state.radioValue}
                    onChange={(event) => {this.setState({radioValue: event.target.value})}}>
                    {this.renderResponseButtons()}
                </RadioGroup>
            </FormControl>
        )
    }
    renderResponseButtons() {
        let responses = this.state.simState.active_frame.responses;
        let i = -1;
        return responses.map((response) => {
            i++;
            return <FormControlLabel value={i} control={<Radio/>} label={response} checked={this.state.radioValue==i} />
        });
    }
    submitResponse() {
        this.setState({simState: GetState({"instance_id": "1", "user_id": "player"})})
    }
}

function Playerpage() {
    const Styles = CreateStyles();
    return (
        <div className={Styles.root}>
            <Topbar message="Simulation Player"/>
            <Navbar/> {/* This is necessary for some styling reason I'm too backend to understand */}
            <SimulationPlayer Styles={Styles}/> {/* Not sure why, but we can't rebuild our classes inside this component */}
        </div>
    );
}

RegisterRoutes(Playerpage, "/player", "/playerpage", "/Player", "/Playerpage", "/playerPage");
export default Playerpage;