import React, { Component } from "react";
import { Radio } from "antd";
const RadioGroup = Radio.Group;
/**
 * 0:专栏单图左，1：专栏单图下，2：专栏三图，3：列表；4：大图滑动；5：幻灯片；6一行两列
 */
import TopicAppStyleMode from "./TopicAppStyleMode";
import styles from "./TopicAppStyle.scss";

export default class TopicAppStyle extends Component {
    render() {
        let { data, onChange } = this.props;
        let { topicAppStyle } = data;
        return (
            <div className={styles.box}>
                <RadioGroup onChange={e => onChange("topicAppStyle", e.target.value)} value={topicAppStyle}>
                    <Radio value={0}>单图</Radio>
                    <Radio value={1}>大图</Radio>
                    <Radio value={2}>三图</Radio>
                    <Radio value={3}>列表</Radio>
                    <Radio value={4}>大图滑动</Radio>
                    <Radio value={5}>幻灯片</Radio>
                    <Radio value={6}>一行两列</Radio>
                    <Radio value={12}>长图固定</Radio>
                    <Radio value={11}>长图滑动</Radio>
                    <Radio value={13}>上下滑动</Radio>
                </RadioGroup>
                <TopicAppStyleMode data={data} onChange={onChange} />
            </div>
        );
    }
}
