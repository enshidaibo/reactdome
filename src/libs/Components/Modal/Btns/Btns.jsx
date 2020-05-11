import React, { Component } from "react";
import styles from "./Btns.scss";

const Btns = ({ children }) => {
    return <div className={styles.btns}>{children}</div>;
};

export default Btns;
