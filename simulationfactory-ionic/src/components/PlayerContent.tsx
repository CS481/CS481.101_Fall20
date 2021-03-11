import { IonButton, IonCard, IonCardContent, IonCardHeader, IonInput, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonRippleEffect, IonRow } from "@ionic/react";
import React, {useState } from "react";
import { File } from '@ionic-native/file';
import * as data from './test.json';

import './PlayerContent.css';
import { writeFile } from "node:fs";



const PlayerContent: React.FC = () => {
    //Javascript
    const [username,setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [simulation_id, setSimulationID] = useState<number>();

const jsonData = '{"simulation_id":'+username +', "password":'+password+', "username":'+username;
function writeJSON(){
    
    console.log("This is a message\n");
}

    return (
    <IonContent className="ion-padding">
        <IonGrid>
            <IonRow className="ion-justify-content-center">
                <IonCol className="ion-text-center">
                    <IonCard>
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
                            <IonButton onClick={ () => writeJSON}>Add Resource</IonButton>

                        </IonCardContent>
                    </IonCard>
                </IonCol>

            </IonRow>
        </IonGrid>
    </IonContent>
    );
};

export default PlayerContent;
