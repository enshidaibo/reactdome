import { getBlockAttr, setBlockAttr } from "./function/getBlockAttr";

const renderMarkSpan = (el, next, blockAttr, styles = {}) => {
    let data = getBlockAttr(el, blockAttr);
    let style = {
        ...styles,
        ...data.style
    };
    if (el.childNodes.length == 1) {
        let childNode = el.childNodes[0];
        let childMark = childNode.tagName ? childNode.tagName.toLowerCase() : undefined;
        if (childMark == "span") {
            return renderMarkSpan(childNode, next, blockAttr, style);
        }
    }
    return {
        object: "mark",
        type: "span",
        data: {
            ...data,
            style
        },
        nodes: next(el.childNodes)
    };
};

const renderMarkSerialize = (children, styles = {}) => {
    const { props } = children;
    let { style = {} } = props;
    style = {
        ...style,
        ...styles
    };
    return React.cloneElement(children, { style });
};

const span = blockAttr => {
    return {
        deserialize(el, next) {
            const mark = el.tagName.toLowerCase();
            if (mark == "span") {
                return renderMarkSpan(el, next, blockAttr, {});
            }
        },
        serialize(object, children) {
            if (object.object == "mark" && object.type == "span") {
                let attr = setBlockAttr(object, blockAttr);
                if (children.type == "span") {
                    return renderMarkSerialize(children, attr.style);
                }
                return <span {...attr}>{children}</span>;
            }
            return;
        }
    };
};

export default span;
