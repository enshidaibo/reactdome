const isObject = thing => {
    if (typeof File !== "undefined" && thing instanceof File) {
        return false;
    }
    return typeof thing === "object" && thing !== null && !Array.isArray(thing);
}

export default isObject