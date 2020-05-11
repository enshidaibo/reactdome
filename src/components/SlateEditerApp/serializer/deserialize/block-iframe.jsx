const iframe = {
    deserialize(el, next) {
        if (el.tagName.toLowerCase() == "iframe") {
            let src = el.getAttribute("src");
            return {
                object: "block",
                type: "iframe",
                isVoid: true,
                data: {
                    src: src,
                }
            };
        }
    },
    serialize(object, children) {
        if (object.object == "block" && object.type == "iframe") {
            let data = object.data.toJSON();
            let { className, style, height, ...rest } = data;
            return (
                <iframe className={className} style={style}  {...rest}></iframe>
            );
        }
        return;
    }
};

export default iframe;
