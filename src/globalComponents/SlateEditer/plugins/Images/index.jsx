/**
 * 添加图片
 */

import React, { useState } from "react";
import insertImage from "./insertImage";
import styles from "../style.scss";
import { httpRemoteImgsWaterMark } from '@/services/resource'

const ResourceManager = app.asyncComponent('ResourceManager')

const insertImages = (value, data) => {
    return data.reduce((arr, d) => {
        let change = arr.change().call(insertImage, { src: d.path, title: d.name });
        return change.value
    }, value)
}

const imgsFilter = async (imgs) => {
    let arr = [];
    for(let i=0, len = imgs.length; i<len; i++){
        let res = await httpRemoteImgsWaterMark({url: imgs[i].path, mark: true});
        if(res.success){
            imgs[i].path = res.body;
            arr.push(imgs[i]);
        }
    }
    return arr;
}

const pluginRender = ({ value, onChange, uploadConfig, mark, modelId }) => {
    const [visible, setVisible] = useState(false)
    const handleChange = async data => {
        setVisible(false)
        let arr = data;
        if(modelId == 0 || modelId == 1 || modelId == 7){
            arr = mark === true ? await imgsFilter(data) : data;
        }
        let change = insertImages(value, arr);
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
                    let nextBlock = document.getNextBlock(value.startBlock.key)
                    if (nextBlock.type == 'figcaption') {
                        return
                    }
                    editor.moveToEndOf(parent).insertBlock('figcaption')
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
    return {
        onKeyDown
    };
}

export default { name: 'images', pluginRender, pluginEvent }