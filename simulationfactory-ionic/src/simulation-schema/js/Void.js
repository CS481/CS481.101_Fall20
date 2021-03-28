import Schema from "../js/Schema.js";
import VoidSchema from "../schema/Void.json";

export default class Void extends Schema {
    static schema = VoidSchema;
}
Schema.RegisterSchema.call(Void);