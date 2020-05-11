const link = {
    deserialize(el, next) {
        if (el.tagName.toLowerCase() == "a") {
            return {
                object: "inline",
                type: "link",
                nodes: next(el.childNodes),
                data: {
                    href: el.getAttribute("href"),
                    alt: el.getAttribute("alt"),
                    target: el.getAttribute("_target")
                }
            };
        }
    },
    serialize(object, children) {
        if (object.object == "inline" && object.type == "link") {
            return <a {...object.data.toJSON()}>{children}</a>;
        }
        return;
    }
};

export default link;
