import React, { Component } from "react";
import styles from "./Images.scss";
export default class Images extends Component {
    componentDidMount() {
        let { node, editor } = this.props;
        if (node.data.get("server") == "false") {
            let data = node.data.toJSON();
            data.title = data.title + "(还未上传)";
            editor.change(c => c.setNodeByKey(node.key, { data }));
        }
    }
    render() {
        let { node, isFocused, attributes, isSelected } = this.props;
        let data = node.data.toJSON();
        let { src, title, width, style, className, infigure } = data;
        return <img
            width={width}
            title={title}
            src={src}
            className={isSelected ? styles.imgFocused : styles.img}
            {...attributes}
        />
        if (infigure) {
            return <img
                width={width}
                title={title}
                src={src}
                className={isFocused ? styles.imgFocused : styles.img}
                {...attributes}
            />
        }
        return (
            <figure className={className} style={{ ...style, position: "relative" }}>
                <img
                    width={width}
                    title={title}
                    src={src}
                    className={isFocused ? styles.imgFocused : styles.img}
                    {...attributes}
                />
                <figcaption></figcaption>
                {/* {isSelected && <Input {...this.props} data={data} />} */}
            </figure>
        );
    }
}
class Input extends Component {
    handleChange = (name, e) => {
        const value = e.target.value;
        const { node, editor, data } = this.props;
        data[name] = value;
        editor.change(c => c.setNodeByKey(node.key, { data }));
    };
    handleClick = e => {
        e.stopPropagation();
    };
    render() {
        const { data } = this.props;
        let { src, title, width } = data;
        return (
            <div className={styles.ipts} onClick={this.handleClick}>
                <input className={styles.ipt} value={src} onChange={e => this.handleChange("src", e)} />
                <input className={styles.ipt} value={title} onChange={e => this.handleChange("title", e)} />
                <input className={styles.ipt} value={width} onChange={e => this.handleChange("width", e)} />
            </div>
        );
    }
}
