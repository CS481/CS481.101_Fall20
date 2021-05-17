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
    showRoundSummary:boolean,
    viewedStartText:boolean,
    showEndText:boolean,
    globalResources:string[],
    userResources:string[],
    numPlayers: number,
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
            showRoundSummary: false,
            viewedStartText: false,
            showEndText:false,
            globalResources: [],
            userResources: [],
            numPlayers: 2,
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
            var resourceArray = Object.keys(this.state.simState.history[0].resources);
            var userResourceArray = Object.keys(this.state.simState.history[0].user_history[0].resources);
            console.log(resourceArray.toString());
            for(var i = 0; i < resourceArray.length; i++){
                if(resourceArray[i] === 'Profit Multiplier' || resourceArray[i] === 'Decision Weight' || resourceArray[i] === 'Impact Multiplier'){
                    resourceArray.splice(i);
                }
            }
            console.log(resourceArray.toString());
            console.log(userResourceArray.toString());
            this.setState({globalResources:resourceArray});
            this.setState({userResources: userResourceArray});
        });
        
    }

    renderStartText() {
        return (
            <IonItem>
                <IonLabel>{this.state.simState.start_text}</IonLabel>
                <IonButton onClick={()=>this.setState({viewedStartText:true})}>Continue</IonButton>
            </IonItem>
        )
    }

    async setSimState() {
        try{
            var userWaitingBegin = this.state.simState.user_waiting;
            var userWaitingNewState = false;
            console.log(userWaitingBegin);
            await GetState(this.getSimulationInstance(), (newState) => {
                this.setState({simState : newState}); 
                userWaitingNewState = this.state.simState.user_waiting;
                if((userWaitingBegin === true && userWaitingNewState === false) && this.state.simState.turn_number !== 0){
                    this.setState({showRoundSummary:true});
                    this.setState({numPlayers: Object.keys(this.state.simState.history[0].user_history).length});
                }
            });
            console.log("Updating state info ");
            console.log(userWaitingNewState);
        } catch (e){
            console.log("CAUGHT EXCEPTION");
            this.setState({showEndText:true});
            this.renderPlayer();
            return null;
        }
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
        if(this.state.simState.start_text !== '' && this.state.viewedStartText === false){
            return (
                <IonCard>
                    {this.renderStartText()}
                </IonCard>
            )
        }
        else if(this.state.showEndText === true){
            return (
                <IonCard>
                    <IonItem><IonLabel>{this.state.simState.end_text}</IonLabel></IonItem>
                </IonCard>
            );
        }
        else if(this.state.showRoundSummary === true){
            return (
                <IonCard>
                    {this.renderSummary()}
                    <IonButton onClick={()=>this.setState({showRoundSummary:false})}>Continue</IonButton>
                </IonCard>
            )
        }
        
        else {
            return (
                <IonCard>
                    {this.renderPrompt()}
                    {this.renderResponses()}
                    {this.renderSubmitButton()}
                </IonCard>
            )

        }
    }

    renderResponses() {
        if(!this.state.simState.user_waiting){
            if(this.state.simState.responses.response_type ==='radio'){
                return (
                    <IonRadioGroup value={this.state.radioValue} onIonChange={(e) =>{this.setState({radioValue: e.detail.value!})}}>
                        {this.renderResponseButtons()}
                    </IonRadioGroup>
                )
            } else if(this.state.simState.responses.response_type === 'slider'){
                return (
                    <IonItem>
                        <IonRange pin={true} min={this.state.simState.responses.values.min_response} max={this.state.simState.responses.values.max_response} step={this.state.simState.responses.values.step_response} onIonChange={e =>this.setState({response:e.detail.value as number})}>
                            <IonLabel slot="start" color="tertiary">{this.state.simState.responses.values.min_response }</IonLabel>
                            <IonLabel slot="end" color="tertiary">{this.state.simState.responses.values.max_response}</IonLabel>
                        </IonRange>
                    </IonItem>
                )
            }
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
        
        if (this.state.simState.user_waiting) {
            return (
                <IonItem>
                    <IonList>
                        <IonListHeader>Waiting...</IonListHeader>
                        <IonLabel>Please wait for other user(s) to respond to this round.</IonLabel>
                    </IonList>
                </IonItem>
                );
        } else {
            return (
                <IonList lines="none">
                    <IonListHeader>Current round: {this.state.simState.turn_number}</IonListHeader>
                    <IonItem>

                        <IonLabel>{this.state.simState.prompt}</IonLabel>
                    </IonItem>
                </IonList>
            )
            //FormatString(this.state.simState.prompt, this.state.simState)
        }
    }
    
    renderSummary() {
        var responseArray:string[] = [];
        for(var j = 0; j <= this.state.simState.turn_number; j++){
            for(var i = 0; i < this.state.numPlayers; i++){
                responseArray.push(this.state.simState.history[j].user_history[i].response)
            }
        }
        //responseArray.splice(0);
        var playerArray:string[] = [];
        for(var k = 0; k<this.state.numPlayers; k++){
            playerArray.push("Player " + (k+1).toString() + "'s ");

        }
        console.log(playerArray);
        console.log(responseArray);
        return (
            <IonList>
                <IonListHeader>This Round's Choices:</IonListHeader>
                {playerArray.map((player, index)=><IonItem><IonLabel>{player}Response: {responseArray[index+this.state.numPlayers]}</IonLabel></IonItem>)}
                
                <IonListHeader>Global Resources:</IonListHeader>
                {this.state.globalResources.map(resource=><IonItem><IonLabel>Current {resource} Value: {this.state.simState.history[0].resources[resource]}</IonLabel></IonItem>)}
                <IonListHeader>User Resources</IonListHeader>
                {playerArray.map((player,playerIndex)=>{console.log(this.state.simState.history[0].user_history); return this.state.userResources.map((resource)=><IonItem><IonLabel>{player + resource}: {this.state.simState.history[0].user_history[playerIndex].resources[resource]}</IonLabel></IonItem>)})}
            </IonList>
        );
    }

    async submitResponse() {
        try {
            var userWaitingNewState;
            await SubmitResponse({user: this.getUser(), response: this.state.response, id: this.state.simulation_id}, (newState) => {
                this.setState({simState : newState}); 
                userWaitingNewState = this.state.simState.user_waiting;
                if(userWaitingNewState === false){
                    this.setState({showRoundSummary:true});
                }
            });
        }
        catch (e){
            console.log("CAUGHT EXCEPTION");
            this.setState({showEndText:true});
            this.renderPlayer();
            return null;
        }

    }
}

function Playerpage(props) {
    return (
        <SimulationPlayer {...props}/>
    );
}

export default Playerpage;
