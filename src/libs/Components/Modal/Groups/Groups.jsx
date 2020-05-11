import React, { Component } from "react";
import styles from "./Groups.scss";
const Groups = ({ children }) => {
    return <div className={styles.groups}>{children}</div>;
};

export default Groups;
