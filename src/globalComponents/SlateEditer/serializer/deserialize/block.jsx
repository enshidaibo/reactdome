import { BLOCK_TAGS } from "../TAGS";
import { getBlockAttr, setBlockAttr } from "./function/getBlockAttr";
const block = blockAttr => {
    return {
        deserialize(el, next) {
            const block = BLOCK_TAGS[el.tagName.toLowerCase()];
            if (block) {
                if (block == 'paragraph' && el.childNodes.length == 0) {
                    return null
                }
                let data = getBlockAttr(el, blockAttr);
                // if (block == 'section') {
                //     return next(el.childNodes)
                // }
                return {
                    object: "block",
                    type: block,
                    data: data,
                    nodes: next(el.childNodes)
                };
            }
            if (el.tagName.toLowerCase() == 'br') {
                return null
            }
        },
        serialize(object, children) {
            if (object.object != "block") return;
            let attr = setBlockAttr(object, blockAttr);
            switch (object.type) {
                case "paragraph":
                    return <p {...attr}>{children}</p>;
                case "section":
                    return <section {...attr}>{children}</section>;
                case "blockquote":
                    return <blockquote>{children}</blockquote>;
                case "h1":
                    return <h1>{children}</h1>;
                case "h2":
                    return <h2>{children}</h2>;
                case "h3":
                    return <h3>{children}</h3>;
                case "h4":
                    return <h4>{children}</h4>;
                case "h5":
                    return <h5>{children}</h5>;
                case "h6":
                    return <h6>{children}</h6>;
                case "ul":
                    return <ul>{children}</ul>;
                case "ol":
                    return <ol>{children}</ol>;
                case "li":
                    return <li>{children}</li>;
                case "pre":
                    return (
                        <pre>
                            <code>{children}</code>
                        </pre>
                    );
                case "table":
                    return <table>{children}</table>;
                case "tbody":
                    return <tbody>{children}</tbody>;
                case "tr":
                    return <tr>{children}</tr>;
                case "th":
                    return <th>{children}</th>;
                case "td":
                    return <td>{children}</td>;
                case "figure":
                    return <figure {...attr}>{children}</figure>;
                case "figcaption":
                    if (object.isEmpty === true) {
                        return null;
                    }
                    return <figcaption {...attr}>{children}</figcaption>;
            }
        }
    };
};

export default block;
