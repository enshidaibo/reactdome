import React, { Component } from "react";

import Images from "./Images/Images";
import Video from "./Video/Video";
import Audio from "./Audio/Audio";
import Iframe from "./Iframe/Iframe";
import Figcaption from './Figcaption/Figcaption'
const renderNode = props => {
    const { attributes, children, node } = props;
    let style = node.data.get("style");
    switch (node.type) {
        case "quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "blockquote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "h1":
            return <h1 {...attributes}>{children}</h1>;
        case "h2":
            return <h2 {...attributes}>{children}</h2>;
        case "h3":
            return <h3 {...attributes}>{children}</h3>;
        case "h4":
            return <h4 {...attributes}>{children}</h4>;
        case "h5":
            return <h5 {...attributes}>{children}</h5>;
        case "h6":
            return <h6 {...attributes}>{children}</h6>;
        case "ul":
            return <ul {...attributes}>{children}</ul>;
        case "ol":
            return <ol {...attributes}>{children}</ol>;
        case "li":
            return <li {...attributes}>{children}</li>;
        case "table":
            return <table {...attributes}>{children}</table>;
        case "tbody":
            return <tbody {...attributes}>{children}</tbody>;
        case "tr":
            return <tr {...attributes}>{children}</tr>;
        case "th":
            return <th {...attributes}>{children}</th>;
        case "td":
            return <td {...attributes}>{children}</td>;
        case "pre":
            return (
                <pre>
                    <code {...attributes}>{children}</code>
                </pre>
            );
        case "link": {
            const href = node.data.get("href");
            return (
                <a style={style} {...attributes} href={href}>
                    {children}
                </a>
            );
        }
        case "figure":
            return (
                <figure style={style} {...attributes}>
                    {children}
                </figure>
            );
        // case "figcaption":
        //     //     console.log(children[0].props);
        //     //     console.log(children[0].props.block.getText());
        //     return <figcaption style={style} {...attributes}>
        //         {children}
        //     </figcaption>
        case "figcaption":
            return <Figcaption {...props} />
        case "image":
            return <Images {...props} />;
        case "video":
            return <Video {...props} />;
        case "audio":
            return <Audio {...props} />;
        case "iframe":
            return <Iframe {...props}></Iframe>;
        case "section":
            return (
                <section style={style} {...attributes}>
                    {children}
                </section>
            );
        case "paragraph":
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            );
    }
};
export default renderNode;
