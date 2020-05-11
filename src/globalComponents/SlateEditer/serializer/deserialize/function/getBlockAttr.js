/**
 * 获取属性
 */

import getStyles from "./getStyles";

export const getBlockAttr = (el, blockAttr) => {
    let data = {};
    if (blockAttr.styleAll) {
        data.style = getStyles(el, blockAttr.style, true);
    } else if (blockAttr.style) {
        data.style = getStyles(el, blockAttr.style);
    }
    if (blockAttr.class) {
        data.className = el.getAttribute("class");
    }
    return data;
};

// export const setBlockAttr = (object, blockAttr) => {
export const setBlockAttr = (object) => {
    let data = {};
    data.style = object.data.get("style");
    data.className = object.data.get("className");
    // if (blockAttr.style) {
    //     data.style = object.data.get("style");
    // }
    // if (blockAttr.class) {
    //     data.className = object.data.get("className");
    // }
    return data;
};

export default getBlockAttr;