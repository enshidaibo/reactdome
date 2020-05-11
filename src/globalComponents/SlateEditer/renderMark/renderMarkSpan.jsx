import React, { Component } from "react";

const renderMarkSpanChild = (children, styles = {}) => {
    const { props } = children;
    let { style = {} } = props;
    style = {
        ...style,
        ...styles
    };
    return React.cloneElement(children, { style });
};

const renderMarkSpan = (children, attributes, style) => {
    if (children.type == "span") {
        return renderMarkSpanChild(children, style);
    }
    return (
        <span style={style} {...attributes}>
            {children}
        </span>
    );
};

export default renderMarkSpan;
