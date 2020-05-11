import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const textArea = ({ name, value, schema, uischem, onChange, ...inputProps }) => {
    const handleChange = ({ target: { value } }) => {
        value = value === "" ? schema.emptyValue : value
        onChange({ [name]: value });
    };
    let { allowClear, ...uiOptions } = uischem.uiOptions || {}
    return <TextArea rows={4} value={value} onChange={handleChange} {...inputProps} {...uiOptions} />
}

export default textArea;