import React, { Component } from "react";
import ImgItem from "../ImagesItem/ImgItem";
import SingleLeft from "../ImagesItem/SingleLeft";
import SingleBottom from "../ImagesItem/SingleBottom";
import MultiBottom from "../ImagesItem/MultiBottom";
import style1 from "./3.jpg";
import style4 from "./4.jpg";
import style5 from "./5.jpg";
import style6 from "./6.jpg";

import styles from "./TopicAppStyle.scss";

const TopicAppStyleMode = ({ data = {}, onChange }) => {
    let { topicAppStyle } = data;
    return (
        <div className={styles.list}>
            {topicAppStyle == 0 && (
                <SingleLeft name="titleImg" title={data.title} src={data.titleImg} onChange={onChange} />
            )}
            {topicAppStyle == 1 && (
                <SingleBottom name="titleImg" title={data.title} src={data.titleImg} onChange={onChange} />
            )}
            {topicAppStyle == 2 && <MultiBottom data={data} onChange={onChange} />}
            {topicAppStyle == 3 && <img src={style1} />}
            {topicAppStyle == 4 && <img src={style4} />}
            {topicAppStyle == 5 && <img src={style5} />}
            {topicAppStyle == 6 && <img src={style6} />}
            {topicAppStyle == 12 && <ImgItem name="titleImg" src={data.titleImg} onChange={onChange} style={{ paddingTop: '20%' }} />}
        </div>
    );
};

export default TopicAppStyleMode;
