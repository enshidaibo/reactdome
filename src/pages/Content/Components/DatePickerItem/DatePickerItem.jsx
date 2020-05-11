import React, { Component } from "react";
import { DatePicker } from "antd";
import moment from "moment";

export default class DatePickerItem extends Component {
    static defaultProps = {
        isInit: false
    };
    handleChangeTime = value => {
        let d = moment(value).format("YYYY-MM-DD HH:mm:ss");
        let { name, onChange } = this.props;
        onChange(name, d);
    };
    render() {
        let { value, isInit, ...rest } = this.props;
        value = value && value.length > 0 ? moment(value) : isInit ? moment() : null;
        return (
            <DatePicker
                showTime
                allowClear={false}
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择时间"
                {...rest}
                defaultValue={value}
                onChange={this.handleChangeTime}
                onOk={this.handleChangeTime}
            />
        );
    }
}
