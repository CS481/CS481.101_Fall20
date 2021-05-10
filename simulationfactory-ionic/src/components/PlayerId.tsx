import { IonButton, IonCard, IonCardContent, IonCardHeader, IonInput, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonList, IonRippleEffect, IonRow } from "@ionic/react";
import React, { useState } from "react";

const PlayerId: React.FC = () => {
    const [simulation_id, setSimulationID] = useState<string>("");

    function validateId() {

    }

    return (
        <IonContent className="ion-padding">
            <IonGrid>   
                <IonRow className="ion-justify-content-center">
                    <IonCol className="ion-text-center">
                        <IonCard className="container">
                            <IonCardHeader color="primary">
                                <IonCardTitle>Enter the ID of the simulation you wish to join</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonList lines="none">
                                    <IonItem>
                                        <IonInput value={simulation_id} placeholder="SimulationID" onIonChange={e => setSimulationID(e.detail.value!)}></IonInput>
                                    </IonItem>
                                </IonList> 

                                <IonButton disabled={simulation_id?.length == 0} routerLink={`/page/player/${simulation_id}`} routerDirection="root">
                                    Join
                                    <IonRippleEffect></IonRippleEffect>
                                </IonButton>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
};

export default PlayerId;
