const image = {
    deserialize(el, next) {
        if (el.tagName.toLowerCase() == "img") {
            let src = el.getAttribute("src");
            let dataSrc = el.getAttribute("data-src");
            let infigure = el.getAttribute("infigure");
            if (infigure) {
                return {
                    object: "block",
                    type: "image",
                    isVoid: true,
                    data: {
                        // src: src,
                        src: dataSrc || src,
                        infigure: infigure,
                        title: el.getAttribute("title") || el.getAttribute("alt")
                    }
                };
            }
            let figure = document.createElement('figure')
            el.setAttribute("infigure", true);
            figure.appendChild(el)
            let figcaption = document.createElement('figcaption')
            // figcaption.setAttribute("title", 'sdsds');
            figure.appendChild(figcaption)
            return {
                object: "block",
                type: "figure",
                nodes: next(figure.childNodes)
            };
        }
    },
    serialize(object, children) {
        if (object.object == "block" && object.type == "image") {
            let data = object.data.toJSON();
            let { className, style, height, infigure, src, ...rest } = data;
            // return <img className={className} style={style} src={src} {...rest} />
            return <img className={className} style={style} src="/public/images/image.jpg" data-src={src} {...rest} />
            if (infigure) {
                return <img className={className} style={style} {...rest} />
            }
            return (
                <figure className={className} style={style}>
                    <img {...rest} />
                </figure>
            );
        }
        return;
    }
};

export default image;
