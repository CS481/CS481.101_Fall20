import Schema from "./Schema.js";
import IdRequestSchema from "../schema/IdRequest.json";

// Imports for side-effects
import User from "../js/User.js"; 

export default class IdRequest extends Schema {
    static schema = IdRequestSchema;
}
Schema.RegisterSchema.call(IdRequest);