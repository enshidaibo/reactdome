import React, { Component } from "react";
import ImgItem from "./ImgItem";
import styles from "./styles.scss";

const SinglePicture = ({ style = {}, ...props }) => {
    return (
        <div className={styles.single} style={style}>
            <ImgItem {...props} />
        </div>
    );
};

export default SinglePicture;
