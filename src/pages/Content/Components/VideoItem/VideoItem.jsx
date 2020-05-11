import React, { Component } from "react";
import { Button } from "antd";
const ResourceManager = app.asyncComponent('ResourceManager')

import styles from "./VideoItem.scss";
export default class VideoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showServer: false
        };
    }
    /**
     * 打开服务器资源列表
     */
    handleShowSource = () => {
        this.setState({
            showServer: true
        });
    };
    /**
     * 隐藏列表
     */
    handleHideSource = () => {
        this.setState({
            showServer: false
        });
    };
    handleChange = data => {
        let { onChange, name } = this.props;
        this.setState({
            showServer: false
        });
        onChange &&
            onChange({
                mediaPath: data[0].path,
                mediaTime: data[0].mediaTime,
                mediaName: data[0].name
            });
    };
    render() {
        let { showServer } = this.state;
        let { value } = this.props;
        return (
            <div className={styles.videoItem}>
                <div className={styles.video}>
                    <video className={styles.videosrc} src={value} controls={value} />
                </div>
                <Button type="primary" className={styles.rechoose} onClick={this.handleShowSource}>
                    <i className={`iconfont icon-shipin1 ${styles.icon}`} />
                    {value ? "重新选择" : "选择视频"}
                </Button>
                {showServer && (
                    <ResourceManager onHide={this.handleHideSource} onOk={this.handleChange} resourceType={"video"} />
                )}
            </div>
        );
    }
}
