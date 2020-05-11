/**
 * 撤销恢复
 */

import React, { Component } from "react";
import styles from "../style.scss";

const pluginRender = ({ value, onChange }) => {
    const handleClickRedo = event => {
        event.preventDefault();
        const change = value.change().redo();
        onChange(change);
    };
    const handleClickUndo = event => {
        event.preventDefault();
        const change = value.change().undo();
        onChange(change);
    };
    const { history } = value;
    return [
        <div
            key="undo"
            className={history.undos.size > 0 ? styles.btn_active : styles.btn}
            onMouseDown={handleClickUndo}
        >
            <span className={"iconfont icon-editor-undo"} title={"撤销"} />
        </div>,
        <div
            key="redo"
            className={history.redos.size > 0 ? styles.btn_active : styles.btn}
            onMouseDown={handleClickRedo}
        >
            <span className={"iconfont icon-editor-redo"} title={"恢复"} />
        </div>
    ];
}

export default {
    name: 'redoUndo',
    pluginRender
}