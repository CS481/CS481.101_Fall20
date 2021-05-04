import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonRadio, IonRow, IonSelect, IonSelectOption, IonSlide, IonSlides, IonTextarea, IonToggle } from "@ionic/react";
import React, { useRef, useState} from "react";


import './FactoryContent.css';

import {  trashOutline } from "ionicons/icons";
import { InitializeSimulation, ModifySimulation } from "../util/Backend.js";


const FactoryContent: React.FC = () => {
    const [title,setTitle] = useState<string>();
    const [desc,setDesc] = useState<string>();
    const [numPlayers, setNumPlayers] = useState<number>(0);
    const [playerResponseString, setPlayerResponseString] = useState([
        'Player 1 Response'
    ])
    const [playerTitle, setPlayerTitle] = useState<string>();
    const [resourcesState, setResourcesState] = useState([
        {
            name: 'Resource 1',
            equation: 'NULL',
            starting_value: 0
        }
    ]);
    const [userResourcesState, setUserResourcesState] = useState([
        {
            name: 'User Resource 1',
            equation: 'NULL',
            starting_value: 0
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
    const [responseValue, setResponseValue] =useState(['0']);

    const operators = ['+','-','*','/','=',];

    const [responseType, setResponseType] = useState('radio');

    function appendResources(){
        var newResource = `Resource ${resourcesState.length + 1}`;
        var newResourceValue = 0;
        setResourcesState(prevState => (prevState.concat({name:newResource, equation:'NULL', starting_value:newResourceValue})));
    }
    function deleteResource(index: number){
        resourcesState.splice(index,1);
        setResourcesState(prevState => prevState.slice(0));
    }

    function changeResourceName(index: number, newResource: string){
        resourcesState[index] = {name:newResource, equation:'NULL',starting_value:resourcesState[index].starting_value}
        //Needed to refresh Chips
        setResourcesState(prevState => prevState.slice(0));
    }

    function changeResourceValue(index: number, newValue: number){
        resourcesState[index] = {name:resourcesState[index].name, equation:'NULL', starting_value:newValue}
        //Needed to refresh Chips
        setResourcesState(prevState => prevState.slice(0));
    }

    function appendUserResources(){
        var newResource = `User Resource ${userResourcesState.length + 1}`;
        var newResourceValue = 0;
        setUserResourcesState(prevState => (prevState.concat({name:newResource, equation:'NULL', starting_value:newResourceValue})));
    }
    function deleteUserResource(index: number){
        userResourcesState.splice(index,1);
        setUserResourcesState(prevState => prevState.slice(0));
    }

    function changeUserResourceName(index: number, newResource: string){
        userResourcesState[index] = {name:newResource, equation:'NULL',starting_value:userResourcesState[index].starting_value}
        //Needed to refresh Chips
        setUserResourcesState(prevState => prevState.slice(0));
    }

    function changeUserResourceValue(index: number, newValue: number){
        userResourcesState[index] = {name:userResourcesState[index].name, equation:'NULL', starting_value:newValue}
        //Needed to refresh Chips
        setUserResourcesState(prevState => prevState.slice(0));
    }

    function appendResponses(){
        setResponseValue(prevState=>prevState.concat('0'));
    }

    function changeResponseValue(index:number, newValue:string){
        responseValue[index] = newValue;
    }

    function deleteResponseValue(index:number){
        responseValue.splice(index,1);
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
        console.log("METHOD RAN");
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

    }

    function radioSliderBuild(){
        if(responseType ==='radio'){
            return(
                <IonItem>
                    <IonLabel position="floating">Response Values</IonLabel>
                    {responseValue.map((response, index)=><IonItem><IonLabel>Response {index+1}</IonLabel><IonInput type="number" value={response} onIonChange={e => changeResponseValue(index, e.detail.value!)}></IonInput><IonButton onClick={() => deleteResponseValue(index)}><IonIcon slot="icon-only" icon={trashOutline} /></IonButton></IonItem>)}
                    <IonButton onClick={() => appendResponses()}>Add Response</IonButton>
                </IonItem>
            )
        } else {
            return (
                <IonItem>
                    <IonLabel>Minimum Response: </IonLabel><IonInput></IonInput>
                    <IonLabel>Maximum Response: </IonLabel><IonInput></IonInput>
                </IonItem>

            )
        }
    }

    function afterInit(response){
        console.log("AFTER INIT");
        // var responseValueString = JSON.stringify(Object.assign({}, responseValue));
        // var responseValueJSON = JSON.parse(responseValueString);
        // var resourceStateString = JSON.stringify(Object.assign({}, resourcesState));
        // var resourceStateJSON = JSON.parse(resourceStateString);
        // var userResourceStateString = JSON.stringify(Object.assign({}, userResourcesState));
        // var userResourceStateJSON = JSON.parse(userResourceStateString);
        // console.log("RESPONSEVALUE: " + responseValueString + ", \n RESOURCESTATE: " + resourceStateString + ",\n USERRESOURCESTATE: " + userResourceStateString);

        var responseValueJSON = {};
        responseValue.forEach((response,index) => responseValueJSON["response"+index] = response);
        console.log(responseValueJSON);
        
        var resourceStateJSON = {};
        for(var i=0; i < resourcesState.length; i++){
            var resourceIndex = "Resource " + i;
            var resourceJSON = {"name":resourcesState[i].name,"equation":resourcesState[i].equation,"starting_value":resourcesState[i].starting_value};
            resourceStateJSON[resourceIndex] = resourceJSON;
        }
        console.log(resourceStateJSON);

        var userResourceStateJSON = {};
        for(var i=0; i < userResourcesState.length; i++){
            var userResourceIndex = "Resource " + i;
            var userResourceJSON = {"name":userResourcesState[i].name,"equation":userResourcesState[i].equation,"starting_value":userResourcesState[i].starting_value};
            userResourceStateJSON[userResourceIndex] = userResourceJSON;
        }
        console.log(userResourceStateJSON);

        var modifySimJson = {
            "user":{"username":"foo", "password":"P00%qwert"},
            "id":response.id,
            "name":title,
            "response_timeout":1,
            "prompt":question,
            "responses":responseValueJSON,
            "round_count":numRounds,
            "user_count":numPlayers,
            "resources":resourceStateJSON,
            "user_resources": userResourceStateJSON
        };
        console.log("SIMULATION ID:" + response.id);
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
                <IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCardHeader><IonCardTitle>Starting and Ending Text and Links</IonCardTitle></IonCardHeader>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonCardSubtitle>Starting Text or Link</IonCardSubtitle></IonCol>
                            <IonCol><IonToggle/></IonCol>
                            <IonCol><IonCardSubtitle>Ending Text or Link</IonCardSubtitle></IonCol>
                            <IonCol><IonToggle/></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonInput></IonInput>
                            </IonCol>
                            <IonCol>
                                <IonInput></IonInput>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
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
                            <IonCol>{resourcesState.map((resource,index) =><IonItem><IonInput value={resource.name} onIonChange={e => changeResourceName(index, e.detail.value!)}></IonInput><IonInput type="number" onIonChange={e => changeResourceValue(index, parseInt(e.detail.value!, 10))}></IonInput><IonButton onClick={() => deleteResource(index)}><IonIcon slot="icon-only" icon={trashOutline} /></IonButton></IonItem>)}</IonCol>
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
                            <IonCol>{userResourcesState.map((resource, index) =><IonItem><IonInput value={resource.name} onIonChange={e => changeUserResourceName(index, e.detail.value!)}></IonInput><IonInput type="number" onIonChange={e => changeUserResourceValue(index, parseInt(e.detail.value!, 10))}></IonInput><IonButton onClick={() => deleteUserResource(index)}><IonIcon slot="icon-only" icon={trashOutline} /></IonButton></IonItem>)}</IonCol>
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
                            <IonLabel>Multiple Choice or Slider</IonLabel>
                            <IonSelect value={responseType} okText="Ok" cancelText="Dismiss" onIonChange={e => setResponseType(e.detail.value!)}>
                                <IonSelectOption value="radio">Radio</IonSelectOption>
                                <IonSelectOption value="slider">Slider</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {radioSliderBuild()}
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
                        {resourcesState.map(resource =><IonChip onClick={()=>appendEquationState(resource.name)}><IonLabel>{resource.name}</IonLabel></IonChip>)}
                        <IonListHeader>User Resources</IonListHeader>
                        {userResourcesState.map(resource=><IonChip onClick={()=>appendEquationState(resource.name)}><IonLabel>{resource.name}</IonLabel></IonChip>)}
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
        </IonSlides>
    </IonContent>


    );
};

export default FactoryContent;