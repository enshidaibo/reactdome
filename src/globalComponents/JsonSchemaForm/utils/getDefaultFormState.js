import isObject from './isObject';

export function getDefaultFormState(_schema, formData) {
    if (!isObject(_schema)) {
        throw new Error("Invalid schema: " + _schema);
    }
    let { properties } = _schema
    let defaults = {}
    Object.keys(properties).map(key => {
        defaults[key] = properties[key].default
    })
    if (typeof formData === "undefined") {
        return defaults;
    }
    if (isObject(formData)) {
        return Object.assign(defaults, formData);
    }
    return formData || defaults;
}