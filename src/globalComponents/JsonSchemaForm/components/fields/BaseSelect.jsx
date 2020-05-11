import React from 'react';
import { Select } from 'antd';
import useGetArrayData from "../../hooks/useGetArrayData";

const { Option } = Select;

const BaseSelect = ({ name, value, title, type, error, onChange, uischem = {}, ...props }) => {
    let data = useGetArrayData(uischem)
    const handleChange = (value) => {
        onChange({ [name]: value });
    };

    return <Select value={value} onChange={handleChange} {...props} {...uischem.uiOptions}>
        <Option value={type == 'string' ? '' : 0}>默认</Option>
        {data.map(d => {
            return <Option key={d.value} value={type == 'string' ? String(d.value) : parseInt(d.value)}>{d.title}</Option>
        })}
    </Select>
}
export default BaseSelect;