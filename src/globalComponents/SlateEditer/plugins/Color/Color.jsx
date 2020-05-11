import React, { useState } from "react";
import { SketchPicker } from "react-color";
import styles from "../style.scss";
import hstyles from "./Color.scss";

const presetColors = ['#D0021B', '#F5A623', '#F8E71C',
    '#8B572A', '#7ED321', '#417505',
    '#BD10E0', '#9013FE', '#4A90E2',
    '#50E3C2', '#B8E986', '#000000',
    '#4A4A4A', '#9B9B9B', '#FFFFFF',
    '#0000ff']

const Color = ({ value, onChange }) => {
    const [color, setColor] = useState('#000')
    const handleClick = event => {
        event.preventDefault();
    };
    const handleChangeColor = color => {
        setColor(color.hex)
        const change = value.change().addMark({
            type: "span",
            data: {
                style: { color: color.hex }
            }
        });
        onChange(change);
    };
    return (
        <div className={styles.btn + " " + hstyles.btn}>
            <span className={"iconfont icon-yanse"} title={"字体颜色"} />
            <div className={hstyles.list} onClick={handleClick}>
                <SketchPicker className={hstyles.picker} color={color} presetColors={presetColors} onChangeComplete={handleChangeColor} />
            </div>
        </div>
    );
}

export default {
    name: 'color',
    pluginRender: Color
}