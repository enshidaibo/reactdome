import Immutable from "seamless-immutable";
import ajv from "./ajv";
import objectKeysValue from "./objectKeysValue";

export const validator = schema => {
    let validate = ajv.compile(schema);
    let validateData;
    let properties;
    return {
        getSchema: () => {
            return schema.properties;
        },
        init: data => {
            validateData = Immutable(data);
            properties = objectKeysValue(schema, data);
            return { data: validateData, properties };
        },
        async: data => {
            let keys = Object.keys(data);
            validateData = validateData.merge(data);
            properties = objectKeysValue(schema, data);
            let valid = validate(validateData);
            if (!valid) {
                validate.errors.map(error => {
                    let errorKey = error.dataPath.slice(1);
                    if (errorKey && keys.includes(errorKey)) {
                        properties = properties.setIn([errorKey, "error"], error);
                    }
                });
            }
            return {
                valid,
                data: validateData,
                errors: validate.errors,
                properties
            };
        },
        valid: data => {
            validateData = Immutable(data);
            properties = objectKeysValue(schema, data);
            let valid = validate(data);
            if (!valid) {
                validate.errors.map(error => {
                    let errorKey = error.dataPath.slice(1);
                    if (errorKey) {
                        properties = properties.setIn([errorKey, "error"], error);
                    }
                });
            }
            return {
                valid,
                data: validateData,
                errors: validate.errors,
                properties
            };
        }
    };
};
const ajvValidate = (schems, data) => {
    let validate = ajv.compile(schems);
    let validates = data => {
        let valid = validate(data);
        return {
            valid,
            data,
            errors: validate.errors
        };
    }
    return data ? validates(data) : validates
};

export default ajvValidate;