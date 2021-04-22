import { IonButton, IonCard, IonCardContent, IonRefresher, IonRefresherContent, IonCardHeader, IonInput, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonRadioGroup, IonRadio, IonList, IonRippleEffect, IonRow, IonSlide, IonSlides, IonTextarea, IonHeader, IonListHeader } from "@ionic/react";
import React, {useRef, useState } from "react";
import { useParams } from 'react-router';

import './PlayerContent.css';
//import {prompt, user_count, round_count,resources, _id} from './Info.json';
import { BeginSim, SubmitResponse } from "./../util/Backend";
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline } from 'ionicons/icons';

const PlayerContent: React.FC = () => {
    //Javascript
    const [username,setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [responses, setResponses] = useState<string>();
    var currentRounds = 2;
    var pastUsers = 2;
    var SimJson = {
        "turn_number": 0,
        "prompt": "prompty mcpromptface",
        "user_id": "602d7d0fac624e1924781010",
        "history": "",
        "user_history": "",
        "user_waiting": false
    };

    const simulation_id = useParams<{ id: string; }>().id;
    

const userData = {'user':{'username':username, 'password':password}, 'id':simulation_id};
const playerSlides = useRef(document.createElement('ion-slides'));

const next = () =>{
    playerSlides.current.slideNext();
}
function previous(){
    playerSlides.current.slidePrev();
}
const verify = () =>{
    if ( password === "Ad3$5asdf" && username === "me"  ) {
        (simulation_id ==="a") ? next() : console.log("Error incorrect simulation Id");
    }
    
    else{
        console.log("Error incorrect simulation Id");
    }
    // StartSim();
    next();
    
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
        console.log("Username is "+userData.user.username+ "\nPassword is " +userData.user.password+ "\nThis is the sim id " + userData.id);
        console.log("Environment variable "+ process.env.REACT_APP_SIMULATION_FACTORY_URL);
        BeginSim( userData, (response) => InitSim(response));
        //this sends the user data to the database and returns with response
        //response is an any type variable
    }
    catch(error){
        console.log("Invalid User credentials");
    }
}
function InitSim (response){
    console.log("Initilizing Simulation Variables");
    SimJson = {
        "turn_number": response.turn_number,
        "prompt": response.prompt,
        "user_id": response.user_id,
        "history": response.history,
        "user_history": response.user_history,
        "user_waiting": response.user_waiting
    };
}

//will be used once I get beginSim to work
function SubmitRes (){
    //empty method
    var UserResponse = {
        'user':{'username':username, 'password':password},
        'simulation_id': SimJson.user_id,
        'response': responses
    };
    try{
        //SubmitResponse(UserResponse, ()=>{});
        currentRounds++;
        pastUsers = 3;
    }
    catch(error){
        console.log("Error: Could not submit Response")
    }

    //end the method by sending the user to next slide
    next();
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
                                    </IonList> 

                                    <IonButton onClick={() => verify()}>Begin</IonButton>

                                </IonCardContent>
                            </IonCard>
                        </IonSlide>

                        <IonSlide class="swiper-no-swiping">
                            <IonCard className="container">
                                <IonCardHeader color="primary">
                                    <IonCardTitle>Simulation {simulation_id} Player</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonList lines="none">
                                        <IonItem>
                                            <IonLabel>Simulation Prompt: {SimJson.prompt}</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Current rounds: {currentRounds}</IonLabel>
                                            <IonLabel>Number of past users: {pastUsers}</IonLabel>
                                        </IonItem>
                                            <IonRadioGroup value={responses} onIonChange={e => setResponses(e.detail.value)}>
                                            <IonListHeader>
                                                <IonHeader>Please enter response</IonHeader>
                                            </IonListHeader>
                                            {createOptions()}

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
