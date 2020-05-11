/**
 * 快捷键
 */

import { isKeyHotkey } from "is-hotkey";

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
const isCodeHotkey = isKeyHotkey("mod+`");

const hotKey = (event, change) => {
    let mark;
    if (isBoldHotkey(event)) {
        //粗体 ctrl+b
        mark = "bold";
    } else if (isItalicHotkey(event)) {
        //斜体 ctrl+i
        mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
        //下划线 ctrl+u
        mark = "underlined";
    } else if (isCodeHotkey(event)) {
        mark = "code";
    }
    if (mark) {
        event.preventDefault();
        change.toggleMark(mark);
        return true;
    } else {
        return;
    }
};

export default hotKey;