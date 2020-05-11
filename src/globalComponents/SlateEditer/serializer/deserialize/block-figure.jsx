import { getBlockAttr, setBlockAttr } from "./function/getBlockAttr";

const figure = blockAttr => {
    return {
        deserialize(el, next) {
            if (el.tagName.toLowerCase() == "figure") {
                let data = getBlockAttr(el, blockAttr);
                el.childNodes.forEach(childNode => {
                    if (childNode.tagName && childNode.tagName.toLowerCase() == "img") {
                        childNode.infigure = true
                        childNode.setAttribute("infigure", true);
                    }
                });
                return {
                    object: "block",
                    type: "figure",
                    data: data,
                    nodes: next(el.childNodes)
                };
            }
        }
    };
};

export default figure;
