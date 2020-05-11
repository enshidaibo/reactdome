import React, { Component } from "react";
import { Select } from "antd";
const Option = Select.Option;
import SelectItem from "../SelectItem/SelectItem";
import styles from "../Edit.scss";

import { getOrgsData } from "@/services/content";
export default class SelectIOrgs extends Component {
    state = {
        orgs: []
    };
    componentDidMount() {
        this.getOrgsData();
    }
    /**
     * 获取机构数据
     */
    getOrgsData = async () => {
        let res = await getOrgsData();
        if (res.success) {
            this.setState({
                orgs: res.body
            });
        }
    };
    render() {
        let { name, value, onChange } = this.props;
        let { orgs } = this.state;
        return (
            <div className={styles.time}>
                <span className={styles.t}>相关机构</span>
                <SelectItem
                    className={styles.st}
                    mode="multiple"
                    value={value}
                    placeholder="请选择"
                    onChange={value => onChange(name, value)}
                >
                    {orgs.map(d => {
                        return (
                            <Option key={d.value} value={String(d.value)}>
                                {d.name}
                            </Option>
                        );
                    })}
                </SelectItem>
            </div>
        );
    }
}
