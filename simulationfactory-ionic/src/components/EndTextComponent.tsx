import React, {useRef, useState } from "react";
import {IonCard, IonLabel, IonItem} from "@ionic/react";

type MyProps = {}

type MyState = {
    endText:boolean
}

class EndTextComponent extends React.Component<MyProps,MyState> {
    constructor(props) {
        super(props);
        this.state = {endText: false};
    }

    componentDidCatch(error, info){
        this.setState({endText:true});
    }

    render(){
        if(this.state.endText === true) {
            return (
            <IonCard>
                <IonItem><IonLabel>THIS IS END TEXT</IonLabel></IonItem>
            </IonCard>)
        }
    }
}
export default EndTextComponent;

