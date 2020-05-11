import React, { Component } from "react";
import { Icon } from "antd";
import styles from "./Warpper.scss";
const Warpper = ({ title, children, onClick }) => {
    return (
        <div className={styles.warpper}>
            <div className={styles.title}>
                <span>{title}</span>
                <Icon type="close" className={styles.close} onClick={onClick} />
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default Warpper;
