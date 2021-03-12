import IdRequest from "../simulation-schema/js/IdRequest";
import IdResponse from "../simulation-schema/js/IdResponse";
import State from "../simulation-schema/js/State";
import User from "../simulation-schema/js/User";
import UserResponse from "../simulation-schema/js/UserResponse";
import FrameModification from "../simulation-schema/js/FrameModification";
import Effect from "../simulation-schema/js/Effect";
import SimulationModification from "../simulation-schema/js/SimulationModification";

let server_url = process.env.REACT_APP_SIMULATION_FACTORY_URL;

// Executes the BeginSim procedure on the backend
// Args:
//      request (object): The request to POST to the backend
//      callback (object): The callback to execute once the backend responds.
//                         This callback accepts no arguments.
export async function BeginSim(request, callback) {
    Post(request, callback, 'BeginSim', IdRequest);
}

// Executes the GetSimState procedure on the backend
// Args:
//      request (object): The request to POST to the backend
//      callback (object): The callback to execute once the backend responds.
//                         This callback accepts one State argument.
export async function GetState(request, callback) {
    Post(request, callback, 'GetSimState', IdRequest, State);
}

// Executes the SubmitResponse procedure on the backend
// Args:
//      request (object): The request to POST to the backend
//      callback (object): The callback to execute once the backend responds.
//                         This callback accepts no arguments.
export async function SubmitResponse(request, callback) {
    Post(request, callback, 'SubmitResponse', UserResponse);
}

// Executes the CheckCredentials procedure on the backend
// Args:
//      request (object): The request to POST to the backend
//      callback (object): The callback to execute once the backend responds.
//                         This callback accepts no arguments.
export async function CheckCredentials(request, callback) {
    Post(request, callback, 'CheckCredentials', User);
}

// Executes the SimulationInitialization procedure on the backend
// Args:
//      request (object): The request to POST to the backend
//      callback (object): The callback to execute once the backend responds.
//                         This callback accepts one IdResponse argument.
export async function InitializeSimulation(request, callback) {
    Post(request, callback, 'SimulationInitialization', User, IdResponse);
}

// Executes the FrameInitialization procedure on the backend
// Args:
//      request (object): The request to POST to the backend
//      callback (object): The callback to execute once the backend responds.
//                         This callback accepts one IdResponse argument.
export async function InitializeFrame(request, callback) {
    Post(request, callback, 'FrameInitialization', IdRequest, IdResponse);
}

/**
 *  Modifies a frame
 * @param {object} frameModification The request to POST to the backend
 * @param {object} callback The callback to execute once the backend responds.
 */
export async function ModifyFrame(frameModification, callback) {
    Post(frameModification, callback, 'FrameModification', FrameModification);
}

/**
 * Modifies a simulation
 * @param {object} simulationModifcation The request to POST to the backend
 * @param {object} callback The callback to execute once the backend responds.
 */
export async function ModifySimulation(simulationModification, callback) {
    Post(simulationModification, callback, 'SimulationModification', SimulationModification);
}

// Private method to issue a POST request to the backend
// Args:
//      request (object): The request object to post
//      callback (function): The function to call once the backend responds. 
//                           If responseValidator is null, the callback is called with no argument.
//                           Otherwise, the callback is called with the backend's reponse as an argument
//      backendProcedure (string): The procedure to request the backend to perform
//      requestValidator (class): The validator class to use on the request object
//      responseValidator (class): The validator class to use on the backend's response.
//                                 If null, the callback is called with no argument. Defaults to null.
async function Post(request, callback, backendProcedure, requestValidator, responseValidator=null) {
    requestValidator.Validate(request);
    let fetch_url = `${server_url}/${backendProcedure}`;
    let fetch_body = {
        method: "POST",
        headers: new Headers(),
        body: JSON.stringify(request)
    };
    let response = await fetch(fetch_url, fetch_body);
    if (response.ok) {
        if (responseValidator == null) {
            callback();
        } else {
            callback(responseValidator.FromJSON(await response.text()));
        }
    } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
}