import { IonButton, IonCard, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonSlide, IonSlides, IonTextarea } from "@ionic/react";
import React, { useRef, useState} from "react";


import './FactoryContent.css';

import {  trashOutline } from "ionicons/icons";
import { InitializeSimulation, ModifySimulation } from "../util/Backend.js";
import { nextTick } from "node:process";


const FactoryContent: React.FC = () => {
    const server_url = "simulation.dy2ewfz2jp1x8.amplifyapp.com/page/player";
    const [title,setTitle] = useState<string>();
    const [desc,setDesc] = useState<string>();
    const [numPlayers, setNumPlayers] = useState<number>(0);
    const [simulation_id, setSimulationId] = useState<string>("");
    const [playerResponseString, setPlayerResponseString] = useState([
        'Player 1 Response'
    ])
    const [playerTitle, setPlayerTitle] = useState<string>();
    const [resourcesState, setResourcesState] = useState([
        {
            resource: 'Resource 1',
            equation: 'NULL',
            resourceValue: 0
        }
    ]);
    const [userResourcesState, setUserResourcesState] = useState([
        {
            resource: 'User Resource 1',
            equation: 'NULL',
            resourceValue: 0
        }
    ]);
    const [equationState, setEquationState] = useState([
        {
            equation:''
        }
    ]);
    const [numRounds, setNumRounds] = useState<number>(1);
    const [question, setQuestion] = useState('')

    const [profitMultiplier, setProfitMultiplier] = useState<number>(1);
    const [decisionWeight, setDecisionWeight] = useState<number>(1);
    const [impactMultiplier, setImpactMultiplier] = useState<number>(1);
    
    const factorySlides = useRef(document.createElement('ion-slides'));

    const slideOpts = {
        slidesPerView: 1,
        initialSlide: 0
    };
    const [responseValue, setResponseValue] =useState([{'response':`Response 1`, 'responseValue':0}])

    const operators = ['+','-','*','/','=',]

    function appendResources(){
        var newResource = `Resource ${resourcesState.length + 1}`;
        var newResourceValue = 0;
        setResourcesState(prevState => (prevState.concat({resource:newResource, equation:'NULL', resourceValue:newResourceValue})));
    }
    function deleteResource(index: number){
        delete resourcesState[index];
        setResourcesState(prevState => prevState.slice(0));
    }

    function changeResourceName(index: number, newResource: string){
        resourcesState[index] = {resource:newResource, equation:'NULL',resourceValue:resourcesState[index].resourceValue}
        //Needed to refresh Chips
        setResourcesState(prevState => prevState.slice(0));
    }

    function changeResourceValue(index: number, newValue: number){
        resourcesState[index] = {resource:resourcesState[index].resource, equation:'NULL', resourceValue:newValue}
        //Needed to refresh Chips
        setResourcesState(prevState => prevState.slice(0));
    }

    function appendUserResources(){
        var newResource = `User Resource ${userResourcesState.length + 1}`;
        var newResourceValue = 0;
        setUserResourcesState(prevState => (prevState.concat({resource:newResource, equation:'NULL', resourceValue:newResourceValue})));
    }
    function deleteUserResource(index: number){
        delete userResourcesState[index];
        setUserResourcesState(prevState => prevState.slice(0));
    }

    function changeUserResourceName(index: number, newResource: string){
        userResourcesState[index] = {resource:newResource, equation:'NULL',resourceValue:userResourcesState[index].resourceValue}
        //Needed to refresh Chips
        setUserResourcesState(prevState => prevState.slice(0));
    }

    function changeUserResourceValue(index: number, newValue: number){
        userResourcesState[index] = {resource:userResourcesState[index].resource, equation:'NULL', resourceValue:newValue}
        //Needed to refresh Chips
        setUserResourcesState(prevState => prevState.slice(0));
    }

    function appendResponses(){
        var newResponse = `Response ${responseValue.length +1}`;
        var newResponseValue = 0;
        setResponseValue(prevState=>prevState.concat({response:newResponse, responseValue:newResponseValue}));
    }

    function changeResponseValue(index:number, newValue:number){
        responseValue[index].responseValue = newValue;
    }

    function deleteResponseValue(index:number){
        delete responseValue[index];
        setResponseValue(prevState => prevState.slice(0));
    }

    function changeEquationState(index:number, newValue:string){
        equationState[index] = {equation:newValue};
        setEquationState(prevState => prevState.slice(0));
    }
    function appendEquationState(newValue:string){
        setEquationState(prevState => prevState.concat({equation:newValue}));
    }

    function handlePlayerChange(newPlayerCount: number){
        setNumPlayers(newPlayerCount);
        console.log(numPlayers);
        var responseString = [`Player 1 Response`];
        for(let i = 1; i < newPlayerCount; i++){
            responseString.push(`Player ${i+1} Response`);
        }
        console.log(responseString);
        setPlayerResponseString(responseString);
        console.log(playerResponseString);
    }

    function updateValues(){
        setTitle(title);
        setDesc(desc);
        setNumPlayers(numPlayers);
        setPlayerTitle(playerTitle);
        setResourcesState(resourcesState);
        setNumRounds(numRounds);
        setQuestion(question);
        setProfitMultiplier(profitMultiplier);
        setDecisionWeight(decisionWeight);
        setImpactMultiplier(impactMultiplier);
    }

    const handleNext = () => {
        updateValues();
        factorySlides.current.slideNext();
    }

    const handlePrev = () => {
        updateValues();
        factorySlides.current.slidePrev();
    }

    function handleSubmitClick(){
        console.log("HANDLE SUBMIT CLICK");
        InitializeSimulation({"username":"foo", "password":"P00%qwert"},(response)=>afterInit(response));
        handleNext();
    }
    function afterInit(response){
        console.log("AFTER INIT");
        setSimulationId(response.id);
        var modifySimJson = {
            "user":{"username":"foo", "password":"P00%qwert"},
            "id":response.id,
            "response_timeout":-1,
            "prompt":question,
            "responses":responseValue,
            "round_count":numRounds,
            "user_count":numPlayers,
            "resources":resourcesState,
            "user_resources": userResourcesState
        };
        ModifySimulation(modifySimJson, ()=>{console.log("MODIFY SIMULATION RAN")});
    }
    
    return (
    <IonContent className="ion-padding">
        <IonSlides ref={factorySlides} pager={true} options={slideOpts} onIonSlideDidChange={()=>updateValues}>
            <IonSlide>
                <IonCard className="container">
                    <IonList>
                        <IonListHeader>
                            <IonLabel><strong>Simulation Title</strong></IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel position="floating">Simulation Title</IonLabel>
                            <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonListHeader>
                            <IonLabel><strong>Simulation Description</strong></IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel position="floating">Simulation Description</IonLabel>
                            <IonTextarea value={desc} onIonChange={e => setDesc(e.detail.value!)}></IonTextarea>
                        </IonItem>
                    </IonList>
                    <IonButton onClick={() => handleNext()}>Next Slide</IonButton>
                </IonCard>
            </IonSlide>
            <IonSlide>
                <IonCard className="container">
                    <IonList>
                        <IonListHeader>
                            <IonLabel><strong>Number of Players</strong></IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel position="floating">Number of Players</IonLabel>
                            <IonInput type="number" value={numPlayers} onIonChange={e => handlePlayerChange(parseInt(e.detail.value!, 10))}></IonInput>
                        </IonItem>
                        <IonListHeader>
                            <IonLabel><strong>Player Title</strong></IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel position="floating">Player Title</IonLabel>
                            <IonInput value={playerTitle} onIonChange={e => setPlayerTitle(e.detail.value!)}></IonInput>
                        </IonItem>
                    </IonList>
                    <IonButton onClick={() => handlePrev()}>Previous Slide</IonButton>
                    <IonButton onClick={() => handleNext()}>Next Slide</IonButton>
                </IonCard>
            </IonSlide>
            <IonSlide>
                <IonCard className="container">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel><strong>Global Resources</strong></IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonLabel position="floating">Name of Global Resource</IonLabel></IonCol>
                            <IonCol><IonLabel position="floating">Value of Global Resource</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>{resourcesState.map((resource,index) =><IonItem><IonInput value={resource.resource} onIonChange={e => changeResourceName(index, e.detail.value!)}></IonInput><IonInput type="number" onIonChange={e => changeResourceValue(index, parseInt(e.detail.value!, 10))}></IonInput><IonButton onClick={() => deleteResource(index)}><IonIcon slot="icon-only" icon={trashOutline} /></IonButton></IonItem>)}</IonCol>
                        </IonRow>    
                        <IonRow><IonButton onClick={ () => appendResources()}>Add Global Resource</IonButton></IonRow>
                        <IonRow>
                            <IonCol><IonLabel><strong>User Resources</strong></IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonLabel position="floating">Name of User Resource</IonLabel></IonCol>
                            <IonCol><IonLabel position="floating">Value of User Resource</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>{userResourcesState.map((resource, index) =><IonItem><IonInput value={resource.resource} onIonChange={e => changeUserResourceName(index, e.detail.value!)}></IonInput><IonInput type="number" onIonChange={e => changeUserResourceValue(index, parseInt(e.detail.value!, 10))}></IonInput><IonButton onClick={() => deleteUserResource(index)}><IonIcon slot="icon-only" icon={trashOutline} /></IonButton></IonItem>)}</IonCol>
                        </IonRow>    
                        <IonRow><IonButton onClick={ () => appendUserResources()}>Add User Resource</IonButton></IonRow>

                    </IonGrid>
                    <IonButton onClick={() => handlePrev()}>Previous Slide</IonButton>
                    <IonButton onClick={() => handleNext()}>Next Slide</IonButton>
                </IonCard>
            </IonSlide>
            <IonSlide>
                <IonCard className="container">
                    <IonList>
                        <IonListHeader>
                            <IonLabel><strong>Number of Rounds</strong></IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel position="floating">Number of Rounds</IonLabel>
                            <IonInput type="number" value={numRounds} onIonChange={e => setNumRounds(parseInt(e.detail.value!, 10))}></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Question to Display during Round</IonLabel>
                            <IonInput value={question} onIonChange={e => setQuestion(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Response Values</IonLabel>
                            {responseValue.map((response, index)=><IonItem><IonLabel>Response {index+1}</IonLabel><IonInput type="number" value={response.responseValue} onIonChange={e => changeResponseValue(index,parseInt(e.detail.value!, 10))}></IonInput><IonButton onClick={() => deleteResponseValue(index)}><IonIcon slot="icon-only" icon={trashOutline} /></IonButton></IonItem>)}
                        </IonItem>
                        <IonButton onClick={() => appendResponses()}>Add Response</IonButton>
                    </IonList>
                    <IonButton onClick={() => handlePrev()}>Previous Slide</IonButton>
                    <IonButton onClick={() => handleNext()}>Next Slide</IonButton>
                </IonCard>
            </IonSlide>
            <IonSlide>
                <IonCard className="container">
                    <IonList>
                        <IonListHeader>
                            <IonLabel><strong>Variables and Equations</strong></IonLabel>
                        </IonListHeader>
                        <IonInput type="number" value={profitMultiplier} onIonChange={e=> setProfitMultiplier(parseInt(e.detail.value!, 10))}>Set Profit Multiplier</IonInput>
                        <IonInput type="number" value={decisionWeight} onIonChange={e=> setDecisionWeight(parseInt(e.detail.value!, 10))}>Set Decision Weight</IonInput>
                        <IonInput type="number" value={impactMultiplier} onIonChange={e=> setImpactMultiplier(parseInt(e.detail.value!, 10))}>Set Impact of Resource Multiplier</IonInput>
                        <IonListHeader>Global Resources</IonListHeader>
                        {resourcesState.map(resource =><IonChip onClick={()=>appendEquationState(resource.resource)}><IonLabel>{resource.resource}</IonLabel></IonChip>)}
                        <IonListHeader>User Resources</IonListHeader>
                        {userResourcesState.map(resource=><IonChip onClick={()=>appendEquationState(resource.resource)}><IonLabel>{resource.resource}</IonLabel></IonChip>)}
                        <IonListHeader>Player Response</IonListHeader>
                        {playerResponseString.map(playerResponse=><IonChip onClick={()=>appendEquationState(playerResponse)}><IonLabel>{playerResponse}</IonLabel></IonChip>)}
                        <IonListHeader>Operations</IonListHeader>
                        {operators.map(operator=><IonChip onClick={()=>appendEquationState(operator)}><IonLabel>{operator}</IonLabel></IonChip>)}
                        {equationState.map((equation, index)=><IonInput value={equation.equation} onIonChange={e=> changeEquationState(index, e.detail.value!)}></IonInput>)} 
                    </IonList>
                    <IonButton onClick={() => handlePrev()}>Previous Slide</IonButton>
                    <IonButton onClick={() => handleNext()}>Next Slide</IonButton>
                </IonCard>
            </IonSlide>
            <IonSlide>
                <IonCard>
                    <IonList>
                        <IonButton onClick={handleSubmitClick}>Submit Simulation</IonButton>
                    </IonList>
                </IonCard>
            </IonSlide>

            <IonSlide>
                <IonCard>
                    <IonList lines="none">
                        <IonItem>
                            <IonLabel className="ion-text-center">Your simulation's id is {simulation_id}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="ion-text-center">
                                Invite participants to your simulation using this link: <a href={`${server_url}/${simulation_id}`}>{`${server_url}/${simulation_id}`}</a>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </IonCard>
            </IonSlide>
        </IonSlides>  
    </IonContent>
    );
};

export default FactoryContent;