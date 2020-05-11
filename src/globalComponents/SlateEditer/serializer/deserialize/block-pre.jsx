const pre = {
    deserialize(el, next) {
        if (el.tagName.toLowerCase() == "pre") {
            const code = el.childNodes[0];
            const childNodes = code && code.tagName.toLowerCase() == "code" ? code.childNodes : el.childNodes;
            return {
                object: "block",
                type: "code",
                nodes: next(childNodes)
            };
        }
    }
};

export default pre;
