/**
 * Serializer rules.
 *
 * @type {Array}
 */
import Html from "slate-html-serializer";
import block from "./deserialize/block";
import figure from "./deserialize/block-figure";
import image from "./deserialize/block-image";
import video from "./deserialize/block-video";
import audio from "./deserialize/block-audio";
import iframe from "./deserialize/block-iframe";
import link from "./deserialize/inline-link";
import mark from "./deserialize/mark";
import span from "./deserialize/mark-span";
// const serializer = new Html({ rules: RULES });
import INIT_STYLES_TAGS from "./deserialize/function/INIT_STYLES_TAGS";

const blockAttrs = {
    style: INIT_STYLES_TAGS,
    styleAll: false,
    class: true,
};
const serializer = (blockAttr = blockAttrs) => {
    const RULES = [
        block(blockAttr),
        figure(blockAttr),
        image,
        video,
        audio,
        iframe,
        link,
        mark(blockAttr),
        span(blockAttr)
    ];
    return new Html({ rules: RULES });
};

export default serializer;