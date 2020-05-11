import React from "react";
import { Input } from "antd";
const { TextArea } = Input;
import styles from "./TextAreaItem.scss";

const TextAreaItem = ({ name, value = '', onChange, maxLength, ...rest }) => {
    const handleChange = e => {
        let value = e.target.value.trim();
        onChange && onChange(name, value);
    };
    let countCls = styles.count;
    if (maxLength && value.length >= maxLength) {
        value = value.substring(0, maxLength);
        countCls = styles.countmax;
    }
    return (
        <div className={styles.label}>
            <TextArea
                autosize={{ minRows: 4 }}
                value={value}
                maxLength={maxLength}
                onChange={handleChange}
                className={styles.textarea}
                {...rest}
            />
            {maxLength && <div className={countCls}>{`${value.length}/${maxLength}`}</div>}
        </div>
    );
}
export default TextAreaItem