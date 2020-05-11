const MarkHotkey = options => {
    const { type, code, isAltKey = false } = options;
    console.log(111);
    return {
        onKeyDown(event, data, change) {
            console.log(event.which);
            //  若按下的键不是 shift + "7" 则不返回 change。
            if (event.which != 55 || !event.shiftKey) return;
            // 阻止插入 "&" 至编辑内容的行为。
            event.preventDefault();
            // 在当前光标位置插入 "and" 字符以更改 state。
            change.insertText("and");
            return true;
        }
    };
};

export default MarkHotkey;
