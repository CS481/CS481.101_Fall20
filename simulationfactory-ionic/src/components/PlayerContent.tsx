import { IonButton, IonCard, IonCardContent, IonRefresher, IonRefresherContent, IonItemDivider, IonRange, IonCardHeader, IonInput, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonRadioGroup, IonRadio, IonList, IonRippleEffect, IonRow, IonSlide, IonSlides, IonTextarea, IonHeader, IonListHeader } from "@ionic/react";
import React, {useRef, useState } from "react";

import './PlayerContent.css';
//import {prompt, user_count, round_count,resources, _id} from './Info.json';
import { BeginSim, SubmitResponse } from "./../util/Backend";
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline } from 'ionicons/icons';

const PlayerContent: React.FC = () => {
    //Javascript
    const [username,setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [simulation_id, setSimulationID] = useState<string>();
    const [response, setResponse] = useState<string>();

    //Sim variables
    const [turnNumber, setTurnNumber] = useState<number>();
    const [prompt, setPrompt] = useState<string>();
    const [responses, setResponses] = useState([]);


    const [userID, setUserID] = useState<string>();
    const [history, setHistory] = useState<string[]>();
    const [userHistory, setUserHistory] = useState<string[]>();
    const [userWaiting, setUserWaiting] = useState<boolean>();    
    var SimResponses = [""];

const userData = {'user':{'username':username, 'password':password}, 'id':simulation_id};
const playerSlides = useRef(document.createElement('ion-slides'));

const next = () =>{
    playerSlides.current.slideNext();
}
function previous(){
    playerSlides.current.slidePrev();
}
const verify = () =>{
   
    StartSim();
    
    
}

//method that dynamically writes all the radio buttons
function createOptions() {
    var maxRadioButtons = 7;
    for(var i = 0; i < maxRadioButtons; i++){
        //loop that writes ion http
        //close but this completely overwrites the page
        // document.write("Hello world");
        // document.write("<IonLabel className='ion-text-center'>Enter Your Player credentials</IonLabel>") 
    }
}

function doRefresh() {
    console.log('Begin async operation');
  
    setTimeout(function(){ alert("Hello"); previous(); }, 3000);
    //previous();
  }


//'this' doesn't work in ionic .tsx need to find a replacement
//pass in the in memory version of a json for this, should just be one object
function StartSim(){
    /*input state variable with response */
    try{
        // console.log("Username is "+userData.user.username+ "\nPassword is " +userData.user.password+ "\nThis is the sim id " + userData.id);
        console.log("Environment variable "+ process.env.REACT_APP_SIMULATION_FACTORY_URL);
        console.log(userData);
        BeginSim( userData, InitSim);
        console.log("Begin sim has finished running ");
        //this sends the user data to the database and returns with response
        //response is an any type variable
    }
    catch(error){
        console.log("Invalid User credentials");
    }
}
function InitSim (response){
    console.log("Initilizing Simulation Variables");
    console.log("This is the response ---- "+response.responses);
    
    setTurnNumber(response.turn_number);
    setPrompt(response.prompt);

    for(let i = 0; i < response.responses.length; i++){
        //setResponses(responses => [...responses, response.responses[i]]);
    }
    SimResponses = response.responses.sort();
    setResponses(responses => responses.concat(response));
    
    setUserID(response.user_id);
    setHistory(response.history);
    setUserWaiting(response.user_waiting);

    console.log("Testerrrr----------- +"+ userWaiting);
    console.log("tesssssss "+ SimResponses);
    console.log("Mooooooo ----- " + responses)
    
    
    next();
}

//will be used once I get beginSim to work
function SubmitRes (){
    //id is simulation id
    var UserResponse = {
        'user':{'username':username, 'password':password},
        'id': simulation_id,
        'response': response   
    };
    try{
        SubmitResponse(UserResponse, SubmitCallBack);
    }
    catch(error){
        console.log("Error: Could not submit Response")
    }

    //end the method by sending the user to next slide
    next();
}
function SubmitCallBack(){
    /*
    Empty method
        In case there is a need for a callback of SubmitResponse
        An example is: if you wanted to do something but only if the backend succeeded such as backend credentials
    */
}
    return (
    <IonContent className="ion-padding">
        <IonGrid>   
            <IonRow className="ion-justify-content-center">
                <IonCol className="ion-text-center">
                    <IonSlides ref={playerSlides} onEnded={() => doRefresh()}>
                        <IonSlide class="swiper-no-swiping">

                            <IonCard className="container">
                                <IonCardHeader color="primary">
                                    <IonCardTitle>Simulation Player</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonList lines="none">
                                        <IonItem>
                                            <IonLabel className="ion-text-center">Enter Your Player credentials</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonInput value={username} placeholder="Username"onIonChange={e => setUsername(e.detail.value!)}></IonInput>                                    
                                        </IonItem>

                                        <IonItem>
                                            <IonInput value={password} type="password" placeholder="Password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                                        </IonItem>

                                        <IonItem>
                                            <IonInput value={simulation_id} placeholder="SimulationID" onIonChange={e => setSimulationID(e.detail.value!)}></IonInput>
                                        </IonItem>
                                        
                                    </IonList> 

                                    <IonButton routerLink="/page/player" routerDirection="root">
                                        Begin
                                        <IonRippleEffect></IonRippleEffect>
                                    </IonButton>
                                    <IonButton onClick={() => verify()}>Add Resource</IonButton>

                                </IonCardContent>
                            </IonCard>
                        </IonSlide>

                        <IonSlide class="swiper-no-swiping">
                            <IonCard className="container">
                                <IonCardHeader color="primary">
                                    <IonCardTitle>Simulation {username} Player</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonList lines="none">
                                        <IonItem>
                                            <IonLabel>Simulation Prompt: {prompt}</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Current round: {turnNumber}</IonLabel>
                                        </IonItem>
                                        {
                                                                               
                                            <IonRadioGroup value={response} onIonChange={e => setResponse(e.detail.value)}>
                                            <IonListHeader>
                                                <IonHeader>Please enter response</IonHeader>
                                            </IonListHeader>
                                            
                                            <IonItem>
                                                <IonLabel>15</IonLabel>
                                                <IonRadio slot="start" color="tertiary" value="15"></IonRadio>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>10</IonLabel>
                                                <IonRadio slot="start" color="tertiary" value="10"></IonRadio>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>5</IonLabel>
                                                <IonRadio slot="start" color="tertiary" value="5"></IonRadio>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>0</IonLabel>
                                                <IonRadio slot="start" color="tertiary" value="0"></IonRadio>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>-5</IonLabel>
                                                <IonRadio slot="start" color="tertiary" value="-5"></IonRadio>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>-10</IonLabel>
                                                <IonRadio slot="start" color="tertiary" value="-10"></IonRadio>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>-15</IonLabel>
                                                <IonRadio slot="start" color="tertiary" value="-15"></IonRadio>
                                            </IonItem>
                                                
                                            </IonRadioGroup>        
                                        }

<IonItemDivider>Default</IonItemDivider>
          <IonItem>
            <IonRange pin={true} min={-5} max={5} snaps onIonChange={e => setResponse(e.detail.value.toString())}/>
            <IonLabel slot="start" color="tertiary">{SimResponses[0]}</IonLabel>
            <IonLabel slot="end" color="tertiary">{/*responses[responses.length-1]*/}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Value: {response}</IonLabel>
          </IonItem>

                                    </IonList>
                                    <IonButton onClick={() => SubmitRes()}>Submit</IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonSlide>

                        <IonSlide class="swiper-no-swiping" > 
                            <IonCard className="container">
                                <IonCardHeader color="primary">
                                    <IonCardTitle>Please wait on other participating users</IonCardTitle>
                                     {/*-- Custom Refresher Content --*/}
                                    <IonContent>
                                        <IonLabel>{() =>doRefresh()}</IonLabel>
                                    </IonContent>
                                </IonCardHeader>

                                
                            </IonCard>
                        </IonSlide>

                    </IonSlides>

                </IonCol>
            </IonRow>
        </IonGrid>
    </IonContent>
    );
};

export default PlayerContent;
