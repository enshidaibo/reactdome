// import { getEventRange, getEventTransfer } from "slate-react";

// function pluginEvent() {
//     const onKeyDown = (event, editor, next) => {
//         const { value } = editor
//         const { selection } = value
//         console.log(event.key);
//         if (event.key === 'Escape' && selection.isExpanded) {
//             editor.moveToEnd()
//         } else if (event.key === 'Enter') {
//             editor.insertText('\n')
//         } else {
//             return
//         }
//     }
//     const onPaste = (event, editor, next) => {
//         const { value } = editor
//         const transfer = getEventTransfer(event);
//         const { type, text, files } = transfer;
//         console.log(type);
//         console.log(event);
//         console.log(next);
//         console.log(value);
//         return
//     }
//     return {
//         onKeyDown,
//         onPaste
//     };
// }

// const pluginRender = () => {
//     return <div>123</div>
// }

import addPlugins from './addPlugins'
import Bold from "./BasicTool/Bold";
import Italic from "./BasicTool/Italic";
import Underlined from "./BasicTool/Underlined";
import Images from "./Images";

const plugins = addPlugins([Bold, Italic, Underlined, Images])

export default plugins
