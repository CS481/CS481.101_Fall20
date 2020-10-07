import Schema from "./Schema";

// Schema that represents resource values
export default class SimulationInstance extends Schema {
    static schema = {
        "$id": "SimulationInstance",
        "type": "object",
        "required": ["instance_id", "user_id"],
        "properties": {
            "instance_id": {
                "type": "string"
            },
            "user_id": {
                "type": "string"
            }
        }
    }
}
Schema.RegisterSchema.call(SimulationInstance);