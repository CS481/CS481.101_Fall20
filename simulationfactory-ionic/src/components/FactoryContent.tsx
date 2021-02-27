import { IonContent, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonSlide, IonSlides, IonTextarea } from "@ionic/react";
import React, { useState} from "react";

import './FactoryContent.css';

const FactoryContent: React.FC = () => {
    const [title,setTitle] = useState<string>();
    const [desc,setDesc] = useState<string>();
    const [numPlayers, setNumPlayers] = useState<number>(0);
    const [playerTitle, setPlayerTitle] = useState<string>();
    
    const slideOpts = {
        slidesPerView: 1,
        initialSlide: 0
    };

    return (
    <IonContent className="ion-padding">
        <IonSlides pager={true} options={slideOpts}>
            <IonSlide>
                <IonList className="container">
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
            </IonSlide>
            <IonSlide>
                <IonList className="container">
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
            </IonSlide>
        </IonSlides>
    </IonContent>
    );
};

export default FactoryContent;