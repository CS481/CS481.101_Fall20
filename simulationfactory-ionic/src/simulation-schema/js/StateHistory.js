import Schema from "../js/Schema.js";
import StateHistorySchema from "../schema/StateHistory.json";

// Schema that represents the simulation's StateHistory
export default class StateHistory extends Schema {
    static schema = StateHistorySchema;

    // TODO: If user_waiting == false, add the other properties to the required array, and re-validate
    static FromJSON(json) {
        return Schema.FromJSON.call(this, json);
    }
}
Schema.RegisterSchema.call(StateHistory);