import { IonButton, IonCard, IonCardContent, IonRefresher, IonRefresherContent, IonItemDivider, IonRange, IonCardHeader, IonInput, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonRadioGroup, IonRadio, IonList, IonRippleEffect, IonRow, IonSlide, IonSlides, IonTextarea, IonHeader, IonListHeader, IonText } from "@ionic/react";
import React, {useRef, useState } from "react";

import './PlayerContent.css';
//import {prompt, user_count, round_count,resources, _id} from './Info.json';
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
        user_waiting:boolean
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
                user_waiting:false,
                responses:{
                    response_type:'radio',
                    items:[]
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
        console.log(this.state);
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
        if(this.state.simState.responses.response_type ==='radio'){
            return (
                <IonRadioGroup value={this.state.radioValue} onIonChange={(e) =>{this.setState({radioValue: e.detail.value!})}}>
                    {this.renderResponseButtons()}
                </IonRadioGroup>
            )
        } else if(this.state.simState.responses.response_type === 'slider'){
            return (
                <IonItem><IonRange min={this.state.simState.responses.min_response} max={this.state.simState.responses.max_response} step={this.state.simState.responses.step_response}></IonRange></IonItem>
            )
        }
    }

    renderResponseButtons() {
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
        } else if (!this.state.simState.user_waiting) {
            return (
                //NOT WORKING, this.submitResponse is not functioning.
                <IonButton onClick={() => this.submitResponse()}>Submit</IonButton>
            )
        } else {
            return (
                <IonButton onClick={() => this.setSimState()}>Refresh</IonButton>
            )
        }
    }

    renderPrompt() {
        if (this.state.simState.user_waiting) {
            return "Waiting..."
        } else {
            return FormatString(this.state.simState.prompt, this.state.simState)
        }
    }

    submitResponse() {
        // Do nothing if the user has not chosen a response
        if (!this.state.radioValue) {
            return
        }
        SubmitResponse({user: this.getUser(), response: this.state.radioValue, simulation_id: this.state.simulation_id}, () => this.setState({radioValue: false, simState: {
            turn_number:this.state.simState.turn_number,
            response_deadline:this.state.simState.response_deadline,
            prompt:this.state.simState.prompt,
            start_text:this.state.simState.start_text,
            end_text:this.state.simState.end_text,
            user_id:this.state.simState.user_id,
            user_waiting:true,
            responses:this.state.simState.responses,
            history:this.state.simState.history
        }}));
    }
}

function Playerpage() {
    return (
        <SimulationPlayer/>
    );
}

export default Playerpage;
