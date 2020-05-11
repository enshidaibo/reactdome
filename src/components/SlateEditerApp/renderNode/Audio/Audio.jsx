import React, { Component } from "react";
import styles from "./Audio.scss";
export default class Audio extends Component {
    render() {
        let { node, isFocused, attributes, isSelected } = this.props;
        let data = node.data.toJSON();
        let { src, title, width } = data;
        return <audio className={isFocused ? styles.videoFocused : styles.video} src={src} controls />;
    }
}
