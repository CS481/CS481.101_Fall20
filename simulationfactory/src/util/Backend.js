import IdRequest from "../simulation-schema/js/IdRequest";
import State from "../simulation-schema/js/State";
import IdResponse from "../simulation-schema/js/IdResponse";
import UserResponse from "../simulation-schema/js/UserResponse";
import FrameModification from "../simulation-schema/js/FrameModification";
import Effect from "../simulation-schema/js/Effect";

let server_url = process.env.REACT_APP_SIMULATION_FACTORY_URL;

export async function BeginSim(beginSim, callback) {
    IdRequest.Validate(beginSim);
    let fetch_url = `${server_url}/BeginSim.php`;
    let fetch_body = {
        method: "POST",
        headers: new Headers(),
        body: JSON.stringify(beginSim)
    };
    let response = await fetch(fetch_url, fetch_body);
    if (response.ok) {
        callback();
    } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
}

export async function GetState(simulationInstance, callback) {
    IdRequest.Validate(simulationInstance);
    let fetch_url = `${server_url}/GetSimState.php`;
    let fetch_body = {
        method: "POST",
        headers: new Headers(),
        body: JSON.stringify(simulationInstance)
    };
    let response = await fetch(fetch_url, fetch_body);
    if (response.ok) {
        callback(State.FromJSON(await response.text()));
    } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
}

export async function SubmitResponse(userResponse, callback) {
    UserResponse.Validate(userResponse);
    let fetch_url = `${server_url}/SubmitResponse.php`;
    let fetch_body = {
        method: "POST",
        headers: new Headers(),
        body: JSON.stringify(userResponse)
    };
    let response = await fetch(fetch_url, fetch_body);
    if (response.ok) {
        //throw new Error(await response.text())
        callback();
    } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
}
/**
 * Modifies an already created frame within a simulation
 * @param {*} frameModification The effect you wish to modify
 * @param {*} callback Sends a callback to this variable
 */
export async function ModifyFrame(frameModification, callback) {
    FrameModification.Validate(frameModification);
    let fetch_url = `${server_url}/FrameModification.php`;
    let fetch_body = {
        method: "POST",
        headers: new Headers(),
        body: JSON.stringify(frameModification)
    };
    let response = await fetch(fetch_url, fetch_body);
    if (response.ok) {
        callback(IdResponse.FromJSON(await response.text()));
    } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

}

/**
 * Modifies an effect inside a frame, which is part of a simulation
 * @param {*} effectModification The effect you wish to modify
 * @param {*} callback Sends a callback to this variable
 */
export async function ModifyEffect(effectModification, callback){
    Effect.Validate(effectModification);
    let fetch_url = `${server_url}/effectModification.php`;
    let fetch_body = {
        method: "POST",
        headers: new Headers(),
        body: JSON.stringify(effectModification)
    };
    let response = await fetch(fetch_url, fetch_body);
    if (response.ok) {
        callback(IdResponse.FromJSON(await response.text()));
    } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

}
