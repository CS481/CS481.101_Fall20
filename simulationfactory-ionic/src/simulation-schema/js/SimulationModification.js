import Schema from "./Schema.js";
import SimulationModificationSchema from "../schema/SimulationModification.json";

// Imports for side-effects
import User from "../js/User.js"; 

export default class SimulationModification extends Schema {
    static schema = SimulationModificationSchema;
}
Schema.RegisterSchema.call(SimulationModification);