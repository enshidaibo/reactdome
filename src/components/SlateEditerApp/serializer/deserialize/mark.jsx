import { MARK_TAGS } from "../TAGS";
const mark = blockAttr => {
    return {
        deserialize(el, next) {
            const mark = MARK_TAGS[el.tagName.toLowerCase()];
            if (mark) {
                return {
                    object: "mark",
                    type: mark,
                    nodes: next(el.childNodes)
                };
            }
        },
        serialize(object, children) {
            if (object.object != "mark") return;
            if (object.isEmpty === true) {
                return null;
            }
            switch (object.type) {
                case "bold":
                    return <strong>{children}</strong>;
                case "code":
                    return <code>{children}</code>;
                case "italic":
                    return <em>{children}</em>;
                case "underlined":
                    return <u>{children}</u>;
                // case "span":
                //     let style = object.data.get("style");
                //     return <span style={style}>{children}</span>;
            }
        }
    };
};

export default mark;
