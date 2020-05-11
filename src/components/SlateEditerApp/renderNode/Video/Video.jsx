import React, { Component } from "react";
import styles from "./Video.scss";
export default class Video extends Component {
    render() {
        let { node, isFocused, attributes, isSelected } = this.props;
        let data = node.data.toJSON();
        let { src, poster, title, width } = data;
        return  <video className={isFocused ? styles.videoFocused : styles.video} src={src} controls poster={poster} preload='meta' />
    }
}
