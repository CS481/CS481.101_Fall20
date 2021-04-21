import Schema from "./Schema.js";
import SimulationModificationSchema from "../schema/SimulationModification.json";

// Imports for side-effects
import User from "../js/User.js";
import Responses from "../js/Responses.js";

export default class SimulationModification extends Schema {
    static schema = SimulationModificationSchema;

    static Validate(schemaObject) {
        schemaObject = super.Validate(schemaObject);

        if ('responses' in schemaObject) {
            schemaObject.responses = Responses.Validate(schemaObject.responses);
        }
        return schemaObject;
    }
}
Schema.RegisterSchema.call(SimulationModification);