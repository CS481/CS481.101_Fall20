import Schema from "./Schema.js";
import ResponseSchema from "../schema/Responses.json";

export default class Response extends Schema {
    static schema = ResponseSchema;
    static Validate(schemaObject) {
        schemaObject = super.Validate(schemaObject);

        switch(schemaObject.response_type) {
            case "radio":
                Response.validateRadio(schemaObject.values);
                break;
            case "slider":
                Response.validateSlider(schemaObject.values);
        }

        return schemaObject;
    }

    static validateRadio(radioData) {
        if (!Array.isArray(radioData)) {
            throw new Error(`JavaScript object failed validation against schema ${this.name}.
                            Error: responses values must be an array.
                            Object: ${JSON.stringify(radioData)}`);
        }
    }
    static validateSlider(sliderData) {
        if (typeof sliderData != 'object') {
            throw new Error(`JavaScript object failed validation against schema ${this.name}.
                            Error: responses values must be an object.
                            Object: ${JSON.stringify(sliderData)}`);
        }
        if (!'min_response' in sliderData) {
            throw new Error(`JavaScript object failed validation against schema ${this.name}.
                            Error: responses must include min_response, max_response and step_response.
                            Object: ${JSON.stringify(sliderData)}`);
        }
        if (sliderData.min_response >= sliderData.max_response) {
            throw new Error(`JavaScript object failed validation against schema ${this.name}.
                            Error: min_response must be less than max_response.
                            Object: ${JSON.stringify(sliderData)}`);
        }
        if (sliderData.max_response - sliderData.min_response <= sliderData.step_response) {
            throw new Error(`JavaScript object failed validation against schema ${this.name}.
                            Error: step_response must be less than max_response-min_response.
                            Object: ${JSON.stringify(sliderData)}`);
        }
    }
}
Schema.RegisterSchema.call(Response);