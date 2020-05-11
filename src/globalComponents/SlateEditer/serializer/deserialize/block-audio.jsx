const audio = {
    deserialize(el, next) {
        if (el.tagName.toLowerCase() == "audio") {
            let src = el.getAttribute("src");
            return {
                object: "block",
                type: "audio",
                isVoid: true,
                data: {
                    src: src,
                    title: el.getAttribute("title") || el.getAttribute("alt")
                }
            };
        }
    },
    serialize(object, children) {
        if (object.object == "block" && object.type == "audio") {
            let data = object.data.toJSON();
            let { height, ...rest } = data;
            return <audio controls {...rest} />;
        }
        return;
    }
};

export default audio;
