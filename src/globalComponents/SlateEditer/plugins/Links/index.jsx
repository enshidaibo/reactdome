/**
 * 添加链接
 */
import React from "react";
import styles from "../style.scss";

/**
 * A change helper to standardize wrapping links.
 *
 * @param {Change} change
 * @param {String} href
 */

const wrapLink = (change, href) => {
    change.wrapInline({
        type: "link",
        data: { href }
    });
    change.collapseToEnd();
}

const unwrapLink = (change) => {
    change.unwrapInline("link");
}
const Links = ({ value, onChange }) => {
    const hasLinks = () => {
        return value.inlines.some(inline => inline.type == "link");
    };
    const handleClickLink = event => {
        event.preventDefault();
        const hasLink = hasLinks();
        const change = value.change();
        if (hasLink) {
            change.call(unwrapLink);
        } else if (value.isExpanded) {
            const href = window.prompt("输入链接的URL:");
            if (!href) {
                return;
            }
            change.call(wrapLink, href);
        } else {
            const href = window.prompt("输入链接的URL:");
            if (!href) {
                return;
            }
            const text = window.prompt("输入链接的文字:");
            if (!text) {
                return;
            }
            change
                .insertText(text)
                .extend(0 - text.length)
                .call(wrapLink, href);
        }
        onChange(change);
    };

    let isActive = hasLinks();
    let cls = isActive ? styles.btn_active : styles.btn;
    return (
        <div className={cls} onMouseDown={handleClickLink}>
            <span className={"iconfont icon-bianjiqichaolianjie"} title={"插入链接"} />
        </div>
    );
}

export default { pluginRender: Links }
