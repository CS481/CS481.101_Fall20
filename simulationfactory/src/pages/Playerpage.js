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
import {GetState, SubmitResponse} from "../util/Backend";
import FormatString from "../util/FormatString";

class SimulationPlayer extends React.Component {
    constructor(props) {
        super(props);
        let instance_id = {"instance_id": "1", "user_id": "player"}
        let default_state = {
            user_waiting: true,
            active_frame: {
                prompt: "waiting...",
                responses: []
            }
        };
        this.state = {
            radioValue: -1,
            instance_id: instance_id,
            simState: default_state
        };
        GetState({"instance_id": "1", "user_id": "player"}, (state) => {this.setState({simState: state, radioValue: -1});});

    }
    render() {
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
                        { this.renderResponses(Styles) }
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
        // Do nothing if the user has not chosen a response
        if (this.state.radioValue == -1) {
            return
        }
        SubmitResponse({instance: this.state.instance_id, response: this.state.radioValue});
        GetState({"instance_id": "1", "user_id": "player"}, (state) => {this.setState({simState: state, radioValue: -1});});
    }
}

function Playerpage() {
    const Styles = CreateStyles();
    return (
        <div className={Styles.root}>
            <Topbar message="Simulation Player"/>
            <Navbar/> {/* This is necessary for some styling reason I'm too backend to understand */}
            <SimulationPlayer Styles={Styles}/> {/* Not sure why, but we can't rebuild our classes inside this Class component */}
        </div>
    );
}

RegisterRoutes(Playerpage, "/player", "/playerpage", "/Player", "/Playerpage", "/playerPage");
export default Playerpage;