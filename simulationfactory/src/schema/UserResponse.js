import Schema from "../schema/Schema"
export default class UserResponse extends Schema {
    static schema = {
        $id: "UserResponse",
        type: "object",
        required: ["instance", "response"],
        properties: {
            instance: {$ref: "SimulationInstance"},
            response: {
                type: "number",
                minimum: 0
            }
        }
    }
}