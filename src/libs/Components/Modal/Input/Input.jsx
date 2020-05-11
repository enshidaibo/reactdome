import React, { Component } from "react";
import ItemLabel from "../ItemLabel/ItemLabel";

import styles from "./Input.scss";

const Input = ({ title, name, value = "", onChange, children, ...props }) => {
    return (
        <ItemLabel title={title}>
            <input
                className={styles.ipt}
                type="text"
                {...props}
                value={value}
                onChange={e => onChange(name, e.target.value)}
            />
        </ItemLabel>
    );
};

export default Input;
