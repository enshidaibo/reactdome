import React, { useState, useEffect, useRef } from "react";
import { Value } from "slate";
import { Editor } from "slate-react";
import Plain from "slate-plain-serializer";
import useData from '@/hooks/useData';
import renderNode from "./renderNode/renderNode";
import renderMark from "./renderMark/renderMark";
import schema from "./schema/schema";
import initialValue from "./initialValue.json";
const initValue = Value.fromJSON(initialValue)

import serializers from "./serializer/serializer";
const serializer = serializers({ styleAll: true });
import getImages from "./getImages";
import styles from "./styles.scss";

import plugins from './plugins'
const SlateEditer = ({ value = "", version = 0, onChange }) => {
    const [state, setState] = useData({
        editervalue: initValue,
        text: "",
        fullscreen: false,
        isChange: false,
        scrollEleTop: 0,
        fixedTop: false,
        toolbar: {},
    })
    let { editervalue, text } = state;
    useEffect(() => {
        value = value ? serializer.deserialize(value) : initValue
        setState({ editervalue: value });
    }, [version])
    const handleChange = ({ value }) => {
        const text = serializer.serialize(value);
        if (value.document != editervalue.document) {
            let str = Plain.serialize(value);
            let images = getImages(value.document.nodes);
            onChange && onChange(text, str, images);
        }
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
    return <div className={styles.slateEditer}>
        <div>
            {plugins.pluginsRender({ value: editervalue, onChange: handleChange })}
        </div>
        <Editor
            className={styles.editer}
            schema={schema}
            spellCheck
            plugins={plugins.pluginsEvent}
            // autoFocus
            placeholder={<span className={styles.placeholder}>请输入内容</span>}
            value={editervalue}
            onChange={handleChange}
            renderNode={renderNode}
            renderMark={renderMark}
        />
    </div>
}


export default SlateEditer