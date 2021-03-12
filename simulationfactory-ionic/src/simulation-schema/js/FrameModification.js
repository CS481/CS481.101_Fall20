import Schema from "./Schema.js";
import FrameModificationSchema from "../schema/FrameModification.json";

// Import for side-effects
import User from './User.js';
import Effect from './Effect.js';

export default class FrameModification extends Schema {
    static schema = FrameModificationSchema;
}
Schema.RegisterSchema.call(FrameModification);