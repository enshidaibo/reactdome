import React from 'react';

import { InputNumber } from "antd";

const BaseInputNumber = ({ name, value, onBlur, onFocus, schema, uischem, onChange, ...inputProps }) => {
    const handleChange = (value) => {
        console.log(value)
        // value = value === "" ? schema.emptyValue : value
        return onChange({ [name]: value });
    };
    return <InputNumber value={value} onChange={handleChange}   {...inputProps} {...uischem.uiOptions} />
}

export default BaseInputNumber;