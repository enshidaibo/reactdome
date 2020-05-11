import React, { Component } from "react";
import styles from "./Iframe.scss";
export default class Iframe extends Component {
    onClick = e => {
        e.stopPropagation()
    }
    onChange = e => {
        const src = e.target.value
        const { node, editor } = this.props
        editor.change(c => c.setNodeByKey(node.key, { data: { src } }))
    }
    render() {
        let { node, isFocused, attributes, isSelected } = this.props;
        const src = node.data.get('src')
        return <div className={styles.iframe}>
            {/* {!isSelected && <div className={styles.maskStyle}></div>} */}
            <iframe src={src} />
            <input onClick={this.onClick} onChange={this.onChange} value={src} className={styles.input} type="text" />
        </div>
    }
}
