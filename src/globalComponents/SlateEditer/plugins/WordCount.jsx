// const WordCount = options => {
//     return {
//         renderEditor(props) {
//             return [props.children, <div>Word Count: {props.value.document.text.length}</div>];

//             // return (
//             //     <div>
//             //         <div>{props.children}</div>
//             //         <div>Word Count: {props.value.document.text.length}</div>
//             //     </div>
//             // );
//         }
//     };
// };
// export default WordCount;

function NoEmpty() {
    const onKeyDown = (event, editor, next) => {
        const { value } = editor
        const { selection } = value
        if (event.key === 'Escape' && selection.isExpanded) {
            editor.moveToEnd()
        } else if (event.key === 'Enter') {
            editor.insertText('\n')
        } else {
            return
        }
    }
    return {
        onKeyDown
    };
}

export default NoEmpty;
