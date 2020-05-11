import React, { Component, useState } from "react";
import { Popconfirm } from "antd";
import { SketchPicker } from "react-color";
import styles from "./ColorPicker.scss";

const ColorPicker = ({ color, onChange }) => {
    const [newcolor, setColor] = useState(null)
    const confirm = e => {
        onChange("titleColor", newcolor);
    };
    const cancel = e => {
        setColor(null)
    };
    const handleChangeComplete = color => {
        setColor(color.hex)
    };
    color = newcolor || color || "#000";
    return (
        <Popconfirm
            title={
                <div>
                    请选择颜色
                    <SketchPicker
                        color={color}
                        className={styles.SketchPicker}
                        onChangeComplete={handleChangeComplete}
                    />
                </div>
            }
            onConfirm={confirm}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
        >
            <div className={styles.Popconfirm} style={{ background: color }} />
        </Popconfirm>
    );
}

export default ColorPicker