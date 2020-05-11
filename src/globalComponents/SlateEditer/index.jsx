import React, { Component, useState, useEffect, useRef } from "react";
import { Value } from "slate";
import { Editor } from "slate-react";
import Plain from "slate-plain-serializer";
import { beautifyHtml } from './serializer/beautify';
import renderNode from "./renderNode/renderNode";
import renderMark from "./renderMark/renderMark";
import schema from "./schema/schema";
import onKeyDown from "./events/onKeyDown/onKeyDown";
import dropOrPaste from "./events/dropOrPaste/dropOrPaste";
import Toolbar from "./Toolbar/index";
import initialValue from "./initialValue.json";
import toolbarstyles from "./plugins/style.scss";
import serializers from "./serializer/serializer";
const serializer = serializers({ styleAll: true });
import getImages from "./getImages";
import styles from "./styles.scss";
import useData from '@/hooks/useData';

import plugins from './plugins'

const initValue = Value.fromJSON(initialValue)
let delaytime = null
const editerChange = (text, str, images) => {
    console.log(text);
}
// uploadConfig: me:自己，all：所有
const SlateEditer = ({ value = "", mark = false, modelId, version = 0, uploadConfig = 'me', onChange = editerChange, scroll }) => {
    const toolbarEle = useRef(null);
    const codeEditerEle = useRef(null);
    let [codeEditer, setCodeEditer] = useState(null)
    const [state, setState] = useData({
        editervalue: initValue,
        text: "",
        fullscreen: false,
        edithtml: false,
        isChange: false,
        scrollEleTop: 0,
        fixedTop: false,
        toolbar: {},
    })
    let { editervalue, text, fullscreen, edithtml, fixedTop, toolbar, scrollEleTop } = state;
    const handleInitScroll = () => {
        if (scroll) {
            let scrollEle = document.getElementById(scroll)
            let scrollEleTop = scrollEle.getBoundingClientRect().top
            let toolbar = toolbarEle.current.getBoundingClientRect()
            setState({
                toolbar,
                scrollEleTop
            })
            scrollEle.onscroll = () => {
                let toolbarTop = toolbarEle.current.getBoundingClientRect().top
                setState({ fixedTop: toolbarTop <= scrollEleTop })
            }
        }
    }
    useEffect(() => {
        setTimeout(() => {
            handleInitScroll()
        }, 600);
    }, [])

    useEffect(() => {
        value = value ? serializer.deserialize(value) : initValue
        setState({ editervalue: value });
    }, [version])
    const handleToggleFullScreen = () => setState({ fullscreen: !fullscreen })
    const handleChange = ({ value }) => {
        // const text = serializer.serialize(value);
        // if (value.document != editervalue.document) {
        //     let str = Plain.serialize(value);
        //     let images = getImages(value.document.nodes);
        //     onChange && onChange(text, str, images);
        // }
        const text = '121'
        console.log(text);
        console.log(value);
        if (value.document.isEmpty) {
            let { document } = Value.fromJSON(initialValue);
            const change = value
                .change()
                .selectAll()
                .delete()
                .insertFragment(document);
            setState({ editervalue: change.value, text });
        } else {
            setState({ editervalue: value, text });
        }
    };
    const getHtmlValue = () => {
        let html = codeEditer.getValue()
        html = html.replace(/\n/g, '')
        console.log(html);
        let { document } = serializer.deserialize(html)
        const change = editervalue
            .change()
            .selectAll()
            .delete()
            .insertFragment(document);
        handleChange(change)
    }
    const setHtmlValue = () => {
        setTimeout(() => {
            if (!codeEditer) {
                codeEditer = CodeMirror.fromTextArea(codeEditerEle.current, {
                    theme: "night",
                    mode: "text/html",
                    styleActiveLine: true,
                    lineNumbers: true,
                    lineWrapping: true,
                    height: 400,
                    extraKeys: { "Ctrl": "autocomplete" }
                });
                codeEditer.on("change", () => {
                    //事件触发后执行事件
                    clearTimeout(delaytime)
                    delaytime = setTimeout(getHtmlValue, 300)
                });
                setCodeEditer(codeEditer)
            }
            let value = beautifyHtml(text)
            codeEditer.setValue(value)
        }, 10)
    }
    const handleToggleHtml = e => {
        if (edithtml) {
            setState({ edithtml: false })
        } else {
            setState({ edithtml: true })
            setHtmlValue()
        }
    }
    let toobarStyle = fixedTop ? {
        position: 'fixed',
        top: scrollEleTop,
        left: toolbar.x,
        width: toolbar.width,
    } : {}
    return (
        <div className={fullscreen ? styles.slateEditerfullscreen : styles.slateEditer}>
            <div ref={toolbarEle} style={{ height: toolbar.height }}>
                <Toolbar style={{ display: edithtml ? 'none' : 'block', ...toobarStyle }} >
                    <div
                        className={toolbarstyles.btn}
                        onClick={handleToggleHtml}
                        title={"代码编辑器"}>
                        <span className={"iconfont icon-html"} />
                    </div>
                    {plugins.pluginsRender({ value: editervalue, mark: mark, modelId: modelId, onChange: handleChange, uploadConfig: uploadConfig, text })}
                    <div
                        className={toolbarstyles.btn}
                        onClick={handleToggleFullScreen}
                        title={fullscreen ? "取消全屏" : "全屏"}
                    >
                        <span className={fullscreen ? "iconfont icon-quxiaoquanping" : "iconfont icon-full-screen"} />
                    </div>
                    {/* {plugins.pluginsRender({ value: editervalue, onChange: handleChange, orders: ['underlined', 'bold', 'italic', 'separate'] })} */}
                </Toolbar>
                <div className={styles.edithtml} style={{ display: edithtml ? 'block' : 'none' }}>
                    <Toolbar>
                        <div className={toolbarstyles.btn}
                            onClick={handleToggleHtml}
                            title={"代码编辑器"}
                        >
                            <span className={"iconfont icon-html"} />
                        </div>
                    </Toolbar>
                    <textarea rows="5" ref={codeEditerEle}></textarea>
                </div>
            </div>
            <Editor
                className={styles.editer}
                style={{ display: edithtml ? 'none' : 'block' }}
                plugins={plugins.pluginsEvent}
                schema={schema}
                spellCheck
                // autoFocus
                placeholder={<span className={styles.placeholder}>请输入内容</span>}
                value={editervalue}
                onChange={handleChange}
                renderNode={renderNode}
                renderMark={renderMark}
                onKeyDown={onKeyDown}
                onPaste={(event, change, editor) => dropOrPaste(event, change, editor, mark)}
                onDrop={(event, change, editor) => dropOrPaste(event, change, editor, mark)}
            />
        </div>
    );
}

export default SlateEditer