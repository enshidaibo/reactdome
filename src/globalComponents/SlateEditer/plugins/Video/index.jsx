/**
 * 添加图片
 */

import React, { useState } from "react";
const ResourceManager = app.asyncComponent('ResourceManager')
import insertVideo from "./insertVideo";
import styles from "../style.scss";

const insertVideos = (value, data) => {
    return data.reduce((arr, d) => {
        let change = arr.change().call(insertVideo, { src: d.path, poster: d.thumb, title: d.name });
        return change.value
    }, value)
}

const pluginRender = ({ value, onChange, uploadConfig }) => {
    const [visible, setVisible] = useState(false)
    const handleChange = data => {
        setVisible(false)
        let change = insertVideos(value, data)
        onChange({ value: change });
    };
    return [
        <div className={styles.btn} key={"btn"} onMouseDown={() => setVisible(true)}>
            <span className={"iconfont icon-748bianjiqi_shipin"} title={"插入视频"} />
        </div>,
        visible && (
            <ResourceManager
                key={"source"}
                onHide={() => setVisible(false)}
                onOk={handleChange}
                multiple={true}
                resourceType={"video"}
                uploadConfig={uploadConfig}
            />
        )
    ];
}

export default {
    name: 'video',
    pluginRender
}