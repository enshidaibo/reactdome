const formatOut = data => {
    for (let key of Object.keys(data)) {
        if (Array.isArray(data[key])) {
            data[key] = JSON.stringify(data[key]);
        }
    }
    return data;
};

export default formatOut;
