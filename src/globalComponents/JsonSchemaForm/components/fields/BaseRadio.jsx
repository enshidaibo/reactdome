import React from 'react';
import { Radio } from 'antd';

import useGetArrayData from "../../hooks/useGetArrayData";
const BaseRadio = ({ name, value, onChange, uischem = {}, ...props }) => {
    let data = useGetArrayData(uischem)
    const handleChange = ({ target: { value } }) => {
        // value = value === "" ? schema.emptyValue : value
        onChange({ [name]: value });
    };
    return <Radio.Group onChange={handleChange} value={value}>
        {data.map(d => {
            return <Radio key={d.value} value={d.value}>{d.title}</Radio>
        })}
    </Radio.Group>
}

export default BaseRadio