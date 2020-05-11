import React, { Component } from "react";
import { Input } from "antd";
const { TextArea } = Input;
import styles from "./PicView.scss";

export default class PicView extends Component {
    handleChange = e => {
        let { onChange, count } = this.props;
        let value = e.target.value.trim();
        if (count && value.length > count) {
            value = value.substring(0, count);
        }
        onChange && onChange(value);
    };
    render() {
        let { data, count, ...props } = this.props;
        let countCls = styles.count;
        let length = data.description ? data.description.length : 0;
        if (count && length == count) {
            countCls = styles.countmax;
        }
        return (
            <div className={styles.preview}>
                <img className={styles.preimg} src={data.thumb || data.path} />
                <div className={styles.text}>
                    <TextArea
                        value={data.description || ""}
                        className={styles.textarea}
                        placeholder="请输入图片描述，限制长度480个字符"
                        autosize={true}
                        row={1}
                        {...props}
                        onChange={this.handleChange}
                    />
                    {count && <div className={countCls}>{`${length}/${count}`}</div>}
                </div>
            </div>
        );
    }
}
