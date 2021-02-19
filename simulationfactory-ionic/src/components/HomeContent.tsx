import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonRippleEffect, IonRow } from "@ionic/react";
import React from "react";

import './HomeContent.css';

const HomeContent: React.FC = () => {
    return (
    <IonContent className="ion-padding">
        <IonGrid>
            <IonRow className="ion-justify-content-center">
                <IonCol className="ion-text-center">
                    <IonCard>
                        <IonCardHeader color="primary">
                            <IonCardTitle>Simulation Factory</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonList lines="none">
                                <IonItem>
                                    <IonLabel className="ion-text-center">Create your simulation</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="ion-text-center">Run your simulation real-time or asynchronous</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="ion-text-center">Get analytics and feedback from participants</IonLabel>
                                </IonItem>
                            </IonList>                     
                            <IonButton routerLink="/page/factory" routerDirection="root">
                                Create Simulation
                                <IonRippleEffect></IonRippleEffect>
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol className="ion-text-center">
                    <IonCard>
                        <IonCardHeader color="primary">
                            <IonCardTitle>Join Simulation</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                        <IonList lines="none">
                                <IonItem>
                                    <IonLabel className="ion-text-center">Participate in Simulation</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="ion-text-center">Join with partner or play solo</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="ion-text-center">Contribute to research studies</IonLabel>
                                </IonItem>
                            </IonList>
                            <IonButton className='playerButton'>
                                Join Simulation
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

export default HomeContent;