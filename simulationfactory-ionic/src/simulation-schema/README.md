# simulation-schema
The json schema for the simulation factory. This is intended to be used as a submodule.

## Usage
A Schema object has two static methods that you need to know:
1. `Validate()` takes an Object, validates the schema, and returns the Object if validation succeeds, or throws an error if validation fails
2. `FromJSON()` takes a JSON string, validates the schema, and returns the parsed Object if validation succeeds, or throws an error if validation fails.

## Schema creation
In order to create a json schema, simply create a class that extends Schema. Override the `static schema` variable with your json-schema compliant javascript Object. In fancy cases, any of Schema's static methods can be overriden. Ensure your new module calls your class' `RegisterSchema()` static method.

### Resources
- http://json-schema.org/
- https://ajv.js.org/