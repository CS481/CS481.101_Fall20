import { IonButton, IonCard, IonCardContent, IonCardHeader, IonInput, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonRippleEffect, IonRow, IonSlide, IonSlides, IonTextarea } from "@ionic/react";
import React, {useRef, useState } from "react";

import './PlayerContent.css';
import {prompt, user_count, round_count,resources} from './Info.json';
//import { BeginSim } from "./../util/Backend";



const PlayerContent: React.FC = () => {
    //Javascript
    const [username,setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [simulation_id, setSimulationID] = useState<number>();
    const [userResponse, setUserResponse] = useState<string>();

const jsonData = '{"simulation_id":'+username +', "password":'+password+', "username":'+username;
const playerSlides = useRef(document.createElement('ion-slides'));

const next = () =>{
    playerSlides.current.slideNext();
    
}

//'this' doesn't work in ionic .tsx need to find a replacement
// const beginSim= () =>{
//     BeginSim(this.getSimulationInstance(), () => {
//         this.setState({logged_in: true});
//         this.setSimState();
//     });
// }

//will be used once I get beginSim to work
const submitResponse = () =>{
    //empty method

    //end the method by sending the user to next slide
    next();
}

    return (
    <IonContent className="ion-padding">
        <IonGrid>   
            <IonRow className="ion-justify-content-center">
                <IonCol className="ion-text-center">
                    <IonSlides ref={playerSlides}>
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
                                            <IonLabel>{username}</IonLabel>                                    
                                        </IonItem>

                                        <IonItem>
                                            <IonInput value={password} placeholder="Password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                                        </IonItem>

                                        <IonItem>
                                            <IonInput value={simulation_id} placeholder="SimulationID" onIonChange={e => setSimulationID(parseInt(e.detail.value!, 10))}></IonInput>
                                        </IonItem>
                                        
                                    </IonList> 

                                    <IonButton routerLink="/page/player" routerDirection="root">
                                        Begin
                                        <IonRippleEffect></IonRippleEffect>
                                    </IonButton>
                                    <IonButton onClick={() => next()}>Add Resource</IonButton>

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
                                            <IonLabel>Simulation Question: {prompt}</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Number of rounds: {round_count}</IonLabel>
                                            <IonLabel>Number of past users: {user_count}</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Please enter response:</IonLabel>
                                        </IonItem>

                                        <IonItem>
                                        <IonTextarea value={userResponse} placeholder="Response" onIonChange={e => setUserResponse(e.detail.value!)}></IonTextarea>
                                        </IonItem>
                                    </IonList>
                                    <IonButton onClick={() => submitResponse()}>Submit</IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonSlide>

                        <IonSlide class="swiper-no-swiping"> 
                            <IonCard className="container">
                                <IonCardHeader color="primary">
                                    <IonCardTitle>Thank you for participating</IonCardTitle>
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
