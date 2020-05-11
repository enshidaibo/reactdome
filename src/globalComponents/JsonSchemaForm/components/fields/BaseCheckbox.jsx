import React, { Component } from 'react';
import { Checkbox } from 'antd';
import useGetArrayData from "../../hooks/useGetArrayData";

const BaseCheckbox = ({ name, value, onChange, uischem = {}, ...props }) => {
    let data = useGetArrayData(uischem)
    const handleChange = (value) => {
        onChange({ [name]: value });
    };
    return <Checkbox.Group value={value} onChange={handleChange}>
        {data.map(d => {
            return <Checkbox key={d.value} value={d.value}>{d.title}</Checkbox>
        })}
    </Checkbox.Group>
}

export default BaseCheckbox;