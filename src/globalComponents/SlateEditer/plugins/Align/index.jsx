import React, { Component } from "react";
import styles from "../style.scss";

import changeAlign from "./changeAlign";

const Align = ({ value, onChange }) => {
    const hasBlock = align => {
        if (value.blocks.size > 1) {
            return false;
        }
        return value.blocks.some(node => {
            let style = node.data.get("style") || {};
            return style.textAlign == align;
            // return style.textAlign == align || (style.textAlign == undefined && align == "center");
        });
    };
    const handleClickBlock = (event, align) => {
        event.preventDefault();
        let { blocks } = value;
        let change = value.change();
        blocks.map(node => {
            change.call(changeAlign, { node, align });
        });
        // change.focus();
        onChange(change);
    };
    const renderBlockButton = (align, icon, title) => {
        let isActive = hasBlock(align);
        let cls = isActive ? styles.btn_active : styles.btn;
        return (
            <div key={align} className={cls} title={title} onMouseDown={event => handleClickBlock(event, align)}>
                <span className={"iconfont icon-" + icon} />
            </div>
        );
    };
    return [
        renderBlockButton("left", "editor-align-left", "左对齐"),
        renderBlockButton("right", "editor-align-right", "右对齐"),
        renderBlockButton("center", "editor-align-center", "居中对齐"),
        renderBlockButton("justify", "editor-align-justify", "两端对齐")
    ];
}

export default {
    name: 'align',
    pluginRender: Align
}