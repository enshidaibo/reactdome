/**
 * 添加图片
 */

import React, { useState } from "react";
import insertImage from "./insertImage";
import styles from "../style.scss";

const asyncComponents = app.asyncComponents
const ResourceManager = asyncComponents(() => import("Components/ResourceManager/ResourceManager"));

const insertImages = (value, data) => {
    return data.reduce((arr, d) => {
        let change = arr.change().call(insertImage, { src: d.path, title: d.name });
        return change.value
    }, value)
}

const pluginRender = ({ value, onChange, uploadConfig }) => {
    const [visible, setVisible] = useState(false)
    const handleChange = data => {
        setVisible(false)
        let change = insertImages(value, data)
        onChange({ value: change });
    };
    return [
        <div className={styles.btn} key={"btn"} onMouseDown={() => setVisible(true)}>
            <span className={"iconfont icon-762bianjiqi_jietu"} title={"插入图片"} />
        </div>,
        visible && (
            <ResourceManager
                key={"source"}
                onHide={() => setVisible(false)}
                onOk={handleChange}
                multiple={true}
                resourceType={"image"}
                uploadConfig={uploadConfig}
            />
        )
    ];
}

const pluginEvent = () => {
    const onKeyDown = (event, editor) => {
        const { value } = editor;
        const { document, selection } = value;
        const startNode = value.startBlock
        if (value.startBlock.type == 'figcaption') {
            let parent = document.getParent(value.startBlock.key);
            switch (event.key) {
                case "Enter":
                    if (selection.isAtEndOf(startNode)) {
                        editor.moveToEndOf(parent).insertBlock('paragraph').unwrapBlock('figure');
                        event.preventDefault();
                        return true
                    }
                    break
                case "Backspace":
                    if (selection.isAtStartOf(startNode)) {
                        editor.removeNodeByKey(parent.key)
                        return true
                    }
                    break
            }
            return;
        } else if (value.startBlock.type == 'image') {
            let parent = document.getParent(value.startBlock.key);
            switch (event.key) {
                case "Enter":
                    editor.moveToEndOf(parent).insertBlock('figcaption')
                    event.preventDefault();
                    return true
                case "Backspace":
                    editor.removeNodeByKey(parent.key)
                    return true
                case "Delete":
                    editor.removeNodeByKey(parent.key)
                    return true
            }
            return;
        }
        return;
    };
    const onPaste = (event, editor, next) => {
        const { value } = editor
        const transfer = getEventTransfer(event);
        const { type, text, files } = transfer;
        console.log(type);
        console.log(event);
        console.log(next);
        console.log(value);
        return
    }
    return {
        onKeyDown,
        onPaste
    };
}

export default { pluginRender, pluginEvent }