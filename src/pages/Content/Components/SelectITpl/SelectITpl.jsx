import React, { useState, useEffect } from "react";
import { Select } from "antd";
const Option = Select.Option;
import { getTplData } from "@/services/content";
import SelectItem from "../SelectItem/SelectItem";
import styles from "../Edit.scss";

const SelectITpl = ({ form, onChange }) => {
    const [model_list, setList] = useState({})
    const getData = async () => {
        let res = await getTplData();
        if (res.success) {
            setList(res.body);
        }
    }
    useEffect(() => { getData() }, [])
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
export default SelectITpl