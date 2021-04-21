import Schema from "../js/Schema.js";
import StateSchema from "../schema/State.json";
import StateHistory from "../js/StateHistory.js";
import Responses from "../js/Responses.js";

// Schema that represents the simulation's state
export default class State extends Schema {
    static schema = StateSchema;

    static Validate(schemaObject) {
        schemaObject = super.Validate(schemaObject);

        schemaObject.responses = Responses.Validate(schemaObject.responses);
        return schemaObject;
    }
}
Schema.RegisterSchema.call(State);