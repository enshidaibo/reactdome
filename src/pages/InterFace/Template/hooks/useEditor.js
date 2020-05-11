/* global CodeMirror */
import { useState, useEffect, useRef } from "react";

const useEditor = () => {
    const editEl = useRef(null);
    const [editor, setEditer] = useState()
    useEffect(() => {
        let editors = CodeMirror.fromTextArea(editEl.current, {
            theme: "night",
            mode: "text/html",
            styleActiveLine: true,
            lineNumbers: true,
            lineWrapping: true,
            height: 400,
            extraKeys: { "Ctrl": "autocomplete" }
        })
        setEditer(editors)
    }, [])
    return [editEl, editor]
}

export default useEditor