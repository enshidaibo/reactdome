import React, { Component } from "react";
import { Select } from "antd";

import styles from "./SelectItem.scss";

const SelectItem = ({ value, children, ...rest }) => {
    value = value || value == null ? value : undefined;
    return (
        <Select
            className={styles.ls}
            placeholder="请选择"
            showArrow={true}
            showSearch
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ width: "100%" }}
            tokenSeparators={[",", " "]}
            value={value}
            {...rest}
        >
            {children}
        </Select>
    );
};

export default SelectItem;
