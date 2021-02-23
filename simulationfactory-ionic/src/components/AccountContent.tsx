import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonRedirect, IonRippleEffect, IonRouterLink, IonRow } from "@ionic/react";
import React from "react";

import './AccountContent.css';

const AccountContent: React.FC = () => {
    return (
    <IonContent className="ion-padding">
        <IonGrid>
            <IonRow className="ion-justify-content-center">
                <IonCol className="ion-text-center">
                    <IonCard>
                        <IonCardHeader color="primary">
                            <IonCardTitle>Account Info</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonList lines="none">
                                <IonItem>
                                    <IonLabel className="ion-text-left">Rob Dobster</IonLabel>
                                    <IonRouterLink href="https://github.com/rdoster13" class="underline">Github</IonRouterLink>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="ion-text-left">Cayden Reynolds</IonLabel>
                                    <IonRouterLink href="https://github.com/caydenreynolds" class="underline">Github</IonRouterLink>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="ion-text-left">Austin Canzano</IonLabel>
                                    <IonRouterLink href="https://github.com/Acanzano6613" class="underline">Github</IonRouterLink> 
                                </IonItem>
                            </IonList>                     
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol className="ion-text-center">
                    <IonCard>
                        <IonCardHeader color="primary">
                            <IonCardTitle>Change Password</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                        <IonList lines="none">
                                <IonItem>
                                    <IonCol>
                                        <IonLabel className="ion-text-left">Alex Louderback</IonLabel>
                                    </IonCol>

                                    <IonCol className="ion-text-center">
                                        <IonRouterLink className="ion-text-center" href="https://www.linkedin.com/in/alex-louderback-a2a599149/">LinkedIn</IonRouterLink>
                                    </IonCol>
                                    
                                    <IonCol className="ion-text-right">
                                        <IonRouterLink href="https://github.com/alouderback" className="underline">Github</IonRouterLink>
                                    </IonCol>
                                </IonItem>
                                <IonItem>
                                    <IonCol>
                                        <IonLabel className="ion-text-left">Adrian Castro</IonLabel>
                                    </IonCol>
                
                                    <IonCol className="ion-text-right">
                                        <IonRouterLink href="https://github.com/acastro7" className="underline">Github</IonRouterLink>
                                    </IonCol>
                                </IonItem>
                            </IonList>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>

        </IonGrid>
    </IonContent>
    );
};

export default AccountContent;