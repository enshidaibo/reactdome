/**
 * On key down, if it's a formatting command toggle a mark.
 *
 * @param {Event} event
 * @param {Change} change
 * @return {Change}
 */
import hotKey from "./hotKey";
import table from "./table";
import fs from "./fs";
// import figcaption from "./figcaption";
// import image from "./image";

const keys = [hotKey, fs, table];
const onKeyDown = (event, change, editor) => {
    let funcback = keys.some(f => {
        return f(event, change, editor);
    });
    if (funcback) {
        return true;
    }
    return;
};

export default onKeyDown;