/**
 * 编辑表格
 * @param {*} event
 * @param {*} change
 */

const onEnter = (event) => {
    event.preventDefault();
    return true;
};

const onDelete = (event, change) => {
    const { value } = change;
    if (value.endOffset != value.startText.text.length) return;
    event.preventDefault();
    return true;
};

const onBackspace = (event, change) => {
    const { value } = change;
    if (value.startOffset != 0) return;
    event.preventDefault();
    return true;
};

const table = (event, change) => {
    const { value } = change;
    const { document, selection } = value;
    const { startKey } = selection;
    const startNode = document.getDescendant(startKey);
    if (selection.isAtStartOf(startNode)) {
        const previous = document.getPreviousText(startNode.key);
        if (!previous) {
            return;
        }
        const prevBlock = document.getClosestBlock(previous.key);
        if (prevBlock.type === "td") {
            if (["Backspace", "Delete", "Enter"].includes(event.key)) {
                event.preventDefault();
                return true;
            } else {
                return;
            }
        }
    }
    if (value.startBlock.type !== "td") {
        return;
    }
    switch (event.key) {
    case "Backspace":
        return onBackspace(event, change);
    case "Delete":
        return onDelete(event, change);
    case "Enter":
        return onEnter(event, change);
    }
    return;
};

export default table;