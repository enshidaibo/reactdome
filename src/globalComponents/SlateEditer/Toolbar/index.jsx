import React from "react";
// import H from "../plugins/H/H";
import styles from "./Toolbar.scss";

const Toolbar = ({ children, ...rest }) => {
    return (
        <div className={styles.toolbar}  {...rest}>
            {children}
            <div className="clear"></div>
        </div>
    );
}

export default Toolbar