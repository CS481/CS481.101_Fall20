import Schema from "../js/Schema.js";
import UserResponseSchema from "../schema/UserResponse.json";

// Imports for side-effects
import User from "../js/User"; 

export default class UserResponse extends Schema {
    static schema = UserResponseSchema;
}
Schema.RegisterSchema.call(UserResponse);