/**
 * 一键排版
 */
import React from "react";
import serializers from "../../serializer/serializer";
import styles from "../style.scss";

const pluginRender = ({ value, text, onChange }) => {
    const handleClick = () => {
        const initserializer = serializers({ style: {} });
        // text = text.replace('<p></p>', '')
        // text = text.replace(/<p><\/p>/g, '')
        // text = text.replace(/^<p>\ +/g, '')
        // text = text.replace('<figure></figure>', '')
        const { document } = initserializer.deserialize(text);
        const change = value
            .change()
            .selectAll()
            .delete()
            .insertFragment(document);
        onChange(change);
    };
    return (
        <div onClick={handleClick} className={styles.btn}>
            <span className={"iconfont icon-paiban"} title={"一键排版"} />
        </div>
    );
}

export default {
    name: 'format',
    pluginRender
}