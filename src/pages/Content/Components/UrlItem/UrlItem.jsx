import React, { Component } from "react";

import styles from "./UrlItem.scss";

const UrlItem = ({ value = "", ...props }) => {
    return (
        <div className={styles.UrlItem}>
            <i className={"iconfont icon-link " + styles.icon} />
            <input type="text" className={styles.ipt} placeholder="URL地址" {...props} value={value} />
            <i
                className={"iconfont icon-jiantou " + styles.icon2}
                onClick={() => {
                    if (value.length > 0) {
                        window.open(value);
                    }
                }}
            />
        </div>
    );
};

export default UrlItem;
