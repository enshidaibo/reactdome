const objectKeysValue = (schema, data) => {
    let { properties } = schema
    Object.keys(data).map(key => {
        properties = properties.setIn([key, "value"], data[key]);
    });
    return properties;
};

export default objectKeysValue;