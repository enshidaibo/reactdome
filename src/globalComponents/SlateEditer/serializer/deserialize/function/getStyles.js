/**
 * 抽取元素样式
 */

import { INIT_STYLES_TAGS } from "./INIT_STYLES_TAGS";

const getStyles = (el, STYLES_TAGS, styleAll = false) => {
    let styles = el.getAttribute("style");
    if (!styles) {
        return {};
    }
    let style = {};
    styles = styles.split(";").filter(d => {
        return d.length > 0;
    });
    if (styleAll) {
        let reg = new RegExp(' ', "g")
        styles.map(d => {
            let attr = d.replace(reg, '').split(":");
            let [key, value] = attr
            let keys = key.split("-")
            if (keys.length > 1) {
                key = keys.map((dt, i) => {
                    if (i == 0) {
                        return dt
                    }
                    return dt.slice(0, 1).toUpperCase() + dt.slice(1)
                }).join('')
            }
            style[key] = value;
        });
        return style
    }
    if (STYLES_TAGS == true || STYLES_TAGS == undefined) {
        STYLES_TAGS = INIT_STYLES_TAGS;
    }

    let keys = Object.keys(STYLES_TAGS);
    styles.map(d => {
        let attr = d.split(":");
        let [key, value] = attr
        if (keys.includes(key)) {
            key = STYLES_TAGS[key];
            style[key] = value;
        }
    });
    return style;
};

export default getStyles;