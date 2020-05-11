/**
 * 选择工作流
 */
import React, { useState, useEffect } from "react";
import { Select } from "antd";
const Option = Select.Option;
import { getWorkflowList } from "../services";

const SelectlWorkFlow = ({ name, value = '', onChange }) => {
    const [list, setList] = useState([])
    useEffect(() => {
        const getData = async () => {
            let res = await getWorkflowList();
            if (res.success) {
                setList(res.body);
            }
        }
        getData()
    }, [])
    return <Select
        placeholder="请选择"
        showArrow={true}
        showSearch
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        style={{ width: "400px" }}
        tokenSeparators={[",", " "]}
        value={value}
        onChange={value => onChange(name, value)}
    >
        <Option value={''}>默认</Option>
        {list.map(d => <Option key={d.id} value={d.id}>{d.name}</Option>)}
    </Select>
}

export default SelectlWorkFlow
