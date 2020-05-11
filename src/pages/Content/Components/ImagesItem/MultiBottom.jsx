import React, { Component } from "react";
import MultiPicture from "./MultiPicture";
import styles from "./SingleBottom.scss";

const MultiBottom = ({ data, showTitle = true, onChange }) => {
    return (
        <div>
            {showTitle && <div className={styles.title}>{data.title || "这儿将显示标题"}</div>}
            <MultiPicture data={data} onChange={onChange} />
        </div>
    );
};

export default MultiBottom;
