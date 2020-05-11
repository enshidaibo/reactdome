import React, { Component } from "react";
import { message, Select } from "antd";
const Option = Select.Option;
import SelectItem from "../SelectItem/SelectItem";
import styles from "../Edit.scss";
import { getLeaderData } from "@/services/content";

export default class SelectLeader extends Component {
    state = {
        leader: []
    };
    componentDidMount() {
        this.getLeaderData();
    }
    /**
     * 获取领导数据
     */
    getLeaderData = async () => {
        let res = await getLeaderData();
        if (res.success) {
            this.setState({
                leader: res.body
            });
        }
    };
    render() {
        let { name, value, onChange } = this.props;
        let { leader } = this.state;
        return (
            <div className={styles.time}>
                <span className={styles.t}>相关领导</span>
                <SelectItem
                    className={styles.st}
                    mode="multiple"
                    value={value}
                    placeholder="请选择"
                    onChange={value => onChange(name, value)}
                >
                    {leader.map(d => {
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
