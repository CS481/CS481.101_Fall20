import { IonButton, IonCard, IonCardContent, IonRefresher, IonRefresherContent, IonItemDivider, IonRange, IonCardHeader, IonInput, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonRadioGroup, IonRadio, IonList, IonRippleEffect, IonRow, IonSlide, IonSlides, IonTextarea, IonHeader, IonListHeader, IonText } from "@ionic/react";
import React, {useRef, useState } from "react";

import './PlayerContent.css';
import { BeginSim, SubmitResponse, GetState } from "./../util/Backend";
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline } from 'ionicons/icons';

import FormatString from "../util/FormatString.js";

type MyProps = {};
type MyState = {
    radioValue: boolean,
    logged_in:boolean,
    username: string,
    password:string,
    simulation_id:string
    simState: {
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
var responseValue = '0';
//variable to determine if the current user needs to wait
//true means the user needs to wait
//false means the user does not need to wait
var user_waiting = false;
var bistory;

class SimulationPlayer extends React.Component<MyProps,MyState> {
    constructor(props){
        super(props);
        this.state = {
            radioValue: false,
            logged_in: false,
            simState: {
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
            simulation_id:''
        };
    }

    render() {
        if (this.state.logged_in) {
            return this.renderPlayer();
        } else {
            return this.renderLogin();
        }
    }

    isUserWaiting(){
        var currentRound = this.state.simState.history[0].user_history;
        //console.log(JSON.stringify(this.state.simState.history[0].user_history));
        //old test variable
        //console.log("REad me meooooo "+JSON.stringify(bistory))
        var countEmptyResponse = 0;
        var userCount = currentRound.length;

        for(let i = 0; i < userCount; i++){
            //console.log("Here is the stuff " + i + "here is empty " + countEmptyResponse)
            if(currentRound[i].response === ""){
                countEmptyResponse++;
            }
        }
        if (countEmptyResponse == 2){
            user_waiting = false;
            countEmptyResponse = 0;
        }
        else{
            user_waiting = true;
            countEmptyResponse = 0;
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
        this.isUserWaiting();
    }

    setSimState() {
        GetState(this.getSimulationInstance(), (newState) => this.setState({simState : newState}));
        console.log("Updating state info ")
        console.log(this.state);
        this.isUserWaiting();
    }

    renderLogin(){
        return(
            <IonCard>
                <IonInput id="username_field" placeholder="Username" onIonChange={(t) => this.setState({username:t.detail.value!})}></IonInput>
                <IonInput id="password_field" type="password" placeholder="Password" onIonChange={(t) => this.setState({password:t.detail.value!})}></IonInput>
                <IonInput id="simulation_id_field" placeholder="Simulation ID" onIonChange={(t) => this.setState({simulation_id: t.detail.value!})}/>
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
        if(!user_waiting){    
            if(this.state.simState.responses.response_type ==='radio'){
                return (
                    <IonRadioGroup value={this.state.radioValue} onIonChange={(e) =>{this.setState({radioValue: e.detail.value!})}}>
                        {this.renderResponseButtons()}
                    </IonRadioGroup>
                )
            } else if(this.state.simState.responses.response_type === 'slider'){
                return (
                    <IonItem><IonRange pin={true} min={this.state.simState.responses.values.min_response} max={this.state.simState.responses.values.max_response} step={this.state.simState.responses.values.step_response} onIonChange={e =>{responseValue = e.detail.value.toString()}}></IonRange>
                    <IonLabel slot="start" color="tertiary">min: {this.state.simState.responses.values.min_response }</IonLabel>
                    <IonLabel slot="end" color="tertiary">Max: {this.state.simState.responses.values.max_response}</IonLabel>
                    </IonItem>
                )
            }
        }
    }

    renderResponseButtons() {
        //TODO: USER WAITING    
        if(!user_waiting) {
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
        } else if (!user_waiting) {
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
        if (user_waiting) {
            return "Waiting..."
        } else {
            return (
                <IonList lines="none">
                    <IonItem>
                        {/*globalResource is accessed at 0 statically on purpose
                        currently there is only one value accessed at that point, the method just returns an array of strings*/}
                        <IonLabel>{Object.keys(this.state.simState.history[0].resources)}: { Object.values(this.state.simState.history[0].resources) }</IonLabel>
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
        var currentSim = this.state.simState.history[0];
        for(var i = 0; i < currentSim.user_history.length; i++){
            return(
                <IonItem>
                    <IonLabel>{"Player "+ (i+1)+"'s " + Object.keys(currentSim.user_history[i].resources) + ": "+ Object.values(currentSim.user_history[i].resources)}</IonLabel>
                </IonItem>

            )
        }
    }

    submitResponse() {
        // Do nothing if the user has not chosen a response
        //TODO: RADIO VALUE?
        // if (!this.state.radioValue) {
        //     return
        // }
        SubmitResponse({user: this.getUser(), response: responseValue, id: this.state.simulation_id}, () => this.setState({radioValue: false, simState: {
            turn_number:this.state.simState.turn_number,
            response_deadline:this.state.simState.response_deadline,
            prompt:this.state.simState.prompt,
            start_text:this.state.simState.start_text,
            end_text:this.state.simState.end_text,
            user_id:this.state.simState.user_id,
            responses:this.state.simState.responses,
            history:this.state.simState.history
        }}));
        user_waiting = true;
    }
}

function Playerpage() {
    return (
        <SimulationPlayer/>
    );
}

export default Playerpage;
