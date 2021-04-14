import { IonButton, IonCard, IonCardContent, IonRefresher, IonRefresherContent, IonItemDivider, IonRange, IonCardHeader, IonInput, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonRadioGroup, IonRadio, IonList, IonRippleEffect, IonRow, IonSlide, IonSlides, IonTextarea, IonHeader, IonListHeader } from "@ionic/react";
import React, {useRef, useState } from "react";

import './PlayerContent.css';
import { BeginSim, SubmitResponse } from "./../util/Backend";
import { RefresherEventDetail } from '@ionic/core';

const PlayerContent: React.FC = () => {
    //Javascript
    const [username,setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [simulation_id, setSimulationID] = useState<string>();
    const [response, setResponse] = useState<string>();

    //Sim variables
    const [turnNumber, setTurnNumber] = useState<number>();
    const [prompt, setPrompt] = useState<string>();
    const [responses, setResponses] = useState<number[]>();


    const [userID, setUserID] = useState<string>();
    const [history, setHistory] = useState<string[]>();
    const [userHistory, setUserHistory] = useState<string[]>();
    const [userWaiting, setUserWaiting] = useState<boolean>();    
    var SimResponses = [1];

const userData = {'user':{'username':username, 'password':password}, 'id':simulation_id};
const playerSlides = useRef(document.createElement('ion-slides'));

const next = () =>{
    playerSlides.current.slideNext();
}
function previous(){
    playerSlides.current.slidePrev();
}
const verify = () =>{
    //next();
   
    StartSim();
    
    
}

function doRefresh() {
    console.log('Begin async operation');
  
    setTimeout(function(){ alert("Hello"); previous(); }, 3000);
    //previous();
  }


//Back end function specifically for join simulation
function StartSim(){
    /*input state variable with response */
    try{
        // console.log("Username is "+userData.user.username+ "\nPassword is " +userData.user.password+ "\nThis is the sim id " + userData.id);
        console.log("Environment variable "+ process.env.REACT_APP_SIMULATION_FACTORY_URL);
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
    SimResponses = response.responses.sort();

    // for(let i = 0; i < response.responses.length; i++){
    //     setResponses(responses => responses.concat(SimResponses) )
    // }
    setResponses(responses => [...responses, response.responses.sort()]);
    
    setUserID(response.user_id);
    setHistory(response.history);
    setUserWaiting(response.user_waiting);

    console.log("Testerrrr-----999s------ +"+ history);
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
                                            <IonInput value={password} placeholder="Password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
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
                                            <IonLabel>The environment resource is: {/*History resources */}</IonLabel>
                                            <IonLabel>{/*first players resource name or function call */} is at---</IonLabel><IonLabel>{/*first players resource name or function call */} is at---</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Simulation Prompt: {prompt}</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel slot="start">How would you like to affect your production</IonLabel>
                                            <IonLabel slot="end">Current round: {turnNumber}</IonLabel>
                                        </IonItem>

                                    { /* Remember this divider for the future.
                                    <IonItemDivider>Default</IonItemDivider> 
                                    */}
                                    <IonItem>
                                        <IonRange pin={true} min={-5} max={5} snaps onIonChange={e => setResponse(e.detail.value.toString())}/>
                                        <IonLabel slot="start" color="tertiary">min</IonLabel>
                                        <IonLabel slot="end" color="tertiary">Max</IonLabel>
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
