/**
 * 添加图片
 */

import React, { useState } from "react";
// const asyncComponents = app.asyncComponents
const ResourceManager = app.asyncComponent('ResourceManager')
import insertAudio from "./insertAudio";
import styles from "../style.scss";

const insertAudios = (value, data) => {
    return data.reduce((arr, d) => {
        let change = arr.change().call(insertAudio, { src: d.path, title: d.name });
        return change.value
    }, value)
}

const pluginRender = ({ value, onChange, uploadConfig }) => {
    const [visible, setVisible] = useState(false)
    const handleChange = data => {
        setVisible(false)
        let change = insertAudios(value, data)
        onChange({ value: change });
    };
    return [
        <div className={styles.btn} key={"btn"} onMouseDown={() => setVisible(true)}>
            <span className={"iconfont icon-yinpin"} title={"插入音频"} />
        </div>,
        visible && (
            <ResourceManager
                key={"source"}
                onHide={() => setVisible(false)}
                onOk={handleChange}
                multiple={true}
                resourceType={"audio"}
                uploadConfig={uploadConfig}
            />
        )
    ];
}

export default {
    name: 'audio',
    pluginRender
}