import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const BaseDatePicker = ({ name, value, onChange, uischem = {}, ...props }) => {
    function handleChange(date, dateString) {
        console.log(date, dateString);
        onChange({ [name]: dateString });
    }
    props = {
        ...props,
        ...uischem.uiOptions,
        value: moment(value),
        onChange: handleChange
    }
    let Cpt = DatePicker
    if (uischem.uiTypeExt && DatePicker[uischem.uiTypeExt]) {
        console.log(DatePicker[uischem.uiTypeExt])
        Cpt = DatePicker[uischem.uiTypeExt]
    }
    return <Cpt  {...props} />
}

export default BaseDatePicker;