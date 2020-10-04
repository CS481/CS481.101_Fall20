import Schema from "../schema/Schema";

// Schema that represents the simulation's state
export default class State extends Schema {
    static schema = {
        "$id": "State",
        "type": "object",
        "required": ["is_user_waiting"],
        "properties": {
            "turn_number": {
                "type": "number",
                "mimimum": "0"
            },
            "response_deadline": {
                "type": "string",
                "format": "date-time"
            },
            "resources": {
                "type": "object",
                "patternProperties": {
                    "^.*$": {"type": "number"}
                }
            },
            "resource_deltas": {
                "type": "object",
                "patternProperties": {
                    "^.*$": {"type": "number"}
                }
            },
            "active_frame": {
                "type": "object",
                "required":["prompt", "responses"],
                "properties": {
                    "prompt": {
                        "type": "string"
                    },
                    "responses": {
                        "type": "array",
                        "items": {"type" : "string"}
                    }
                }
            },
            "user_waiting": {
                "type": "boolean"
            }
        }
    }

    // TODO: If user_waiting == false, add the other properties to the required array, and re-validate
    static FromJSON(json) {
        return Schema.FromJSON.call(this, json);
    }
}
Schema.RegisterSchema.call(State);