import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonInput, IonGrid, IonItem, IonLabel, IonList, IonRippleEffect, IonRow } from "@ionic/react";
import React from "react";

import './SignInContent.css';

const SignInContent: React.FC = () => {
    return (
    <IonContent className="ion-padding">
        <IonGrid>
            <IonRow className="ion-justify-content-center">
                <IonCol className="ion-text-center">
                    <IonCard>
                        <IonCardHeader color="primary">
                            <IonCardTitle>Login/SignUp</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonList lines="none">
                                <IonItem>
                                    <IonInput className="ion-text-right" placeholder="UserID"></IonInput>
                                </IonItem>

                                <IonItem>
                                    <IonInput className="ion-text-right" placeholder="Password"></IonInput>
                                </IonItem>

                            </IonList>                     
                            <IonButton routerLink="/page/SignIn" routerDirection="root">
                                Login
                                <IonRippleEffect></IonRippleEffect>
                            </IonButton>
                            <IonButton routerLink="/page/SignIn" routerDirection="root">
                                SignUp
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

export default SignInContent;