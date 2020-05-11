import React, { Component } from "react";
import ImgItem from "./ImgItem";
import styles from "./SingleLeft.scss";

const SingleLeft = ({ title, ...props }) => {
    return (
        <div className={styles.singleleft}>
            <div className={styles.title}>{title || "这儿将显示标题"}</div>
            <div className={styles.leftimg}>
                <ImgItem {...props} />
            </div>
        </div>
    );
};

export default SingleLeft;
