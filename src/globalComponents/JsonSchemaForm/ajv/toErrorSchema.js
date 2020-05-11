const transformAjvErrors = (errors = []) => {
    if (errors === null) {
        return [];
    }
    return errors.map(e => {
        const { dataPath, keyword, message, params, schemaPath } = e;
        let property = `${dataPath}`;
        return {
            name: keyword,
            property,
            message,
            params, // specific to ajv
            stack: `${property} ${message}`.trim(),
            schemaPath,
        };
    });
}

const toErrorSchema = (errors) => {
    errors = transformAjvErrors(errors)
    if (!errors.length) {
        return {};
    }
    return errors.reduce((errorSchema, error) => {
        let { property, message } = error;
        const path = property.split('/')
        let parent = errorSchema;
        if (path.length > 0 && path[0] === "") {
            path.splice(0, 1);
        }
        for (const segment of path.slice(0)) {
            if (!(segment in parent)) {
                parent[segment] = {};
            }
            parent = parent[segment];
        }
        if (Array.isArray(parent.errors)) {
            parent.errors = parent.errors.concat(message);
        } else if (message) {
            parent.errors = [message];
        }
        return errorSchema;
    }, {});
}

export default toErrorSchema