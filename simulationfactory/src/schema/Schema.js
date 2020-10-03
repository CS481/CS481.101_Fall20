import Validator from "../util/Validator";

// Base class for all schemas
export default class Schema {
    static schema = {};
    static GetSchema() {
        return this.schema;
    }
    static FromJSON(json) {
        let parsedObject = JSON.parse(json);
        if(Validator.validate(this.GetSchema(), parsedObject)) {
            return parsedObject
        } else {
            throw new Error("JSON string failed validation against schema " + this.name);
        }
    }
    static RegisterSchema() {
        Validator.addSchema(this.schema, this.name);
    }
}