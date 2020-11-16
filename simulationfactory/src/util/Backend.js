import SimulationInstance from "../simulation-schema/SimulationInstance";
import State from "../simulation-schema/State";
import UserResponse from "../simulation-schema/UserResponse";

let server_url = process.env.REACT_APP_SIMULATION_FACTORY_URL;

export async function BeginSim(beginSim, callback) {
    SimulationInstance.Validate(beginSim);
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
    SimulationInstance.Validate(simulationInstance);
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