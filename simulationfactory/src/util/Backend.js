import SimulationInstance from "../simulation-schema/SimulationInstance";
import UserResponse from "../simulation-schema/UserResponse";
import State from "../simulation-schema/State";

let state_to_return = 0;
export async function GetState(simulationInstance, callback) {
    SimulationInstance.Validate(simulationInstance);
    //TODO: Post data to backend, and get result

    //For now, just use an array of static States
    let instances = [
        `{
            "is_user_waiting": false,
            "turn_number": 0,
            "response_deadline": "2020-01-01T01:01:01+00:00",
            "resources": {
                "environment": 20,
                "cash": 0
            },
            "active_frame": {
                "prompt": "How much would you like to change your production?",
                "responses": ["-15%", "No change", "+15%"]
            }
        }`,
        '{' +
            '"is_user_waiting": false,' +
            '"turn_number": 1,' +
            '"response_deadline": "2020-01-01T01:01:01+00:00",' +
            '"resources": {' +
                '"environment": 15,' +
                '"cash": 15' +
            '},' +
            '"resource_deltas": {' +
                '"environment": -5,' +
                '"cash": 15' +
            '},' +
            '"active_frame": {' +
                '"prompt": "Because of your actions, you have changed the environment by ${resource_deltas.environment}. ' +
                'You made a profit of $${resource_deltas.cash}, and your total net worth is $${resources.cash}.",' +
                '"responses": ["ok"]' +
            '}' +
        '}'
    ];
    state_to_return = (state_to_return+1)%2;
    let fetch_url = `http://98.235.235.188/reactTestPost.php`;
    let fetch_body = {
        method: "GET",
        body: instances[state_to_return]
    };
    try {
        let response = await fetch(fetch_url, fetch_body);
        callback((await response.text()));
    } catch (error) {
        throw new Error(error);
    }
    //return State.FromJSON(instances[state_to_return]);
}

export function SubmitResponse(response) {
    UserResponse.Validate(response);
    //TODO: Post data to backend, and get result
}