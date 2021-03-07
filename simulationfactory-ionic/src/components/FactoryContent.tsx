import { IonButton, IonCard, IonChip, IonContent, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonSlide, IonSlides, IonTextarea } from "@ionic/react";
import React, { useState} from "react";

import './FactoryContent.css';


const FactoryContent: React.FC = () => {
    const [title,setTitle] = useState<string>();
    const [desc,setDesc] = useState<string>();
    const [numPlayers, setNumPlayers] = useState<number>(0);
    const [playerTitle, setPlayerTitle] = useState<string>();
    const [resourcesState, setResourcesState] = useState({
        resources: ['Resource 1'],
        resourceValue: [0]
    });
    const [numRounds, setNumRounds] = useState<number>(1);
    const [questionState, setQuestionState] = useState({
        questions: ['Question to Ask'],
    });

    const [profitMultiplier, setProfitMultiplier] = useState<number>(1);
    const [decisionWeight, setDecisionWeight] = useState<number>(1);
    const [impactMultiplier, setImpactMultiplier] = useState<number>(1);


    const slideOpts = {
        slidesPerView: 1,
        initialSlide: 0
    };

    function appendResources(){
        var newResource = `Resource ${resourcesState.resources.length}`;
        var newResourceValue = 0;
        setResourcesState(prevState => ({resources: prevState.resources.concat([newResource]), resourceValue: prevState.resourceValue.concat([newResourceValue])}));
    }
    function appendQuestions(){
        var newQuestion = `Question ${questionState.questions.length +1}`;
        setQuestionState(prevState => ({questions: prevState.questions.concat([newQuestion])}));
    }

    
    return (
    <IonContent className="ion-padding">
        <IonSlides pager={true} options={slideOpts}>
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
                            <IonInput type="number" value={numPlayers} onIonChange={e => setNumPlayers(parseInt(e.detail.value!, 10))}></IonInput>
                        </IonItem>
                        <IonListHeader>
                            <IonLabel><strong>Player Title</strong></IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel position="floating">Player Title</IonLabel>
                            <IonInput value={playerTitle} onIonChange={e => setPlayerTitle(e.detail.value!)}></IonInput>
                        </IonItem>
                    </IonList>
                </IonCard>
            </IonSlide>
            <IonSlide>
                <IonCard className="container">
                    <IonList>
                        <IonListHeader>
                            <IonLabel><strong>Name of Resource</strong></IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel position="floating">Name and Value of Resource</IonLabel>
                            {resourcesState.resources.map(resource =><IonInput value={resource}></IonInput>)}
                            {resourcesState.resourceValue.map(resourceValue =><IonInput type="number" value={resourceValue}></IonInput>)} 
                        </IonItem>
                        <IonButton onClick={ () => appendResources()}>Add Resource</IonButton>
                    </IonList>
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
                            {questionState.questions.map(question =><IonInput value={question}></IonInput>)}
                        </IonItem>
                        <IonButton onClick={ () => appendQuestions()}>Add Resource</IonButton>
                        
                    </IonList>
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
                        <IonListHeader>Players</IonListHeader>
                        <IonListHeader>Resources</IonListHeader>
                        {resourcesState.resources.map(resource =><IonChip><IonLabel>{resource}</IonLabel></IonChip>)}
                    </IonList>
                </IonCard>
            </IonSlide>
        </IonSlides>
    </IonContent>
    );
};

export default FactoryContent;