import React, { Component } from "react";
import { message, Select } from "antd";
const Option = Select.Option;
import { getTplData } from "@/services/content";

import SelectItem from "../SelectItem/SelectItem";
import styles from "../Edit.scss";
export default class SelectITpl extends Component {
    state = {
        model_list: []
    };
    componentDidMount() {
        this.getTplData();
    }
    /**
     * 获取模板数据
     */
    getTplData = async () => {
        let res = await getTplData({ modelId: this.props.form.modelId });
        if (res.success) {
            this.setState({
                model_list: res.body
            });
        }
    };
    render() {
        let { form, onChange } = this.props;
        let { model_list } = this.state;
        return [
            <div className={styles.time} key="tplContent">
                <span className={styles.t}>PC端模板</span>
                <SelectItem
                    className={styles.st}
                    value={form.tplContent || null}
                    onChange={value => onChange("tplContent", value)}
                >
                    <Option value={null}>默认</Option>
                    {model_list.contentTpl &&
                        model_list.contentTpl.map(d => {
                            return (
                                <Option key={d} value={d}>
                                    {d}
                                </Option>
                            );
                        })}
                </SelectItem>
            </div>,
            <div className={styles.time} key="tplMobileContent">
                <span className={styles.t}>手机端模板</span>
                <SelectItem
                    className={styles.st}
                    value={form.tplMobileContent || null}
                    onChange={value => onChange("tplMobileContent", value)}
                >
                    <Option value={null}>默认</Option>
                    {model_list.contentMobileTpl &&
                        model_list.contentMobileTpl.map(d => {
                            return (
                                <Option key={d} value={d}>
                                    {d}
                                </Option>
                            );
                        })}
                </SelectItem>
            </div>
        ];
    }
}
