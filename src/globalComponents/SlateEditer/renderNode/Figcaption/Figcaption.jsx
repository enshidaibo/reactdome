import React, { Component } from "react";
import styles from "./Figcaption.scss";
export default class Figcaption extends Component {
    render() {
        const { attributes, children, isFocused } = this.props;
        let haveChildren = !children[0].props.block.getText()
        return <figcaption {...attributes} className={(haveChildren && !isFocused) ? styles.ipt : styles.iptn}>
            {children}
        </figcaption>
    }
}
