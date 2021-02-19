import { IonContent, IonLabel } from "@ionic/react";
import React from "react";

import './HomeContent.css';

const FactoryContent: React.FC = () => {
    return (
    <IonContent className="ion-padding">
        <IonLabel color="primary">WELCOME TO THE FACTORY</IonLabel>
    </IonContent>
    );
};

export default FactoryContent;