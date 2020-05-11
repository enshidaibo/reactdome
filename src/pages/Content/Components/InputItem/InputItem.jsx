import React from "react";
import { Input } from "antd";
import styles from "./InputItem.scss";

const InputItem = ({ name, value = '', count, onChange, error, errorMessage, ...rest }) => {
    const handleChange = e => {
        // let value = e.target.value.trim();
        // if (count && value.length > count) {
        //     value = value.substring(0, count);
        // }
        onChange && onChange(name, e.target.value);
    }
    const handleBlur = e => {
        let value = e.target.value.trim();
        if (count && value.length > count) {
            value = value.substring(0, count);
        }
        onChange && onChange(name, value);
    }
    let countCls = styles.count;
    if (count && value.length == count) {
        countCls = styles.countmax;
    }
    return (
        <div className={styles.label}>
            <Input
                className={error ? styles.error : styles.input}
                {...rest}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {count && <div className={countCls}>{`${value.length}/${count}`}</div>}
        </div>
    );
}

export default InputItem