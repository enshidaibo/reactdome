const fs = (event, change) => {
    // const { value } = change;
    // let frist = value.blocks.first();
    // if (frist.type == "image" && event.key == "Enter") {
    //     console.log(2);
    //     event.preventDefault();
    //     change.moveOffsetsTo(0).insertBlock("paragraph");
    //     return true;
    // }
    if (event.which != 55 || !event.shiftKey) return;
    event.preventDefault();
    // 在当前光标位置插入 "and" 字符以更改 state。
    change.insertText("and");
    return true;
};

export default fs;