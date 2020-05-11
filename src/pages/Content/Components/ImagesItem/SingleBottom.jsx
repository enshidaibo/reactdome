import React, { Component } from "react";
import ImgItem from "./ImgItem";
import styles from "./SingleBottom.scss";

const SingleBottom = ({ title, showTitle = true, ...props }) => {
    return (
        <div>
            {showTitle && <div className={styles.title}>{title || "这儿将显示标题"}</div>}
            <ImgItem {...props} />
        </div>
    );
};

export default SingleBottom;
