import Validator from "./Validator.js";

// Base class for all schemas
export default class Schema {
    static schema = {};
    static FromJSON(json) {
        let parsedObject = JSON.parse(json);
        return this.Validate(parsedObject);
    }
    static Validate(schemaObject) {
        if(Validator.validate(this.schema, schemaObject)) {
            return schemaObject;
        } else {
            throw new Error(`JavaScript object failed validation against schema ${this.name}.
                             Error: ${JSON.stringify(Validator.errors)}.
                             Object: ${JSON.stringify(schemaObject)}`);
        }    
    }
    static RegisterSchema() {
        Validator.addSchema(this.schema);
    }
}