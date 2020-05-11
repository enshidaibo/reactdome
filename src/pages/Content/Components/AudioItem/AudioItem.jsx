import React, { useState } from "react";
import { Button } from "antd";
const ResourceManager = app.asyncComponent('ResourceManager')

import styles from "./AudioItem.scss";

const AudioItem = ({ onChange, value }) => {
    const [visible, setVisible] = useState(false)
    /**
    * 打开服务器资源列表
    */
    const handleChange = data => {
        setVisible(false)
        onChange &&
            onChange({
                audioPath: data[0].path,
                mediaTime: data[0].mediaTime
            });
    };
    return (
        <div className={styles.videoItem}>
            <div className={styles.video}>
                <audio src={value} className={styles.videosrc} controls={value}>
                    Your browser does not support the audio element.
            </audio>
            </div>
            <Button type="primary" className={styles.rechoose} onClick={() => setVisible(true)}>
                <i className={`iconfont icon-shipin1 ${styles.icon}`} />
                {value ? "重新选择" : "选择音频"}
            </Button>
            {visible && (
                <ResourceManager onHide={() => setVisible(false)} onOk={handleChange} resourceType={"audio"} />
            )}
        </div>
    );
}

export default AudioItem