import Schema from "./Schema";

// Schema that represents resource values
export default class Resource extends Schema {
    static schema = {
        "$id": "Resource",
        "type": "object",
        "required": ["name", "amount"],
        "properties": {
            "name": {
                "type": "string",
                "minLength": 1
            },
            "amount": {
                "type": "number"
            }
        }
    }
}
Schema.RegisterSchema.call(Resource);