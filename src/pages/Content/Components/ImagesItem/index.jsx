import React from "react";
import { Radio } from "antd";
const RadioGroup = Radio.Group;

import SingleLeft from "./SingleLeft";
import SingleBottom from "./SingleBottom";
import MultiBottom from "./MultiBottom";

import styles from "./styles.scss";

const ImagesItem = ({ data, onChange }) => {
    let { mode, titleImg, title } = data;
    const handleChangeImageMode = e => {
        onChange("mode", e.target.value);
    };
    return (
        <div className={styles.images}>
            {mode == 0 && <SingleLeft name="titleImg" title={title} src={titleImg} onChange={onChange} />}
            {mode == 1 && <SingleBottom name="titleImg" title={title} src={titleImg} onChange={onChange} />}
            {mode == 2 && <MultiBottom data={data} onChange={onChange} />}
            <RadioGroup onChange={handleChangeImageMode} value={mode}>
                <Radio value={0}>单图</Radio>
                <Radio value={1}>大图</Radio>
                <Radio value={2}>三图</Radio>
                <Radio value={3}>无图</Radio>
            </RadioGroup>
        </div>
    );
}

export default ImagesItem