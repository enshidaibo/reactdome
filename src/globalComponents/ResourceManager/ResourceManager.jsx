import React, { Component } from "react";
import ReactDOM from "react-dom";
import { message } from "antd";

import Header from "./Header/Header";
import Images from "./Images/Images";
import Video from "./Video/Video";
import Audio from "./Audio/Audio";
import styles from "./styles.scss";
export default class ResourceManager extends Component {
    static defaultProps = {
        multiple: false
    };
    constructor(props) {
        super(props);
        let sourceType = props.resourceType || "image";
        this.state = {
            sourceType
        };
    }
    /**
     * 切换资源类型
     */
    handleToggleTab = sourceType => {
        let { resourceType } = this.props;
        if (resourceType) {
            return message.warning("禁止切换到不符合的资源类型");
        }
        this.setState({
            sourceType
        });
    };
    render() {
        let { onHide, resourceType } = this.props;
        let { sourceType } = this.state;
        return ReactDOM.createPortal(
            <div className={styles.resourceManager}>
                <Header
                    sourceType={sourceType}
                    resourceType={resourceType}
                    onHide={onHide}
                    onToggleTab={this.handleToggleTab}
                />
                {sourceType == "image" && <Images {...this.props} />}
                {sourceType == "video" && <Video {...this.props} />}
                {sourceType == "audio" && <Audio {...this.props} />}
            </div>,
            document.getElementById(rootDom)
        );
    }
}
