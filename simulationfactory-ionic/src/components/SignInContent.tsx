import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonInput, IonGrid, IonItem, IonToast, IonList, IonRippleEffect, IonRow } from "@ionic/react";
import React from "react";
import AccountCreation from "../simulation-schema/js/AccountCreation";
import { CreateAccount } from "../util/Backend";

import './SignInContent.css';

type MyProps = {};
type MyState = {
    logged_in:boolean,
    username: string,
    password:string,
    role: string,
    new_user_username: string,
    new_user_password: string,
    showToast: boolean
}


class SignInContent extends React.Component<MyProps,MyState> {
    constructor(props){
        super(props);
        this.state = {
            logged_in: false,
            username:'',
            password:'',
            role:'',
            new_user_username:'',
            new_user_password:'',
            showToast: false
        };
    }
    

    //Add conditional Statements to change the state of the Sign in page
    //Function that renders the main page. 
    render() {
        //if the user is not logged in load the log in page
        //otherwise load the account creation
        if(this.state.logged_in === false){    
            return this.renderSignIn();
        } else{
            return this.renderCreateAccounts();
        }

        
    }
    getAccountCreation(){
        //the proper parameter input for CreateAccount
        return {
            auth_user:{
                username: this.state.username,
                password: this.state.password
            },
            new_user: {
                username: this.state.new_user_username,
                password: this.state.new_user_password
            }
        }
    }

    //method that checks the user account
    userVerification(){
        //Implement later when CheckCredentials sends role
    }

    //Method that runs the Account creation function
    createAccount(){
        //front end method that calls the database to create a new user.
        //only if the user creating it is an admin
        CreateAccount(this.getAccountCreation(), this.callbackAccount);
        this.setState({showToast: true});
    }

    callbackAccount(){
        //empty methods
    }


    renderSignIn() {
        return (
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol className="ion-text-center">
                            <IonCard>
                                <IonCardHeader color="primary">
                                    <IonCardTitle>Admin Login</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonList lines="none">
                                        <IonItem>
                                            <IonInput className="ion-text-right" placeholder="Username" onIonChange={(t) => this.setState({username:t.detail.value!})}></IonInput>
                                        </IonItem>
        
                                        <IonItem>
                                            <IonInput className="ion-text-right" type="password" placeholder="Password" onIonChange={(t) => this.setState({password:t.detail.value!})}></IonInput>
                                        </IonItem>
        
                                    </IonList>                     
                                    <IonButton onClick={() => this.setState({logged_in: true}) }>
                                        Login
                                        <IonRippleEffect></IonRippleEffect>
                                    </IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        
                    </IonRow>
                </IonGrid>
            </IonContent>
            );
    }

    //render if the user signs in, will be the account creation page
    renderCreateAccounts(){
        return(
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol className="ion-text-center">
                            <IonCard>
                                <IonCardHeader color="primary">
                                    <IonCardTitle>Admin Create Account</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>

                                    <IonList lines="none">
                                        <IonItem>
                                            <IonInput className="ion-text-right" placeholder="Create Username" onIonChange={(t) => this.setState({new_user_username:t.detail.value!})}></IonInput>
                                        </IonItem>
        
                                        <IonItem>
                                            <IonInput className="ion-text-right" type="password" placeholder="Create Password" onIonChange={(t) => this.setState({new_user_password:t.detail.value!})}></IonInput>
                                        </IonItem>
                                    </IonList>

                                    <IonButton onClick={() => this.createAccount() }>Create Account </IonButton>


                                    <IonToast 
                                    isOpen={this.state.showToast}
                                    onDidDismiss={() => this.setState({showToast: false})}
                                    message="Created User"
                                    duration={400}
                                    ></IonToast>

                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        
                    </IonRow>
                </IonGrid>
            </IonContent>
        );

    }
    //end of SignInContent
}




function Signinpage() {
    return (
        <SignInContent/>
    );
}

export default Signinpage;


