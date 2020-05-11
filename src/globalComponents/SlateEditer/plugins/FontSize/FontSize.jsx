import React, { useState } from "react";
import styles from "../style.scss";
import hstyles from "./FontSize.scss";

const H = ({ value, onChange }) => {
    const [fontSize, setFontSize] = useState(null)
    const handleChangeSize = (e, fontSize) => {
        setFontSize(fontSize)
        const change = value.change().addMark({
            type: "span",
            data: {
                style: { fontSize: fontSize }
            }
        });
        onChange(change);
    };
    const renderBlockButton = (fontSize) => {
        let style = {
            fontSize: fontSize,
            lineHeight: fontSize < 22 ? '22px' : fontSize + 'px'
        }
        return (
            <div className={hstyles.item} style={style} onMouseDown={event => handleChangeSize(event, fontSize)}>
                {fontSize}px
            </div>
        );
    };
    return (
        <div className={styles.btn + " " + hstyles.btn}>
            <span className={"iconfont icon-fontsize"} title={"字体大小"} />
            <div className={hstyles.list}>
                <div className={hstyles.inline}>
                    {renderBlockButton(32)}
                    {renderBlockButton(28)}
                    {renderBlockButton(24)}
                    {renderBlockButton(22)}
                    {renderBlockButton(20)}
                    {renderBlockButton(18)}
                    {renderBlockButton(16)}
                    {renderBlockButton(14)}
                    {renderBlockButton(12)}
                </div>
            </div>
        </div>
    );
}

export default {
    name: 'fontSize',
    pluginRender: H
}