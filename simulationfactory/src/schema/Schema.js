import Validator from "../util/Validator";

// Base class for all schemas
export default class Schema {
    static schema = {};
    static GetSchema() {
        return this.schema;
    }
    static FromJSON(json) {
        let parsedObject = JSON.parse(json);
        return this.Validate(parsedObject);
    }
    static Validate(schemaObject) {
        if(Validator.validate(this.GetSchema(), schemaObject)) {
            return schemaObject
        } else {
            throw new Error(`JavaScript object failed validation against schema ${this.name}. Error: ${JSON.stringify(Validator.errors)}`);
        }    
    }
    static RegisterSchema() {
        Validator.addSchema(this.schema, this.name);
    }
}