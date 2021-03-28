import Schema from "../js/Schema.js";
import UserSchema from "../schema/User.json";

// Schema that represents the user
export default class User extends Schema {
    static schema = UserSchema;
}
Schema.RegisterSchema.call(User);