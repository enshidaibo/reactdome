import React, { Component } from 'react';
import { Switch } from 'antd';

const BaseSwitch = ({ name, value, disabled, onBlur, onFocus, schema, uischem, onChange, ...inputProps }) => {
    const handleChange = (checked) => {
        console.log(`switch to ${checked}`);
        // let { type } = schema
        // value = value === "" ? schema.emptyValue : value
        onChange({ [name]: checked });
    };
    return <Switch checked={value} onChange={handleChange} />
}

export default BaseSwitch;