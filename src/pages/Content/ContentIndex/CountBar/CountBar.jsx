import React, { Component } from "react";
import styles from "./CountBar.scss";

const CountBar = ({ getListData, data }) => {
    return (
        <div className={styles.countbox}>
            <div className={styles.detail} onClick={() => getListData({ cid: 0, queryStatus: "checked" })}>
                <i className={`iconfont icon-hasbeensent ${styles.icon}`} />
                <div className={styles.view}>
                    <div className={styles.title}>终审</div>
                    <div className={styles.num}>{data.checked || 0}</div>
                </div>
            </div>
            <div className={styles.detail} onClick={() => getListData({ cid: 0, queryStatus: "prepared" })}>
                <i className={`iconfont icon-daishenhe ${styles.icon}`} />
                <div className={styles.view}>
                    <div className={styles.title}>待审</div>
                    <div className={styles.num}>{data.prepared || 0}</div>
                </div>
            </div>
        </div>
    );
};
export default CountBar;
