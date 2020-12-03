import React from 'react';

import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
} from "@material-ui/core";

import Navigation from "../components/Navigation";
import { RegisterRoutes } from "../util/RouteBuilder";
import styles from "../util/Stylesheet";

import {
    BeginSim,
    GetState,
    SubmitResponse
} from "../util/Backend";

import FormatString from "../util/FormatString";

class SimulationPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioValue: false,
            logged_in: false,
            simState: {user_waiting: true}
        };
    }
    render() {
        if (this.state.logged_in) {
            return this.renderPlayer();
        } else {
            return this.renderLogin();
        }
    }

    getUser() {
        return {username: this.state.username, password: this.state.password};
    }

    getSimulationInstance() {
        return {user: this.getUser(), id: this.state.simulation_id};
    }

    beginSim() {
        BeginSim(this.getSimulationInstance(), () => {
            this.setState({logged_in: true});
            this.setSimState();
        });
    }

    setSimState() {
        GetState(this.getSimulationInstance(), (newState) => this.setState({simState: newState}));
    }

    // Temporary code for 50% completion
    renderLogin() {
        let Styles = this.props.Styles;
        return (
            <main className={Styles.content}>
                <div className={Styles.toolbar} /> {/* Why is this necessary */}
                <Card className={Styles.root}>
                    <CardContent>
                        <TextField id="username_field" label="Username" variant="filled" onChange={(t) => this.setState({username: t.target.value})}/>
                        <TextField id="password_field" label="Password" variant="filled" onChange={(t) => this.setState({password: t.target.value})}/>
                        <TextField id="simulation_id_field" label="Simulation Id" variant="filled" onChange={(t) => this.setState({simulation_id: t.target.value})}/>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        {this.renderSubmitButton()}
                    </CardContent>
                </Card>
            </main>
        )
    }

    renderPlayer() {
        let Styles = this.props.Styles;
        return (
            <main className={Styles.content}>
                <div className={Styles.toolbar} /> {/* Why is this necessary */}
                <Card className={Styles.root}>
                    <CardContent>
                        <Typography variant="h3" component="p">
                            {this.renderPrompt()}
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
                        {this.renderSubmitButton()}
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
        if (!this.state.simState.user_waiting) {
            let responses = this.state.simState.active_frame.responses;
            return responses.map((response) => {
                return <FormControlLabel value={response} control={<Radio/>} label={response} checked={this.state.radioValue===response} />
            });
        }
    }

    renderSubmitButton() {
        if (!this.state.logged_in)
        {
            return (
                <Button variant="contained" color="primary" size="medium" 
                    onClick={() => this.beginSim()}> {/* 'this' is undefined if you try to write the callback the obvious way */}
                    Begin
                </Button>
            )
        } else if (!this.state.simState.user_waiting) {
            return (
                <Button variant="contained" color="primary" size="medium" 
                    onClick={() => this.submitResponse()}> {/* 'this' is undefined if you try to write the callback the obvious way */}
                    Submit
                </Button>
            )
        } else {
            return (
                <Button variant="contained" color="primary" size="medium" 
                    onClick={() => this.setSimState()}> {/* 'this' is undefined if you try to write the callback the obvious way */}
                    Refresh
                </Button>
            )
        }
    }

    renderPrompt() {
        if (this.state.simState.user_waiting) {
            return "Waiting..."
        } else {
            return FormatString(this.state.simState.active_frame.prompt, this.state.simState)
        }
    }

    submitResponse() {
        // Do nothing if the user has not chosen a response
        if (!this.state.radioValue) {
            return
        }
        SubmitResponse({user: this.getUser(), response: this.state.radioValue, simulation_id: this.state.simulation_id},
                       () => this.setState({radioValue: false, simState: {user_waiting: true}})
                      );
    }
}

function Playerpage() {
    const Styles = styles();
    return (
        <div className={Styles.root}>
            <Navigation TopbarMessage="Simulation Player" Styles={Styles}/>
            <SimulationPlayer Styles={Styles}/> {/* Not sure why, but we can't rebuild our classes inside this Class component */}
        </div>
    );
}

RegisterRoutes(Playerpage, "/player", "/playerpage", "/Player", "/Playerpage", "/playerPage");
export default Playerpage;