import React, { Component } from "react";

const styles = {
    backgroundColor: "#000",
    color: "#fff"
};
const renderMarkHighLight = (children, attributes) => {
    let { props } = children;
    if (props) {
        let { style = {} } = props;
        style = {
            ...style,
            ...styles
        };
        return React.cloneElement(children, {
            ...attributes,
            style
        });
    }
    return (
        <span {...attributes} style={styles}>
            {children}
        </span>
    );
};

export default renderMarkHighLight;
