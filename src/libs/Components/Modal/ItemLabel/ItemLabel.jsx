import React, { Component } from "react";
import styles from "./ItemLabel.scss";

const ItemLabel = ({ title, children }) => {
    return (
        <div className={styles.label}>
            {title && <span className={styles.lbt}>{title}</span>}
            <div className={styles.ipt}>{children}</div>
        </div>
    );
};

export default ItemLabel;
