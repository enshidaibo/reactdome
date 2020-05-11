const video = {
    deserialize(el, next) {
        if (el.tagName.toLowerCase() == "video") {
            return {
                object: "block",
                type: "video",
                isVoid: true,
                data: {
                    src: el.getAttribute("src"),
                    poster: el.getAttribute("poster"),
                    title: el.getAttribute("title") || el.getAttribute("alt")
                }
            };
        }
    },
    serialize(object, children) {
        if (object.object == "block" && object.type == "video") {
            let data = object.data.toJSON();
            let { height, ...rest } = data;
            return <video controls {...rest} />;
        }
        return;
    }
};

export default video;
