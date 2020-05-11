import React from 'react';
import { Input } from "antd";

const BaseInput = ({ name, value, onBlur, onFocus, schema, uischem, onChange, ...inputProps }) => {
    const handleChange = ({ target: { value } }) => {
        value = value === "" ? schema.emptyValue : value
        return onChange({ [name]: value });
    };
    let { allowClear, disabled, ...otherOptions } = uischem.uiOptions || {}
    let uiOptions = {
        ...otherOptions,
        disabled: disabled,
        allowClear: disabled ? false : allowClear
    }
    return <Input value={value} onChange={handleChange}   {...inputProps} {...uiOptions} formNoValidate={true} />
}

export default BaseInput;