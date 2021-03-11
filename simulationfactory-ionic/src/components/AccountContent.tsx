import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonList, IonRedirect, IonRippleEffect, IonRouterLink, IonRow } from "@ionic/react";
import React from "react";
import { useParams } from 'react-router';
import * as data from './test.json';
import './AccountContent.css';

const AccountContent: React.FC = () => {
    //javascript to obtain user's information if they have entered it
    const email = "generic@email.com";
    const UserID = data.username;


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
                                    <IonLabel className="ion-text-left">User ID:</IonLabel>
                                    <IonLabel className="ion-text-right">{UserID}</IonLabel>
                                </IonItem>

                                <IonItem>
                                    <IonLabel className="ion-text-left">Email:</IonLabel>
                                    <IonLabel className="ion-text-right">{email}</IonLabel>
                                </IonItem>


                                <IonItem>
                                    <IonLabel className="ion-text-left">Change Email:</IonLabel>
                                    <IonInput className="ion-text-right" placeholder="New Email"></IonInput>
                                </IonItem>

                                <IonItem>
                                    <IonLabel className="ion-text-left">Password:</IonLabel>
                                    <IonInput className="ion-text-right" placeholder="Password"></IonInput>
                                </IonItem>

                            </IonList>

                            <div className="ion-text-left">
                                <IonButton type="submit" class="ion-no-margin">Submit</IonButton>
                            </div>                     
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
                                    <IonLabel className="ion-text-center">To change the password you must type in the original password.</IonLabel>
                                </IonItem>

                                <IonItem>
                                    <IonCol>
                                        <IonLabel className="ion-text-left">Original:</IonLabel>
                                    </IonCol>
                                    
                                    <IonCol className="ion-text-right">
                                        <IonInput placeholder="Old Password"></IonInput>
                                    </IonCol>
                                </IonItem>

                                <IonItem>
                                    <IonCol>
                                        <IonLabel className="ion-text-left">New Password:</IonLabel>
                                    </IonCol>
                
                                    <IonCol className="ion-text-right">
                                        <IonInput placeholder="New Password"></IonInput>
                                    </IonCol>
                                </IonItem>

                            </IonList>
                            <div className="ion-text-left">
                                <IonButton type="submit" class="ion-no-margin">Submit</IonButton>
                            </div>

                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
    </IonContent>
    );
};

export default AccountContent;