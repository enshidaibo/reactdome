import React, { Component } from "react";

import renderMarkHighLight from "./renderMarkHighLight";
import renderMarkSpan from "./renderMarkSpan";

const renderMark = props => {
    const { children, mark, attributes } = props;
    let style = mark.data.get("style");
    switch (mark.type) {
        case "bold":
            return <strong {...attributes}>{children}</strong>;
        case "code":
            return <code {...attributes}>{children}</code>;
        case "italic":
            return <em {...attributes}>{children}</em>;
        case "underlined":
            return <u {...attributes}>{children}</u>;
        case "highlight":
            return renderMarkHighLight(children, attributes);
        case "span":
            return renderMarkSpan(children, attributes, style);
    }
};

export default renderMark;
