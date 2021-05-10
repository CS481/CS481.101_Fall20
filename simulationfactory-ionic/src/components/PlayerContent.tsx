import { IonButton, IonCard, IonCardContent, IonRefresher, IonRefresherContent, IonItemDivider, IonRange, IonCardHeader, IonInput, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonRadioGroup, IonRadio, IonList, IonRippleEffect, IonRow, IonSlide, IonSlides, IonTextarea, IonHeader, IonListHeader, IonText } from "@ionic/react";
import React, {useRef, useState } from "react";
import { useParams } from 'react-router';

import './PlayerContent.css';
import { BeginSim, SubmitResponse, GetState } from "./../util/Backend";
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline } from 'ionicons/icons';

import FormatString from "../util/FormatString.js";

type MyProps = {
    id: string
};
type MyState = {
    radioValue: boolean,
    logged_in:boolean,
    username: string,
    password:string,
    simulation_id:string,
    response:number,
    simState: {
        user_waiting:boolean,
        turn_number:number,
        response_deadline:string,
        prompt:string,
        start_text:string,
        end_text:string,
        user_id:string,
        responses: any,
        history: [{
            resources:object,
            user_history:[{
                user:string,
                response:string,
                resources:object
            }]
        }]
    }
}

class SimulationPlayer extends React.Component<MyProps,MyState> {
    constructor(props){
        // this.props.match.params.id
        super(props);
        this.state = {
            radioValue: false,
            logged_in: false,
            response: 0,
            simState: {
                user_waiting:false,
                turn_number: 1,
                response_deadline:'',
                prompt:'',
                start_text:'',
                end_text:'',
                user_id:'',
                responses:{
                    response_type:'slider',
                    values:{
                        min_response: 0,
                        max_response: 0,
                        step_response: 1
                    }
                },
                history:[{
                    resources:{},
                    user_history:[{
                        user:'',
                        response:'',
                        resources:{}
                    }]
                }]
            },
            username:'',
            password:'',
            simulation_id: props.id
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
        BeginSim(this.getSimulationInstance(), (newState) => {
            this.setState({logged_in: true, simState: newState});
        });
    }

    setSimState() {
        GetState(this.getSimulationInstance(), (newState) => this.setState({simState : newState}));
        console.log("Updating state info ")
        console.log(this.state);
    }

    renderLogin(){
        return(
            <IonCard>
                <IonInput id="username_field" placeholder="Username" onIonChange={(t) => this.setState({username:t.detail.value!})}></IonInput>
                <IonInput id="password_field" type="password" placeholder="Password" onIonChange={(t) => this.setState({password:t.detail.value!})}></IonInput>
                {this.renderSubmitButton()}
            </IonCard>
        )
    }

    renderPlayer() {
        return (
            <IonCard>
                {this.renderPrompt()}
                {this.renderResponses()}
                {this.renderSubmitButton()}
            </IonCard>
        )
    }

    renderResponses() {
        if(this.state.simState.responses.response_type ==='radio'){
            return (
                <IonRadioGroup value={this.state.radioValue} onIonChange={(e) =>{this.setState({radioValue: e.detail.value!})}}>
                    {this.renderResponseButtons()}
                </IonRadioGroup>
            )
        } else if(this.state.simState.responses.response_type === 'slider'){
            return (
                <IonItem><IonRange pin={true} min={this.state.simState.responses.values.min_response} max={this.state.simState.responses.values.max_response} step={this.state.simState.responses.values.step_response} onIonChange={e =>this.setState({response:e.detail.value as number})}></IonRange>
                <IonLabel slot="start" color="tertiary">min: {this.state.simState.responses.values.min_response }</IonLabel>
                <IonLabel slot="end" color="tertiary">Max: {this.state.simState.responses.values.max_response}</IonLabel>
                </IonItem>
            )
        }
    }

    renderResponseButtons() {
        //TODO: USER WAITING    
        if(!this.state.simState.user_waiting) {
            let responses = this.state.simState.responses.items;
            return responses.map((response) => {
                <IonItem><IonLabel>{response}</IonLabel><IonRadio slot="start" value={response}/></IonItem>
            })
        }
    }

    renderSubmitButton() {
        if (!this.state.logged_in)
        {
            return (
                <IonButton onClick={() => this.beginSim()}>Begin</IonButton>
            )
            //TODO: USER WAITING
        } else if (!this.state.simState.user_waiting) {
            return (
                //NOT WORKING, this.submitResponse is functioning, the booleon radioValue is just not formatted.
                <IonButton onClick={() => this.submitResponse()}>Submit</IonButton>
            )
        } else {
            return (
                <IonButton onClick={() => this.setSimState()}>Refresh</IonButton>
            )
        }
    }

    renderPrompt() {
        //TODO: USER WAITING
        if (this.state.simState.user_waiting) {
            return "Waiting..."
        } else {
            return (
                <IonList lines="none">
                    <IonItem>
                        {/*globalResource is accessed at 0 statically on purpose
                        currently there is only one value accessed at that point, the method just returns an array of strings*/}
                        <IonLabel>{Object.keys(this.state.simState.history[this.state.simState.history.length-1].resources)}: { Object.values(this.state.simState.history[this.state.simState.history.length-1].resources) }</IonLabel>
                    </IonItem>

                    {this.renderCurrentUser()}

                    <IonItem>
                        <IonLabel>Simulation Prompt: {this.state.simState.prompt}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">How would you like to affect your production</IonLabel>
                        <IonLabel slot="end">Current round: {this.state.simState.turn_number}</IonLabel>
                    </IonItem>
                </IonList>
            )
            //FormatString(this.state.simState.prompt, this.state.simState)
        }
    }
    renderCurrentUser(){
        var currentSim = this.state.simState.history[this.state.simState.history.length-1];
        for(var i = 0; i < currentSim.user_history.length; i++){
            return(
                <IonItem>
                    <IonLabel>{"Player "+ (i+1)+"'s " + Object.keys(currentSim.user_history[i].resources) + ": "+ Object.values(currentSim.user_history[i].resources)}</IonLabel>
                </IonItem>

            )
        }
    }

    submitResponse() {
        SubmitResponse({user: this.getUser(), response: this.state.response, id: this.state.simulation_id}, (newState) => this.setState({simState:newState}));
    }
}

function Playerpage(props) {
    return (
        <SimulationPlayer {...props}/>
    );
}

export default Playerpage;
